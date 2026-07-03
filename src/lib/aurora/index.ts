/**
 * Raw-WebGL aurora for the hero background. No dependencies, one canvas,
 * two tiny passes (see shaders.ts). Renders at a capped internal
 * resolution and lets the browser upscale — the silk is soft enough that
 * the low res is invisible. Pauses when the tab is hidden or the canvas
 * scrolls out of view. Under reduced motion it draws a single static frame.
 *
 * Returns null when WebGL is unavailable or setup fails, so the caller
 * can keep the CSS-blob fallback visible.
 */
import { MAIN_FRAG, TRAIL_FRAG, VERT } from './shaders'

export interface AuroraHandle {
  destroy(): void
}

export interface AuroraOptions {
  reduced: boolean
  /** Called if the WebGL context is lost after a successful start. */
  onFail?: () => void
}

const TRAIL_SIZE = 128
/** Internal render width cap; the canvas upscales from here. */
const MAX_RENDER_WIDTH = 560
/** Fraction of the trail remaining after one second (heals in ~2s). */
const TRAIL_RETENTION = 0.15
/** Pointer easing toward its target per second (higher = snappier). */
const POINTER_EASE = 7

const compile = (gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null => {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('aurora: shader compile failed', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

const link = (gl: WebGLRenderingContext, frag: string): WebGLProgram | null => {
  const vs = compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = compile(gl, gl.FRAGMENT_SHADER, frag)
  const program = vs && fs ? gl.createProgram() : null
  if (!vs || !fs || !program) {
    if (vs) gl.deleteShader(vs)
    if (fs) gl.deleteShader(fs)
    return null
  }
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.bindAttribLocation(program, 0, 'aPos')
  gl.linkProgram(program)
  gl.deleteShader(vs)
  gl.deleteShader(fs)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('aurora: program link failed', gl.getProgramInfoLog(program))
    gl.deleteProgram(program)
    return null
  }
  return program
}

interface Target {
  fbo: WebGLFramebuffer
  tex: WebGLTexture
}

const makeTarget = (gl: WebGLRenderingContext, size: number): Target | null => {
  const tex = gl.createTexture()
  const fbo = gl.createFramebuffer()
  if (!tex || !fbo) {
    if (tex) gl.deleteTexture(tex)
    if (fbo) gl.deleteFramebuffer(fbo)
    return null
  }
  gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0)
  const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  if (!ok) {
    gl.deleteFramebuffer(fbo)
    gl.deleteTexture(tex)
    return null
  }
  return { fbo, tex }
}

export const initAurora = (canvas: HTMLCanvasElement, opts: AuroraOptions): AuroraHandle | null => {
  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'low-power',
  })
  if (!gl) return null

  const trailProgram = link(gl, TRAIL_FRAG)
  const mainProgram = link(gl, MAIN_FRAG)
  const targetA = makeTarget(gl, TRAIL_SIZE)
  const targetB = makeTarget(gl, TRAIL_SIZE)
  const buffer = gl.createBuffer()

  const releaseGl = () => {
    if (gl.isContextLost()) return
    if (trailProgram) gl.deleteProgram(trailProgram)
    if (mainProgram) gl.deleteProgram(mainProgram)
    for (const target of [targetA, targetB]) {
      if (!target) continue
      gl.deleteFramebuffer(target.fbo)
      gl.deleteTexture(target.tex)
    }
    if (buffer) gl.deleteBuffer(buffer)
  }

  if (!trailProgram || !mainProgram || !targetA || !targetB || !buffer) {
    releaseGl()
    return null
  }

  // Both paths (animated and reduced-motion) assign their own teardown;
  // context loss runs it and hands control back to the caller, which
  // restores the CSS-blob fallback. Restoration is deliberately not
  // attempted — a decorative background is not worth reviving.
  let teardown = () => {}
  const destroy = () => {
    teardown()
    releaseGl()
  }
  canvas.addEventListener(
    'webglcontextlost',
    () => {
      destroy()
      opts.onFail?.()
    },
    { once: true },
  )

  // One triangle covering the screen; vUv overshoots [0,1] but is clipped.
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

  const trailU = {
    prev: gl.getUniformLocation(trailProgram, 'uPrev'),
    pointer: gl.getUniformLocation(trailProgram, 'uPointer'),
    active: gl.getUniformLocation(trailProgram, 'uPointerActive'),
    decay: gl.getUniformLocation(trailProgram, 'uDecay'),
    aspect: gl.getUniformLocation(trailProgram, 'uAspect'),
  }
  const mainU = {
    time: gl.getUniformLocation(mainProgram, 'uTime'),
    pointer: gl.getUniformLocation(mainProgram, 'uPointer'),
    active: gl.getUniformLocation(mainProgram, 'uPointerActive'),
    aspect: gl.getUniformLocation(mainProgram, 'uAspect'),
    trail: gl.getUniformLocation(mainProgram, 'uTrail'),
  }

  let width = 1
  let height = 1
  let aspect = 1

  const resize = () => {
    const cssWidth = canvas.clientWidth || 1
    const cssHeight = canvas.clientHeight || 1
    const scale = Math.min(0.5, MAX_RENDER_WIDTH / cssWidth)
    width = Math.max(1, Math.round(cssWidth * scale))
    height = Math.max(1, Math.round(cssHeight * scale))
    canvas.width = width
    canvas.height = height
    aspect = cssWidth / cssHeight
  }

  // Pointer state in canvas UV space (y up). The drawn pointer eases
  // toward the target so the gaze feels like attention, not a cursor.
  const target = { x: 0.5, y: 0.5, active: 0 }
  const drawn = { x: 0.5, y: 0.5, active: 0 }

  const onPointerMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    target.x = (e.clientX - rect.left) / rect.width
    target.y = 1 - (e.clientY - rect.top) / rect.height
    target.active = 1
  }
  const onPointerLeave = () => {
    target.active = 0
  }

  let read = targetA
  let write = targetB

  const drawTrail = (dt: number) => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, write.fbo)
    gl.viewport(0, 0, TRAIL_SIZE, TRAIL_SIZE)
    gl.useProgram(trailProgram)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, read.tex)
    gl.uniform1i(trailU.prev, 0)
    gl.uniform2f(trailU.pointer, drawn.x, drawn.y)
    gl.uniform1f(trailU.active, drawn.active)
    gl.uniform1f(trailU.decay, Math.pow(TRAIL_RETENTION, dt))
    gl.uniform1f(trailU.aspect, aspect)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  const drawMain = (time: number) => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    gl.viewport(0, 0, width, height)
    gl.useProgram(mainProgram)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, write.tex)
    gl.uniform1i(mainU.trail, 0)
    gl.uniform1f(mainU.time, time)
    gl.uniform2f(mainU.pointer, drawn.x, drawn.y)
    gl.uniform1f(mainU.active, drawn.active)
    gl.uniform1f(mainU.aspect, aspect)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  resize()

  if (opts.reduced) {
    // A single quiet frame: no gaze, empty trail, a time offset chosen so
    // the silk sits in a pleasant configuration. Redrawn on resize (which
    // also covers a pre-layout first measurement).
    const drawStatic = () => {
      resize()
      drawTrail(1000)
      drawMain(40)
    }
    drawStatic()
    const staticObserver = new ResizeObserver(drawStatic)
    staticObserver.observe(canvas)
    teardown = () => staticObserver.disconnect()
    return { destroy }
  }

  let raf = 0
  let running = false
  let last = 0

  const tick = (t: number) => {
    raf = requestAnimationFrame(tick)
    const dt = Math.min((t - last) / 1000, 0.05)
    last = t
    const ease = Math.min(1, POINTER_EASE * dt)
    drawn.x += (target.x - drawn.x) * ease
    drawn.y += (target.y - drawn.y) * ease
    drawn.active += (target.active - drawn.active) * ease
    drawTrail(dt)
    drawMain(t / 1000)
    const swap = read
    read = write
    write = swap
  }

  const start = () => {
    if (running) return
    running = true
    last = performance.now()
    raf = requestAnimationFrame(tick)
  }
  const stop = () => {
    if (!running) return
    running = false
    cancelAnimationFrame(raf)
  }

  const onVisibility = () => {
    if (document.hidden) stop()
    else if (inView) start()
  }

  // The aurora only lives behind the hero; stop rendering entirely once
  // it scrolls out of view.
  let inView = true
  const observer = new IntersectionObserver((entries) => {
    inView = entries.some((entry) => entry.isIntersecting)
    if (inView && !document.hidden) start()
    else stop()
  })

  const fine = window.matchMedia('(pointer: fine)').matches
  if (fine) {
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
  }
  // ResizeObserver rather than window resize: it also fires once layout
  // settles, so an early pre-layout measurement corrects itself.
  const resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(canvas)
  document.addEventListener('visibilitychange', onVisibility)
  observer.observe(canvas)

  teardown = () => {
    stop()
    observer.disconnect()
    resizeObserver.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
    if (fine) {
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    }
  }

  start()
  return { destroy }
}

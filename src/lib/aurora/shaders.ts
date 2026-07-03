/**
 * GLSL sources for the hero aurora. Two passes:
 *  - trail: a low-res ping-pong texture recording where the pointer has
 *    been; it decays every frame so the wake "heals" in a couple seconds.
 *  - main: domain-warped fbm silk in the brand lila/peri scale. The trail
 *    ERASES the glow (browsing leaves no trace) while the live pointer
 *    position brightens and curls the field toward it (the gaze).
 */

export const VERT = /* glsl */ `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

export const TRAIL_FRAG = /* glsl */ `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uPrev;
uniform vec2 uPointer;
uniform float uPointerActive;
uniform float uDecay;
uniform float uAspect;

void main() {
  float prev = texture2D(uPrev, vUv).r * uDecay;
  vec2 d = vUv - uPointer;
  d.x *= uAspect;
  float splat = uPointerActive * exp(-dot(d, d) * 900.0);
  gl_FragColor = vec4(clamp(prev + splat * 0.85, 0.0, 1.0), 0.0, 0.0, 1.0);
}
`

export const MAIN_FRAG = /* glsl */ `
precision mediump float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uPointer;
uniform float uPointerActive;
uniform float uAspect;
uniform sampler2D uTrail;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    v += amp * noise(p);
    p = p * 2.03 + vec2(11.5, 7.2);
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;
  vec2 p = vec2(uv.x * uAspect, uv.y);
  float t = uTime * 0.045;

  vec2 pd = uPointer - uv;
  pd.x *= uAspect;
  float gaze = uPointerActive * exp(-dot(pd, pd) * 7.0);

  vec2 q = vec2(
    fbm(p * 1.3 + vec2(0.0, t * 0.7)),
    fbm(p * 1.3 + vec2(5.2, -t * 0.55))
  );
  vec2 warp = 2.2 * (q - 0.5);
  warp += normalize(pd + 1e-4) * gaze * 0.55;
  float f = fbm(p * 1.6 + warp + vec2(t * 0.35, 0.0));

  // Anchored to the top of the page like the old blobs; q lumps the horizon.
  float band = smoothstep(0.05, 0.75, uv.y + 0.35 * (q.x - 0.5));

  float trail = texture2D(uTrail, uv).r;
  float erase = smoothstep(0.02, 0.55, trail);
  // The wake trails BEHIND the pointer: right under the gaze the field
  // stays lit, so a resting cursor glows instead of sitting in a hole.
  float near = uPointerActive * exp(-dot(pd, pd) * 60.0);
  erase *= 1.0 - 0.85 * near;

  float lum = f * f * band;
  lum *= 1.0 - 0.9 * erase;
  lum += gaze * 0.16 * band;

  vec3 deep = vec3(0.357, 0.247, 0.737); /* lila-700 #5b3fbc */
  vec3 lila = vec3(0.553, 0.482, 0.890); /* lila-500 #8d7be3 */
  vec3 peri = vec3(0.561, 0.600, 0.984); /* peri #8f99fb */
  vec3 col = mix(deep, lila, smoothstep(0.15, 0.6, f));
  col = mix(col, peri, smoothstep(0.55, 0.95, f + gaze * 0.25));

  gl_FragColor = vec4(col * lum * 0.62, 1.0);
}
`

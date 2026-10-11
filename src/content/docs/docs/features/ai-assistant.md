---
title: ai assistant
description: an optional chat panel beside your tabs for questions, page summaries, and web lookups, using your own Anthropic key or any OpenAI-compatible endpoint, local models included.
sidebar:
  order: 10
---

wis has a built-in assistant: a panel docked beside your tabs for free chat,
summarising the page you are on, and answering questions about it. you bring
the model, either your own Anthropic key or any OpenAI-compatible endpoint:
OpenAI, OpenRouter, or a model running on your own machine with Ollama or LM
Studio.

the assistant is **off until you set it up**. until then there is no button, no
menu row, and nothing running in the background.

:::note
the assistant is available on macOS and Windows. Linux has no OS key store to
seal a provider key in, so wis leaves the assistant off there entirely, local
key-less servers included, and **settings → ai assistant** explains this
instead of showing the fields. see
[platform support](/docs/reference/platform-support/).
:::

## setting it up

open **settings → ai assistant** and fill in:

- **provider**: Anthropic, or OpenAI-compatible.
- **model**: the model identifier, exactly as your provider names it.
- **base URL** (OpenAI-compatible only): the endpoint to talk to, for example
  `http://localhost:11434/v1` for Ollama. leave it blank to use OpenAI. it must
  start with `http://` or `https://`.
- **API key**: required for Anthropic. for an OpenAI-compatible provider it is
  optional, so leave it blank for a local server. **save** stores it and
  **remove** deletes it. a saved key is never shown again; enter a new one to
  replace it.

saving a key switches the assistant on for either provider. for an
OpenAI-compatible provider, entering a base URL is enough on its own, since a
local server needs no key. the assistant button appears in every open window
straight away, no restart needed. if no model is set yet, the panel says so and
offers a button back to these settings.

two more switches appear depending on the provider, both off by default:

- **show reasoning** (Anthropic only): streams Claude's thinking into the panel.
  see reasoning below.
- **allow web access** (OpenAI-compatible only): lets the model search the web
  and read public pages. see web access below.

## using the panel

click the **assistant** button. with a sidebar it sits in the footer, beside
history and settings; in the top-tabs layout it is in the rail. the panel docks
on the side opposite your sidebar or rail, and the page reflows beside it
rather than sitting underneath. drag its inner edge to resize it; the width is
remembered. close it with its close button, or press Escape while the panel has
focus. there is no keyboard shortcut for opening it.

- **chat**: type and press Enter to send (Shift+Enter for a new line). while an
  answer is coming in, the send button becomes **stop**.
- **summarise this page**: a fresh conversation offers a **summarise this page**
  button, which shares the current page and asks for a short summary followed by
  its key points.
- **ask about the page**: turn on **include this page's text** above the message
  box before you send. while it is on, it reads "this page's text goes to your
  provider". it switches itself off after every send and whenever you change tab
  or navigate, so it only ever covers the page you are looking at.
- **ask about a selection**: select text on a page, right-click, and choose
  **ask the assistant**. the panel opens and asks the model to explain the
  selected text.
- **new conversation**: the **+** button in the panel header clears the
  transcript.

only web pages can be shared. wis's own pages (settings, history, the
launchpad) and error pages cannot be attached.

## answers

- answers render as **markdown**: headings, bold, italics, strikethrough,
  inline code and code blocks, lists, quotes, tables, and rules. code blocks
  and tables scroll sideways instead of wrapping. anything else shows as plain
  text, and nothing in an answer is ever run as HTML.
- **links open as new tabs** in the current workspace, never in place. only
  `http` and `https` links are clickable; anything else stays plain text. hover
  a link to see the site it goes to.
- **deceptive links are caught**: before opening a link, wis compares its
  visible text with where it really goes. if the text names a different site
  (a link reading `paypal.com` that points somewhere else), wis stops and shows
  a "this link may be deceptive" dialog naming the real host, with **open
  anyway** if you still want it.
- **cut-short answers say so**: if the provider stops at its output limit, the
  answer ends with "cut short at the provider's output limit", so a truncated
  answer never passes for a complete one.
- the assistant is given **today's date** with every message, so it does not
  have to guess what "today" or "this week" means.

## reasoning

with **show reasoning** on, Claude streams a summary of its thinking before it
answers. thinking is billed as output tokens and needs a current Claude model,
which is why it is off by default. reasoning models on an OpenAI-compatible
endpoint (many local models among them) stream their thinking on their own, and
wis shows it the same way.

- while the model thinks, a shimmering **thinking...** line appears; click it to
  watch the reasoning live.
- once the answer starts, the line settles into a collapsed **thought for N
  seconds** disclosure that you can open any time.
- **answer now**, beside the thinking line, cuts the reasoning short and asks
  for an immediate answer. what was already shown stays in the disclosure.

reasoning is shown to you only. it is never sent back to the model as part of
the conversation.

## web access

for OpenAI-compatible providers, **allow web access** gives the model two
tools: **web search** and **web fetch**. this is how a local model can answer
with current information.

- **search** runs your model's query against DuckDuckGo's plain results page
  and hands back up to six results.
- **fetch** reads the text of one page, and only a page that a search returned
  or that you wrote in the conversation.
- every page loads in a **hidden, throwaway private page** that carries none of
  your cookies or logins, travels through the workspace's network route, and
  cannot download files.
- only the **public web** is reachable. localhost, addresses on your local
  network, and addresses with embedded credentials are refused, and every
  redirect is checked the same way, however the model asks.
- each round shows in the panel as a **using tool: web search** or **using tool:
  web fetch** line, which settles into what happened ("search returned 6
  results", "fetched 2 sources", or "search failed"). expand it to see the query
  or address and a preview of what came back.
- a message gets at most **four tool rounds**; after that the model has to
  answer with what it has gathered. repeating the exact same search within one
  message is refused, and **answer now** breaks out of a round that is going
  nowhere.

:::note
web access has been tested end to end on macOS. it is built in on Windows too,
but has seen less real-world testing there.
:::

## privacy

- **your key is sealed in the OS key store**: the macOS Keychain, or on Windows
  a file sealed with Windows data protection for your user account. it is read
  only when a request goes out, used only to authenticate that request, and
  never logged, shown back, synced, or included in a backup.
- **conversations are never saved**. the transcript lives in memory for that
  window only. switching workspace clears it, so a private workspace's
  conversation never carries into another, and closing the window or quitting
  wis discards it.
- **page text is shared only when you ask**: by pressing summarise, by turning
  on include this page's text for a send, or by choosing ask the assistant on a
  selection. every turn that carried a page's text is labelled **page content
  shared** with the site it came from.
- **page content is treated as data**: it is fenced off and labelled as quoted
  page content, and the assistant is instructed never to follow instructions
  written inside it.

## what is sent where

- **to your provider** (Anthropic, OpenAI, OpenRouter, or your own endpoint):
  your messages and the conversation so far, today's date, and anything you
  chose to share: a page's text, title, and address, or a selection. each new
  message resends the earlier ones, so a page attached earlier in a
  conversation goes along with follow-ups too; start a new conversation to drop
  it. with web access on, the search results and page text the tools gathered
  go to your provider as well.
- **through the workspace's network route**: requests to a hosted provider take
  the same route as the workspace's tabs, so if that workspace uses Tor or a
  SOCKS5 proxy, so does the assistant. see
  [network and Tor](/docs/features/network-and-tor/).
- **straight to your own machine**: an endpoint on this computer (`localhost`,
  `127.0.0.1`, `::1`) is contacted directly, never through Tor or a proxy, so a
  local model's traffic never leaves your device. a saved key is never sent to
  it. a server elsewhere on your network is not local, and takes the
  workspace's route like any other remote endpoint.
- **to DuckDuckGo and the sites the model reads** (web access only): search
  queries go to DuckDuckGo and fetched pages come from their own sites, both
  through the workspace's route and without your cookies.

nothing goes anywhere else. there is no wis server in between.

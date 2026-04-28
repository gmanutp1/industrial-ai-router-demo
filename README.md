# Talk to Bob - Industrial Voice Agent Demo

This GitHub Pages demo shows the intended embedded website experience: a single floating `Talk to Bob` button in the lower-left corner.

When clicked, Bob opens and says:

```text
Hi I am Bob, how can I be of assistance today?
```

Bob can then listen through the browser microphone or accept typed input, answer conversationally, route the visitor toward Spooltech, ISD, TRCW, or manual review, and collect contact details one question at a time.

## Demo Notes

- The page is intentionally minimal so the customer sees the website, not a routing dashboard.
- Bob does not use browser speech synthesis. Voice output comes from a configurable OpenAI TTS endpoint.
- A production version should run that OpenAI call through the AWS backend so the API key is never exposed in the browser.
- The widget labels Bob as an AI voice agent so visitors know they are hearing an AI-generated voice.
- The static demo does not send lead data anywhere. It only shows the conversation flow in the browser.

## Conversation Flow

Bob keeps the exchange short:

1. Understand what the visitor needs.
2. Route to Spooltech, ISD, TRCW, or manual review.
3. Ask for name.
4. Ask for phone.
5. Ask for email.
6. Ask for company.
7. Ask for timeline.
8. Confirm that the request is ready for follow-up.

This version does not use browser `speechSynthesis` for Bob's voice. It calls a configurable backend endpoint that should generate OpenAI TTS audio with `gpt-4o-mini-tts`.

Supported Bob voice choices in the widget:

- `cedar`
- `marin`
- `onyx`
- `echo`

Set the endpoint in one of these ways:

```html
<script>
  window.BOB_TTS_ENDPOINT = "https://YOUR_API_GATEWAY_URL/tts";
</script>
```

or open the demo with:

```text
?tts=https://YOUR_API_GATEWAY_URL/tts&voice=cedar
```

The included `api/openai-tts-lambda.mjs` file is an AWS Lambda example for that endpoint. Configure `OPENAI_API_KEY` as a Lambda environment variable. Do not put the OpenAI API key in GitHub Pages or browser JavaScript.

For a fully speech-to-speech production agent, use OpenAI Realtime instead of chained TTS. With Realtime, set `voice` to `cedar` or `marin` before the first audio response and keep the same voice for the session.

## Run Locally

Open `index.html` in a browser, or run:

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```

Microphone input works best in Chrome or Edge over `https://` or `localhost`.

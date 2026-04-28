# Talk to Bob - Industrial Voice Agent Demo

This GitHub Pages demo shows the intended embedded website experience: a single floating `Talk to Bob` button in the lower-left corner.

When clicked, Bob opens and says:

```text
Hi I am Bob, how can I be of assistance today?
```

Bob can then listen through the browser microphone or accept typed input, answer conversationally, route the visitor toward Spooltech, ISD, TRCW, or manual review, and collect contact details one question at a time.

## Demo Notes

- The page is intentionally minimal so the customer sees the website, not a routing dashboard.
- The voice uses the browser's best available speech-synthesis voice for GitHub Pages testing.
- A production version should use a high-quality voice service through the AWS backend so Bob sounds more natural and consistent across devices.
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

For a production voice that feels truly natural, replace browser speech synthesis with a backend voice provider such as OpenAI Realtime, Gemini Live API, ElevenLabs Agents, Vapi, Retell AI, or Amazon Polly Generative voices.

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

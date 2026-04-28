# Talk to Bob - Industrial Voice Agent Demo

This GitHub Pages demo shows the intended embedded website experience: a single floating `Talk to Bob` button in the lower-left corner.

When clicked, Bob opens and says:

```text
Hi I am Bob, how can I be of assistance today?
```

Bob can then listen through the browser microphone or accept typed input, answer conversationally, and route the visitor toward Spooltech, ISD, TRCW, or manual review.

## Demo Notes

- The page is intentionally minimal so the customer sees the website, not a routing dashboard.
- The voice uses the browser's best available speech-synthesis voice for GitHub Pages testing.
- A production version should use a high-quality voice service through the AWS backend so Bob sounds more natural and consistent across devices.

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

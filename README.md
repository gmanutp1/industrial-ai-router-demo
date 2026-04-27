# Industrial AI Voice Router Demo

This repository is a GitHub Pages-friendly prototype for testing an AI voice-routing concept between Spooltech, ISD, and TRCW.

The demo is intentionally static so the company can test it without AWS, OpenAI keys, Amazon Connect setup, or a backend server. It uses browser speech input when available and always supports typed caller requests.

## What It Demonstrates

- Voice or typed caller intake.
- Routing between Spooltech, ISD, TRCW, or Manual Review.
- Confidence scoring.
- Matched routing signals.
- Suggested transfer script.
- Lead capture stored in browser local storage.
- Local demo analytics by route and confidence.
- A visible routing matrix for company review.

## Run Locally

Open `index.html` in a browser, or run a small static server:

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```

Microphone input usually requires Chrome or Edge and either `https://` or `localhost`. If speech input is unavailable, use the text box.

## Publish On GitHub Pages

For the fastest test link, follow `TESTING_IN_GITHUB.md`.

Short version:

1. Create a GitHub repository.
2. Upload the demo files.
3. Open `Settings -> Pages`.
4. Use `Deploy from a branch`.
5. Select `main` and `/root`.
6. Open the published Pages URL after GitHub finishes deploying.

If you push with `git`, you can also use `GitHub Actions`; the included `.github/workflows/pages.yml` workflow will deploy the static demo.

## Production Path

For the real hosted product, use `ai-voice-agent-product-blueprint.md` and `aws-voice-agent-implementation-plan.md`.

Recommended AWS path:

- Amazon Connect for phone numbers, call flows, transfers, and recordings.
- Amazon Connect AI agents or Lex for voice self-service.
- Lambda for routing decisions.
- DynamoDB or Aurora for tenant settings and call records.
- S3 for recordings, transcripts, and knowledge documents.
- Contact Lens for transcripts, summaries, sentiment, and analytics.
- Cognito for client login.
- Stripe for subscription billing.

## Current Routing Knowledge

The live demo logic is based on `spooltech-isd-trcw-routing-knowledge.md`.

Key clarifications already included:

- ISD preferred emails: `info@isdfab.com`, `j.pena@isdfab.com`, `r.ranero@isdfab.com`.
- ISD handles sheet metal manufacturing, plate cutting, forming, thermal coating booths, air handling units, skids, and weldments.
- ISD does not handle vessels, tanks, pressure containment, fluid transportation systems, installation, equipment assembly, piping, plant maintenance, commercial cooking equipment, BBQ pits, or smokers.

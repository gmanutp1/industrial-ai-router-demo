# Testing Bob In GitHub

Open the GitHub Pages demo:

```text
https://gmanutp1.github.io/industrial-ai-router-demo/
```

## Main Test

1. Click the floating `Talk to Bob` button in the lower-left corner.
2. Bob should open and say: `Hi I am Bob, how can I be of assistance today?`
3. Click `Start talking`, then speak a customer request.
4. If microphone permissions are blocked, type the request and click `Send`.

## Routing Tests

- Select `ISD website`, then ask for `a pressure vessel and process piping`.
  - Expected: Bob redirects toward Spooltech.
- Select `Spooltech website`, then ask for `sheet metal for an air handling unit`.
  - Expected: Bob redirects toward ISD.
- Select `TRCW website`, then ask for `Inconel 625 weld overlay`.
  - Expected: Bob says TRCW should be able to help.
- Select `ISD website`, then ask for `commercial cooking equipment`.
  - Expected: Bob says the request needs manual review.

## Voice Notes

The GitHub demo uses browser speech synthesis, so voice quality depends on the reviewer's browser and operating system. The production AWS version should use a dedicated natural voice service so Bob sounds more human and consistent.

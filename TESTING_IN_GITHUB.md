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
  - Expected: Bob says it sounds like Spooltech, then asks for a name.
- Select `Spooltech website`, then ask for `sheet metal for an air handling unit`.
  - Expected: Bob says it sounds like ISD, then asks for a name.
- Select `TRCW website`, then ask for `Inconel 625 weld overlay`.
  - Expected: Bob says TRCW should be the right place, then asks for a name.
- Select `ISD website`, then ask for `commercial cooking equipment`.
  - Expected: Bob says the request needs review, then asks for a name.

## Intake Flow Test

After Bob routes the request, answer one item at a time:

1. Name: `Carlos Pena`
2. Phone: `713-555-1212`
3. Email: `carlos@example.com`
4. Company: `Acme Fabrication`
5. Timeline: `next week`

Expected: Bob asks only one short follow-up question at a time and finishes with a short confirmation.

## Voice Notes

The GitHub demo uses browser speech synthesis, so voice quality depends on the reviewer's browser and operating system. The production AWS version should use a dedicated natural voice service so Bob sounds more human and consistent.

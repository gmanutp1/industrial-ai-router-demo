# Test The AI Voice Router In GitHub

This is the fastest way to let Spooltech, ISD, and TRCW test the demo from a real GitHub Pages link.

## Fastest Web-Only Setup

Use this if you do not want to use Terminal yet.

1. Go to https://github.com/new
2. Create a new public repository, for example `industrial-ai-router-demo`.
3. On the new repository page, choose `uploading an existing file`.
4. Upload these files from this folder:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `README.md`
   - `TESTING_IN_GITHUB.md`
   - `ai-voice-agent-product-blueprint.md`
   - `aws-voice-agent-implementation-plan.md`
   - `spooltech-isd-trcw-routing-knowledge.md`
   - `.nojekyll` if GitHub lets you select hidden files
5. Commit the upload to `main`.
6. Open `Settings -> Pages`.
7. Under `Build and deployment`, choose `Deploy from a branch`.
8. Select:
   - Branch: `main`
   - Folder: `/root`
9. Click `Save`.
10. Wait 1-3 minutes, then open the GitHub Pages URL shown on that page.

The page URL usually looks like:

```text
https://YOUR-GITHUB-USERNAME.github.io/industrial-ai-router-demo/
```

## GitHub Actions Setup

Use this if you can push the folder with `git`.

1. Push the whole folder to a GitHub repo.
2. Open `Settings -> Pages`.
3. Under `Build and deployment`, choose `GitHub Actions`.
4. The included `.github/workflows/pages.yml` workflow will publish the static site.

## Test Cases

Paste or speak these into the demo:

- `I need Inconel 625 weld overlay on a frac valve.`
  - Expected: TRCW
- `Can you cut and form heavy sheet metal for an air handling unit?`
  - Expected: ISD
- `Can you fabricate a thermal coating booth?`
  - Expected: ISD
- `We need a pressure vessel and process piping fabricated to API standards.`
  - Expected: Spooltech
- `I need a skid fabricated with no pressure piping.`
  - Expected: ISD
- `Can you install an air handling unit?`
  - Expected: Manual Review
- `Can ISD build commercial cooking equipment?`
  - Expected: Manual Review

## Voice Testing Notes

- The microphone button works best in Chrome or Edge.
- GitHub Pages uses HTTPS, which helps browser microphone permissions work.
- If the browser blocks voice input, use the text box. The routing logic is the same.

## What To Ask The Company To Review

- Did the demo route each request to the right company?
- Which phrases produced the wrong route?
- Are the transfer phone numbers correct?
- Should low-confidence calls go to a specific person?
- Should after-hours calls transfer, take voicemail, or create a lead?
- Who should receive lead emails for each company?

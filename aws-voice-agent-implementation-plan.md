# AWS Voice Agent Implementation Plan

## Phase 1: GitHub Demo

Goal: let Spooltech, ISD, and TRCW test the routing logic before paying for production phone infrastructure.

Built in this folder:

- `index.html`: demo interface.
- `styles.css`: responsive product UI.
- `app.js`: routing engine, voice/text intake, local analytics, lead capture.
- `.github/workflows/pages.yml`: GitHub Pages deployment workflow.
- `spooltech-isd-trcw-routing-knowledge.md`: source routing knowledge.

What the company should test:

- Say or type real caller requests.
- Confirm whether the selected business is correct.
- Mark edge cases where the result should change.
- Confirm transfer phone numbers, emails, business hours, and fallback contacts.

## Phase 2: Real Phone Prototype In AWS

Goal: answer a real phone number and route calls based on approved routing rules.

Recommended services:

- Amazon Connect: phone number, call flows, queues, transfers, recordings.
- Amazon Connect AI agents or Amazon Lex V2: conversational voice intake.
- AWS Lambda: routing decision and lead creation.
- DynamoDB: routing rules, destinations, business hours, contacts, tenant settings.
- S3: call recordings, transcripts, summaries, uploaded knowledge docs.
- Contact Lens: transcripts, call summaries, categories, sentiment, analytics.
- SES or SNS: lead notifications by email/SMS.

Minimum call flow:

1. Play recording disclosure if recording/transcription is enabled.
2. Ask: "Briefly tell me what you need help with."
3. Capture caller request.
4. Send transcript text to Lambda.
5. Lambda returns destination, confidence, reason, and next question if needed.
6. If high or medium confidence, transfer to destination.
7. If low confidence, ask one clarifying question.
8. If still low confidence or after-hours, capture lead details.
9. Store call record and lead.
10. Send summary to the right email contacts.

## Phase 3: Client Dashboard

Goal: give clients a login where they can view analytics and request routing adjustments.

Recommended services:

- Cognito: client login, MFA, tenant-specific access.
- CloudFront + S3 or AWS Amplify: frontend hosting.
- API Gateway + Lambda: dashboard API.
- DynamoDB or Aurora PostgreSQL: tenants, users, calls, leads, routing rules.
- Stripe: subscription billing, trials, invoices, usage overages.

Dashboard sections:

- Call log.
- Call transcript and summary.
- Destination routed to.
- Confidence score.
- Saved leads.
- Missed or failed transfers.
- Common caller requests.
- Low-confidence calls needing review.
- Routing rule editor.
- Business contact settings.

## Production Data Model

Suggested tables:

- `tenants`: company group, billing plan, status.
- `users`: Cognito user id, tenant id, role.
- `destinations`: Spooltech/ISD/TRCW records, phone numbers, emails, business hours.
- `routing_rules`: keywords, hard-routes, blocked routes, clarification questions.
- `calls`: call id, tenant id, transcript, route, confidence, duration, recording link.
- `leads`: caller name, company, phone, email, project type, summary, routed destination.
- `rule_feedback`: corrected route, reviewer, reason, timestamp.

## First AWS Build Order

1. Create Amazon Connect instance.
2. Claim a test phone number.
3. Build one inbound contact flow.
4. Create Lambda route function using the current `app.js` routing logic.
5. Add DynamoDB tables for destinations, calls, and leads.
6. Save every call decision.
7. Enable Contact Lens transcription and analytics.
8. Send lead summaries to confirmed business emails.
9. Build a basic dashboard with call list and lead list.
10. Add client login with Cognito.

## Test Script For Company Review

Ask testers to try these examples:

- "I need Inconel 625 weld overlay on a frac valve."
- "Can you cut and form heavy sheet metal for an air handling unit?"
- "Can you fabricate a thermal coating booth?"
- "We need a pressure vessel and process piping fabricated to API standards."
- "I need a skid fabricated with no pressure piping."
- "Can you install an air handling unit?"
- "Can ISD build commercial cooking equipment?"

Expected outcome:

- Cladding, overlay, machining, wellhead, valve, PWHT, NDE: TRCW.
- Pressure vessels, tanks, fluid systems, process piping, DNV, spools: Spooltech.
- Sheet metal, plate cutting, forming, skids, weldments, AHUs, thermal coating booths: ISD.
- Installation, plant maintenance, commercial cooking equipment, BBQ pits, smokers: Manual Review unless the client gives a new approved route.

## Notes Before Launch

- Confirm whether calls should transfer to public numbers or private/internal numbers.
- Confirm after-hours behavior for each business.
- Confirm call recording disclosure language.
- Confirm whether callers can leave voicemails or only structured leads.
- Confirm retention period for recordings and transcripts.
- Confirm who can edit routing rules in the dashboard.

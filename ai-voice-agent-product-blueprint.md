# AI Voice Agent Product Blueprint

## Goal

Build a subscription-based AI voice agent that answers incoming calls, determines which business should handle the caller, transfers the call or captures a lead, and gives each client a secure dashboard for analytics and routing updates.

Initial pilot: Spooltech, ISD, and TRCW.

Long-term product: a reusable multi-tenant call-routing SaaS for industrial groups, multi-location shops, franchised service businesses, and companies with overlapping capabilities.

## Why This Can Make Money

Many small and mid-market industrial companies still depend on shared reception, manual transfers, voicemail, or website contact forms. A caller who needs cladding, machining, custom fabrication, plate cutting, forming, delivery, or DNV-style engineered manufacturing may not know which company name matters. The product value is simple:

- Fewer lost calls.
- Faster routing to the right location.
- Better quote intake after hours.
- Searchable call transcripts and summaries.
- Visibility into missed opportunities, common request types, and misroutes.
- Easy routing adjustments without rebuilding the phone system.

## Recommended AWS Architecture

Use Amazon Connect as the phone system and call-flow layer. AWS now supports AI agents for self-service voice and chat, including agentic self-service that can reason through multiple steps and escalate when needed. Source: https://docs.aws.amazon.com/connect/latest/adminguide/ai-agent-self-service.html

Core stack:

- Amazon Connect: inbound phone number, call flows, transfers, queues, recordings.
- Connect AI agents or Amazon Lex V2: caller intent capture and follow-up questions.
- AWS Lambda: deterministic routing decisions, lead creation, escalation logic.
- Amazon DynamoDB or Amazon Aurora PostgreSQL: tenant config, business locations, routing rules, contacts, call outcomes.
- Amazon S3: recordings, transcripts, call summaries, imported knowledge documents.
- Amazon Connect Contact Lens / conversational analytics: transcripts, sentiment, categories, summaries, and analytics. Source: https://docs.aws.amazon.com/connect/latest/adminguide/enable-analytics.html
- Amazon Cognito: client login, roles, password reset, MFA.
- API Gateway + Lambda or ECS Fargate: admin API.
- React/Next.js dashboard hosted with CloudFront + S3 or AWS Amplify.
- EventBridge/Kinesis: call events and analytics pipeline.
- QuickSight or a custom dashboard: call volume, intent mix, transfers, missed calls, conversion.
- Stripe: subscription billing, usage-based overages, invoices, trials.

Important implementation detail: if a call is transferred and analytics should continue after transfer, the transferred contact needs analytics enabled in the destination flow too. AWS notes that transfers create a second contact record. Source: https://docs.aws.amazon.com/connect/latest/adminguide/enable-analytics.html

## Product Features

MVP:

- AI greeting and natural-language intake.
- Route to Spooltech, ISD, or TRCW.
- Capture name, company, phone, email, project type, material, urgency, and drawings/files-needed note.
- Warm transfer during business hours.
- After-hours lead capture with email/SMS notification.
- Admin dashboard with calls, transcripts, summaries, routing outcome, missed calls, and export.
- Routing editor for keywords, intent examples, transfer numbers, fallback behavior, and business hours.
- Human fallback when confidence is low.

Version 2:

- Client-specific knowledge uploads.
- Misroute correction workflow that improves future routing.
- Call scoring and outcome tagging.
- CRM/email integration.
- Quote-request form generated from call summary.
- Multi-location support.
- White-label client portal.
- Usage-based billing.

Version 3:

- Industry templates: fabrication, HVAC, medical practices, legal offices, franchises, dealerships, construction trades.
- Call deflection to SMS links or web forms.
- Automated follow-up emails.
- Lead value reporting.
- API/webhook marketplace.

## Suggested Subscription Pricing

These are starting points, not final pricing.

- Starter: $499-$999/month, plus usage. One company group, up to three routing destinations, basic dashboard, call summaries, after-hours intake.
- Growth: $1,500-$2,500/month, plus usage. Multiple locations, custom routing rules, analytics, correction workflow, email/SMS notifications, monthly optimization.
- Pro: $3,500-$7,500/month, plus usage. White-label portal, custom integrations, SLA, advanced analytics, CRM sync, managed knowledge updates.
- Setup fee: $2,500-$10,000 depending on number imports, call flow complexity, custom dashboard, and client data cleanup.

Use a per-minute or per-call overage so your margins survive heavy call volume. Amazon Connect pricing is usage-based and includes voice service plus telephony charges; AWS examples show voice usage priced per minute with separate phone-number and telecom usage charges. Source: https://aws.amazon.com/connect/pricing/

## Pilot Plan

Week 1: Discovery and data cleanup

- Confirm official transfer numbers, emails, business hours, and escalation contacts.
- Confirm whether Spooltech, TRCW, and ISD want separate greetings or one group greeting.
- Confirm which calls should transfer live vs. become quote-intake leads.
- Resolve data conflicts noted in the routing knowledge base.

Week 2: Voice agent MVP

- Build Amazon Connect instance and inbound number.
- Create intake prompt and fallback rules.
- Implement routing Lambda with the knowledge base rules.
- Enable recordings, transcripts, and analytics.
- Build simple call-log dashboard.

Week 3: Pilot testing

- Run 50-100 test calls using real examples.
- Track confidence, correct route, caller friction, and transfer success.
- Add correction workflow for misroutes.
- Tune questions and fallback logic.

Week 4: Subscription-ready packaging

- Add tenant model, billing, admin roles, and settings UI.
- Create demo dashboard.
- Prepare sales deck and case study from pilot metrics.

## Dashboard Metrics

Show clients:

- Total calls.
- Calls by destination.
- Calls by request type.
- After-hours calls.
- Missed/failed transfers.
- Average call duration.
- Transfer success rate.
- AI confidence score.
- Low-confidence calls needing review.
- Common materials/services mentioned.
- Quote-ready leads.
- Customer sentiment, if enabled.
- Recommended routing rule updates.

## Sales Positioning

Simple pitch:

"We give industrial companies a trained AI receptionist that understands their services, routes callers to the right shop, captures quote-ready leads after hours, and shows owners what customers are calling about."

Best first buyers:

- Companies with multiple divisions.
- Businesses with overlapping services.
- Industrial shops where callers often ask for technical services.
- Groups with high-value quote requests.
- Companies with limited front-desk coverage.

## Compliance And Risk Notes

- Use a call recording disclosure before recording or analytics.
- Confirm call recording and SMS consent requirements with counsel before launch, especially if callers may be outside Texas.
- Redact sensitive information where possible.
- Do not let the AI promise pricing, lead times, certifications, or capabilities unless the client has explicitly approved that answer.
- Low-confidence calls should transfer to a human or create a reviewable lead.
- Keep transcripts and recordings encrypted and tenant-isolated.
- Give clients control over retention periods.

## Sources Used

- Local DOCX: `/Users/HOMIEG/Downloads/ISD Capabilities.docx`
- Local PDF brochure: `/Users/HOMIEG/Downloads/ST ISD TRCW Overview Brochure.pdf`
- Spooltech services: https://spooltech.com/services/
- Spooltech fabrication: https://spooltech.com/fabrication/
- Spooltech acquisition of TRCW: https://spooltech.com/spooltech-acquires-trcw/
- TRCW home/services: https://trcw.com/
- TRCW cladding: https://trcw.com/cladding/
- TRCW NDE: https://trcw.com/nde-processes/
- TRCW heat treatment: https://trcw.com/heat-treatment/
- ISD website: https://isdfab.com/
- AWS Connect AI agent self-service: https://docs.aws.amazon.com/connect/latest/adminguide/ai-agent-self-service.html
- AWS Contact Lens analytics setup: https://docs.aws.amazon.com/connect/latest/adminguide/enable-analytics.html
- AWS Connect pricing: https://aws.amazon.com/connect/pricing/

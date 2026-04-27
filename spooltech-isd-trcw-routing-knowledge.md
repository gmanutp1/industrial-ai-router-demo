# Spooltech, ISD, TRCW Routing Knowledge Base

This is a first-pass operational knowledge base for the AI voice agent. It combines the local documents and public official web sources. Items marked `VERIFY` should be confirmed by the business owner before production.

## Business Contacts

### Spooltech

- Website: https://spooltech.com/
- Phone: (281) 861-6800
- Email from brochure: sales@spooltech.com
- Address: 9325 Hwy. 6 North, Houston, TX 77095
- Best for: large engineered industrial manufacturing and fabrication projects.

### TRCW

- Website: https://trcw.com/
- Phone: (281) 239-2555
- Email from brochure: sales@trcw.com
- Address: 1881 Treble Dr., Humble, TX 77338
- Best for: cladding, machining, corrosion-resistant alloy welding, hardfacing, NDE, heat treatment, wellhead and pressure-component work.

### ISD

- Website: https://isdfab.com/
- Phone: (713) 697-0028
- Preferred emails: info@isdfab.com, j.pena@isdfab.com, r.ranero@isdfab.com
- Address: 1159 Aldine Bender Rd., Houston, TX 77032
- Public website hours: 6:30 AM - 4 PM
- Best for: custom and industrial metal fabrication, sheet metal manufacturing, plate cutting, forming, thermal coating booth manufacturing, air handling unit manufacturing, skids, weldments, project design, delivery, and specialty commercial/industrial fabrication.
- Do not route to ISD for: vessels, tanks, pressure containment, fluid transportation systems, installation, equipment assembly, piping, plant maintenance, commercial cooking equipment, BBQ pits, or smokers.

## Primary Routing Rules

Route to Spooltech when the caller mentions:

- Spools, spool accessories, coil tubing spools, spool cradles.
- Vessels, tanks, pressure containment, fluid transportation systems.
- Large engineered skids, pump bases, manifolds, shipping frames, steel enclosures, especially when tied to pressure containment, fluid systems, process piping, DNV work, or group-level project handling.
- Process piping to ASME/API standards.
- Spreader bars, lifting beams, pipe end caps, equalizing beams.
- Industrial fans or ventilation as part of a larger engineered industrial project.
- DNV or DNV-GL engineered/manufactured equipment.
- Large engineered fabrication, concept-to-delivery manufacturing, logistics, large weldments, drive-through loading, on-site storage.
- The parent company, "Spooltech", or general group-level sales.

Route to TRCW when the caller mentions:

- Cladding, weld overlay, weld inlay, corrosion-resistant alloy welding.
- Nickel alloy 625, Inconel, Hastelloy, C276, Monel, Duplex, Stellite, cobalt alloys.
- Hardfacing, hard surfacing, wear-resistant overlay, tungsten carbide, erosion/abrasion resistance.
- Hot wire TIG, cold wire TIG, GTAW, GTAW-P-HW, SMAW, GMAW, FCAW, SAW, PWHT.
- CNC machining, milling, turning, boring, valve repair, equipment repair, rebuilds, detailed precision parts.
- Drilling risers, BOPs/blowout preventers, frac valves, blocks, flanges, wellhead components, choke/kill boxes, subsea components.
- NDE/NDT, liquid penetrant, magnetic particle, hardness testing, PMI, ultrasonic, radiography.
- Heat treatment, post-weld heat treatment, stress relief, API 6A traceability.
- TRCW specifically.

Route to ISD when the caller mentions:

- Custom metal fabrication or precision CNC cutting.
- Project design, fabrication, and delivery for custom projects.
- Plate cutting, CNC plasma cutting, shearing, rolling, press brake forming, forming services, and welding.
- Sheet metal manufacturing, stainless steel, aluminum, carbon steel, galvanized steel, sheet metal to plate.
- Industrial ventilation, silencers, dust collection, air handling units, thermal coating booths, and material-handling fabrication.
- Skids, weldments, frames, structural fabrication, and similar industrial fabrication work that does not involve vessels, tanks, pressure containment, fluid transportation, or process piping.
- Land drilling rig parts or offshore drilling rig parts when the caller frames it as custom fabrication rather than cladding/machining/wellhead repair, piping, pressure containment, or fluid transportation.
- Stairways, handrails, furniture, and specialty commercial or architectural fabrication.
- ISD, Industrial Services & Design, or isdfab.

## Shared Capabilities And Hard Limits

ISD can do many of the same fabrication categories as Spooltech, especially sheet metal manufacturing, plate cutting, forming, skids, weldments, frames, air handling units, thermal coating booths, and general industrial fabrication.

Use Spooltech instead of ISD when the project is specifically about:

- Spools or spool-heavy fabrication.
- Vessels or tanks.
- Pressure containment.
- Fluid transportation systems.
- Process piping.
- Large engineered/DNV work that requires Spooltech's certifications, logistics, or group-level project handling.

Do not route installation, equipment assembly, piping, plant-maintenance, commercial cooking equipment, BBQ pit, or smoker requests to ISD.

## Ambiguity Questions

If confidence is low, ask one short question:

- "Does this involve cladding, weld overlay, or corrosion-resistant alloy work?" If yes, route to TRCW.
- "Is this mainly about a spool, vessel, tank, pressure-containing item, fluid transportation system, process piping, or DNV project?" If yes, route to Spooltech.
- "Is this mainly custom fabrication, sheet metal manufacturing, plate cutting, forming, an air handling unit, a thermal coating booth, a skid, or a weldment without pressure containment or process piping?" If yes, route to ISD.
- "Are you calling about an existing quote, delivery, invoice, or job number?" If yes, ask which company name appears on the quote or paperwork.

## Required Intake Fields

Capture before transfer when practical:

- Caller name.
- Company.
- Phone number.
- Email.
- Project/service needed.
- Material, if known.
- Part/equipment type.
- Needed timeline.
- Whether drawings, specifications, or photos are available.
- Whether the caller needs a quote, status update, employment, sales, or general information.

## Suggested Greeting

"Thanks for calling. I can help route you to Spooltech, ISD, or TRCW. Briefly tell me what you need help with, such as cladding, machining, custom metal fabrication, sheet metal, plate cutting, forming, air handling units, thermal coating booths, spools, skids, weldments, or a quote."

## Suggested Transfer Script

"Based on what you told me, the best team is [business]. I’m going to transfer you now. I’ll pass along a short summary so you don’t have to repeat everything."

## Suggested Low-Confidence Script

"I want to get you to the right team. Is your request mainly about cladding or precision machining, spools or pressure-containing equipment, or custom fabrication like sheet metal, plate cutting, forming, air handling units, thermal coating booths, skids, and weldments?"

## Suggested After-Hours Script

"The team may be unavailable right now, but I can capture the details and send them to the right location. What is the best phone number and email for a project specialist to follow up?"

## Data Conflicts To Confirm

- ISD CNC plasma table: local DOCX says 10 ft x 20 ft; ISD website says 6 ft x 12 ft.
- Whether all three businesses want calls transferred to public numbers or private/internal numbers.
- Whether Spooltech wants cladding calls routed directly to TRCW every time, since TRCW is now a division of Spooltech.
- Whether employment/career calls should go to a separate HR route.
- Whether quote requests should transfer live or be captured first with structured intake.

## Test Calls

Expected Spooltech:

- "I need a custom skid built for an offshore package."
- "Do you manufacture coil tubing spools?"
- "Can you build a pressure vessel or tank?"
- "I need process piping fabricated to API standards."
- "Who handles DNV certified equipment?"

Expected TRCW:

- "I need Inconel 625 overlay on a valve body."
- "Can you repair a frac valve?"
- "Do you do hardfacing with Stellite?"
- "I need post-weld heat treatment and hardness testing."
- "Can someone machine a wellhead component?"

Expected ISD:

- "I need custom stairs and handrails fabricated."
- "Can you CNC plasma cut aluminum plate?"
- "Can you cut and form heavy plate?"
- "Can you manufacture sheet metal air handling units?"
- "Can you fabricate a thermal coating booth?"
- "I need a skid or weldment fabricated."
- "I need dust collection ducting fabricated."
- "I need a small custom metal fabrication project fabricated and delivered."

## Source Notes

- Spooltech public site lists services including design/engineering, cladding, fabrication, heat treatment, non-destructive examination, plate processing, and DNV Engineering and Manufacturing.
- Spooltech public fabrication page lists spools/accessories, vessels/tanks, skids, process piping, spreader bars, fans/ventilation, commercial structural steel, equipment rebuilds, stainless/structural steel, and custom fabrication.
- TRCW public site positions TRCW as Houston's leader in cladding and machining, with corrosion-resistant alloy welding, Inconel 625 inlays, Stellite overlays, milling, turning, Hot/Cold GTAW, stress relief, NDE, and wellhead/drilling/frac-valve component work.
- User clarification supersedes older source wording for ISD: ISD does sheet metal manufacturing, plate cutting, forming, thermal coating booth manufacturing, air handling unit manufacturing, skids, weldments, and many Spooltech-adjacent fabrication services, but does not provide installation, equipment assembly, piping, plant maintenance, vessels, tanks, pressure containment, fluid transportation systems, commercial cooking equipment, BBQ pits, or smokers.

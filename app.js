const businesses = {
  spooltech: {
    id: "spooltech",
    name: "Spooltech",
    initials: "ST",
    phone: "(281) 861-6800",
    emails: ["sales@spooltech.com"],
    address: "9325 Hwy. 6 North, Houston, TX 77095",
    website: "https://spooltech.com/",
    bestFor:
      "large engineered fabrication, spools, vessels, tanks, pressure containment, fluid transportation systems, process piping, and DNV-style programs.",
    rules: [
      "spools and spool-heavy fabrication",
      "vessels, tanks, pressure containment, and fluid transportation",
      "process piping, ASME/API, DNV, and group-level engineered projects",
      "large engineered skids, pump bases, manifolds, frames, and heavy weldments",
    ],
  },
  trcw: {
    id: "trcw",
    name: "TRCW",
    initials: "TR",
    phone: "(281) 239-2555",
    emails: ["sales@trcw.com"],
    address: "1881 Treble Dr., Humble, TX 77338",
    website: "https://trcw.com/",
    bestFor:
      "cladding, machining, weld overlay, hardfacing, corrosion-resistant alloys, NDE, heat treatment, and wellhead or valve component work.",
    rules: [
      "cladding, weld overlay, weld inlay, hardfacing, and corrosion-resistant alloy work",
      "Inconel, Hastelloy, Duplex, Stellite, Monel, nickel 625, and similar alloys",
      "CNC machining, milling, turning, boring, valve repair, BOP, frac valve, and wellhead components",
      "NDE, NDT, PMI, hardness testing, PWHT, stress relief, and heat treatment",
    ],
  },
  isd: {
    id: "isd",
    name: "ISD",
    initials: "ISD",
    phone: "(713) 697-0028",
    emails: ["info@isdfab.com", "j.pena@isdfab.com", "r.ranero@isdfab.com"],
    address: "1159 Aldine Bender Rd., Houston, TX 77032",
    website: "https://isdfab.com/",
    bestFor:
      "custom and industrial fabrication, sheet metal manufacturing, plate cutting, forming, skids, weldments, thermal coating booths, and air handling units.",
    rules: [
      "sheet metal manufacturing, plate cutting, plasma cutting, shearing, rolling, and press brake forming",
      "air handling units, thermal coating booths, industrial ventilation, silencers, and dust collection fabrication",
      "skids, weldments, frames, structural fabrication, stairs, handrails, and specialty architectural fabrication",
      "custom fabrication that does not involve vessels, tanks, pressure containment, fluid transportation, process piping, or installation",
    ],
  },
  review: {
    id: "review",
    name: "Manual Review",
    initials: "MR",
    phone: "Confirm with client",
    emails: ["Route to group sales after confirmation"],
    address: "Use only when the visitor request is outside the approved routing rules.",
    website: "",
    bestFor:
      "requests that are blocked for ISD or do not cleanly match Spooltech, ISD, or TRCW.",
    rules: [
      "commercial cooking equipment, BBQ pits, or smokers",
      "installation, equipment assembly, or plant maintenance when no approved route is clear",
      "unclear requests with no service details",
    ],
  },
};

const routeSignals = {
  spooltech: [
    ["spool", 8], ["coil tubing", 8], ["vessel", 10], ["tank", 10],
    ["pressure", 9], ["pressure containment", 12], ["fluid transportation", 11],
    ["process piping", 11], ["piping", 8], ["asme", 8], ["api", 6], ["dnv", 10],
    ["pump base", 5], ["manifold", 6], ["shipping frame", 5],
    ["large engineered", 7], ["offshore package", 7], ["spreader bar", 5],
    ["lifting beam", 5],
  ],
  trcw: [
    ["cladding", 12], ["overlay", 10], ["weld overlay", 12], ["weld inlay", 12],
    ["inlay", 8], ["hardfacing", 11], ["hard facing", 11], ["corrosion resistant", 9],
    ["inconel", 9], ["hastelloy", 9], ["duplex", 7], ["stellite", 9],
    ["monel", 8], ["nickel 625", 9], ["cnc machining", 8], ["machining", 7],
    ["milling", 6], ["turning", 6], ["boring", 6], ["frac valve", 9],
    ["valve repair", 8], ["wellhead", 9], ["bop", 9], ["nde", 8], ["ndt", 8],
    ["pmi", 6], ["pwht", 9], ["heat treatment", 8], ["stress relief", 8],
  ],
  isd: [
    ["sheet metal", 11], ["air handling", 11], ["ahu", 10],
    ["thermal coating booth", 12], ["coating booth", 11], ["plate cutting", 10],
    ["plasma", 8], ["cnc cutting", 9], ["cut and form", 9], ["forming", 7],
    ["press brake", 9], ["shearing", 8], ["rolling", 7],
    ["custom metal fabrication", 9], ["custom fabrication", 8], ["industrial fabrication", 7],
    ["weldment", 9], ["skid", 7], ["frame", 5], ["structural", 5],
    ["ventilation", 7], ["silencer", 7], ["dust collection", 8],
    ["material handling", 6], ["stairs", 6], ["stairway", 6], ["handrail", 6],
    ["architectural", 5],
  ],
};

const isdBlocks = [
  "commercial cooking", "cooking equipment", "bbq", "smoker", "installation", "install",
  "equipment assembly", "plant maintenance", "maintenance",
];
const hardSpooltech = ["vessel", "tank", "pressure containment", "fluid transportation", "process piping", "spool", "dnv"];
const hardTrcw = ["cladding", "weld overlay", "weld inlay", "hardfacing", "inconel", "stellite", "frac valve", "wellhead", "bop", "pwht"];
const storageKey = "industrial-router-demo-v1";

const state = {
  analytics: readAnalytics(),
  lastRoute: null,
  recognition: null,
  listening: false,
  speakEnabled: true,
  lastReply: "",
};

const $ = (selector) => document.querySelector(selector);
const els = {
  form: $("#requestForm"),
  input: $("#requestInput"),
  siteSelect: $("#siteSelect"),
  callerMessage: $("#callerMessage"),
  agentReply: $("#agentReply"),
  resultTitle: $("#result-title"),
  confidenceBadge: $("#confidenceBadge"),
  routeResult: $("#routeResult"),
  voiceStatus: $("#voiceStatus"),
  micButton: $("#micButton"),
  speakToggle: $("#speakToggle"),
  replayButton: $("#replayButton"),
  resetButton: $("#resetButton"),
  rulesGrid: $("#rulesGrid"),
  metricCalls: $("#metricCalls"),
  metricLow: $("#metricLow"),
  metricLeads: $("#metricLeads"),
  routeBreakdown: $("#routeBreakdown"),
  clearAnalytics: $("#clearAnalytics"),
  leadForm: $("#leadForm"),
};

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9+\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function phraseInText(text, phrase) {
  return normalize(text).includes(normalize(phrase));
}

function isNegatedTerm(text, phrase) {
  const normalizedText = normalize(text);
  const normalizedPhrase = normalize(phrase);
  const pressureOrPipingTerm = normalizedPhrase.includes("pressure") || normalizedPhrase.includes("piping");
  const negations = [
    `no ${normalizedPhrase}`,
    `without ${normalizedPhrase}`,
    `not ${normalizedPhrase}`,
    `does not involve ${normalizedPhrase}`,
    `doesn't involve ${normalizedPhrase}`,
  ];
  return (
    negations.some((negation) => normalizedText.includes(negation)) ||
    (pressureOrPipingTerm &&
      (normalizedText.includes("no pressure piping") || normalizedText.includes("without pressure piping")))
  );
}

function collectMatches(text, signalList) {
  return signalList.reduce(
    (acc, [term, weight]) => {
      if (phraseInText(text, term) && !isNegatedTerm(text, term)) {
        acc.score += weight;
        acc.matches.push(term);
      }
      return acc;
    },
    { score: 0, matches: [] },
  );
}

function analyzeRoute(rawText) {
  const text = normalize(rawText);
  if (!text) {
    return {
      business: businesses.review,
      score: 0,
      confidence: "low",
      confidenceLabel: "Low confidence",
      matches: [],
      reasons: ["No visitor request was provided."],
      nextQuestion: "Could you briefly describe what you need built, repaired, cut, formed, coated, machined, or fabricated?",
    };
  }

  const scores = Object.entries(routeSignals).map(([id, signals]) => ({
    id,
    ...collectMatches(text, signals),
  }));
  const blockedIsdMatches = isdBlocks.filter((term) => phraseInText(text, term));
  const spooltechHardMatch = hardSpooltech.some((term) => phraseInText(text, term) && !isNegatedTerm(text, term));
  const trcwHardMatch = hardTrcw.some((term) => phraseInText(text, term) && !isNegatedTerm(text, term));
  const isdScore = scores.find((score) => score.id === "isd");

  if (blockedIsdMatches.length && isdScore.score > 0 && !spooltechHardMatch && !trcwHardMatch) {
    return {
      business: businesses.review,
      score: Math.max(isdScore.score, 1),
      confidence: "low",
      confidenceLabel: "Needs review",
      matches: [...isdScore.matches, ...blockedIsdMatches],
      reasons: [
        "The request contains ISD-related fabrication language, but also includes work that ISD should not receive.",
        "ISD does not handle installation, equipment assembly, plant maintenance, commercial cooking equipment, BBQ pits, or smokers.",
      ],
      nextQuestion: "Confirm whether this is fabrication-only work or whether it needs manual review by group sales.",
    };
  }

  if (spooltechHardMatch) scores.find((score) => score.id === "spooltech").score += 8;
  if (trcwHardMatch) scores.find((score) => score.id === "trcw").score += 8;

  const ranked = scores.sort((a, b) => b.score - a.score);
  const winner = ranked[0];
  const margin = winner.score - ranked[1].score;
  if (winner.score === 0) {
    return {
      business: businesses.review,
      score: 0,
      confidence: "low",
      confidenceLabel: "Low confidence",
      matches: [],
      reasons: ["No approved routing signals were detected."],
      nextQuestion: "Ask whether this is cladding or machining, spools or pressure work, or custom fabrication like sheet metal, plate cutting, forming, skids, or weldments.",
    };
  }

  let confidence = "low";
  if (winner.score >= 18 || margin >= 8) confidence = "high";
  else if (winner.score >= 9 || margin >= 4) confidence = "medium";

  return {
    business: businesses[winner.id],
    score: winner.score,
    confidence,
    confidenceLabel: `${confidence[0].toUpperCase()}${confidence.slice(1)} confidence`,
    matches: winner.matches,
    runnersUp: ranked.slice(1),
    reasons: buildReasons(winner.id, winner.matches, text),
    nextQuestion: buildNextQuestion(winner.id, confidence),
  };
}

function buildReasons(id, matches, text) {
  const reasons = [];
  if (id === "spooltech") {
    reasons.push("This request points to Spooltech's large engineered fabrication lane.");
    if (matches.some((match) => ["vessel", "tank", "pressure", "process piping", "dnv", "spool"].includes(match))) {
      reasons.push("It includes a hard-routing signal such as spools, pressure work, process piping, vessels, tanks, or DNV.");
    }
  }
  if (id === "trcw") {
    reasons.push("This request points to TRCW's cladding, machining, overlay, NDE, or heat-treatment lane.");
    if (matches.some((match) => ["cladding", "overlay", "hardfacing", "inconel", "stellite", "wellhead", "frac valve"].includes(match))) {
      reasons.push("It includes a strong TRCW signal such as cladding, overlay, hardfacing, exotic alloys, or wellhead and valve work.");
    }
  }
  if (id === "isd") {
    reasons.push("This request points to ISD's custom fabrication and sheet metal manufacturing lane.");
    if (matches.some((match) => ["sheet metal", "air handling", "thermal coating booth", "plate cutting", "forming", "weldment", "skid"].includes(match))) {
      reasons.push("It includes ISD-fit work such as sheet metal, air handling units, thermal coating booths, plate cutting, forming, skids, or weldments.");
    }
    if (hardSpooltech.some((term) => phraseInText(text, term))) {
      reasons.push("Confirm there is no pressure containment, vessel, tank, fluid transportation, or process piping requirement before routing to ISD.");
    }
  }
  return reasons;
}

function buildNextQuestion(id, confidence) {
  if (confidence !== "low") {
    return "Capture the visitor's name, company, phone, email, material, drawings or specs if available, and needed timeline.";
  }
  if (id === "spooltech") return "Ask whether the job involves spools, vessels or tanks, pressure containment, process piping, fluid transportation, or DNV work.";
  if (id === "trcw") return "Ask whether the job involves cladding, weld overlay, machining, hardfacing, exotic alloys, NDE, or heat treatment.";
  return "Ask whether the job is fabrication-only sheet metal, plate cutting, forming, air handling units, thermal coating booths, skids, or weldments.";
}

function currentSiteId() {
  return els.siteSelect ? els.siteSelect.value : "group";
}

function currentSiteName() {
  const id = currentSiteId();
  return id === "group" ? "this group" : businesses[id].name;
}

function buildDefaultReply() {
  const siteId = currentSiteId();
  if (siteId === "group") {
    return "Tell me what you need help with, and I'll let you know whether Spooltech, ISD, or TRCW is the best fit.";
  }
  return `You are testing the ${businesses[siteId].name} website. Tell me what you need help with, and I'll let you know whether ${businesses[siteId].name} can help or whether a sister company is a better fit.`;
}

function buildCustomerReply(route, rawText) {
  const siteId = currentSiteId();
  const business = route.business;
  if (!rawText.trim()) return buildDefaultReply();

  if (business.id === "review") {
    return "I want to make sure I do not send you to the wrong team. This request needs a quick manual review. Please share your name, company, phone number, email, and any drawings or specs, and the right person can follow up.";
  }

  const nextStep = "I can help get your request routed. Please share your name, company, phone number, email, material, drawings or specs if available, and your needed timeline.";
  if (siteId === "group") {
    return `This sounds like a good fit for ${business.name}. ${business.name} is best for ${business.bestFor} ${nextStep}`;
  }
  if (siteId === business.id) {
    return `Yes. ${business.name} should be able to help with this type of request. ${business.name} is best for ${business.bestFor} ${nextStep}`;
  }
  return `${currentSiteName()} may not be the best fit for this request. This sounds better for sister company ${business.name}. ${business.name} is best for ${business.bestFor} ${nextStep}`;
}

function handoffScript(route) {
  if (route.business.id === "review") {
    return "I want to make sure this gets reviewed by the right person. I can capture your details and send a summary for follow-up.";
  }
  return `Based on what you told me, the best team is ${route.business.name}. I can transfer you now and pass along a short summary so you do not have to repeat everything.`;
}

function speak(text) {
  if (!state.speakEnabled || !("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.92;
  utterance.pitch = 0.95;
  utterance.volume = 1;
  utterance.onstart = () => { els.voiceStatus.textContent = "Speaking"; };
  utterance.onend = () => { els.voiceStatus.textContent = "Ready"; };
  utterance.onerror = () => { els.voiceStatus.textContent = "Voice unavailable"; };
  window.speechSynthesis.speak(utterance);
}

function updateAgentReply(text, shouldSpeak = true) {
  state.lastReply = text;
  const paragraph = els.agentReply.querySelector("p");
  paragraph.textContent = text;
  if (shouldSpeak) speak(text);
}

function renderRoute(route, rawText, shouldRecord = true) {
  state.lastRoute = { route, rawText, time: new Date().toISOString() };
  const customerReply = buildCustomerReply(route, rawText);
  updateAgentReply(customerReply);
  els.resultTitle.textContent = route.business.name;
  els.confidenceBadge.textContent = `${route.confidenceLabel} - ${route.score}`;
  els.confidenceBadge.className = `confidence-badge ${route.confidence}`;

  const matchItems = route.matches.length
    ? route.matches.map((match) => `<li>${escapeHtml(match)}</li>`).join("")
    : "<li>No direct signals</li>";
  const reasonHtml = route.reasons.map((reason) => `<p>${escapeHtml(reason)}</p>`).join("");
  const websiteHtml = route.business.website ? `<p><strong>Website:</strong> ${escapeHtml(route.business.website)}</p>` : "";

  els.routeResult.className = "route-card";
  els.routeResult.innerHTML = `
    <div class="route-destination">
      <div>
        <h3>${escapeHtml(route.business.name)}</h3>
        <p>${escapeHtml(route.business.bestFor)}</p>
      </div>
      <span class="route-logo" aria-hidden="true">${escapeHtml(route.business.initials)}</span>
    </div>
    <div class="detail-grid">
      <div class="detail-block"><h4>Matched Signals</h4><ul class="signal-list">${matchItems}</ul></div>
      <div class="detail-block"><h4>Why</h4>${reasonHtml}</div>
      <div class="detail-block">
        <h4>Transfer Details</h4>
        <p><strong>Phone:</strong> ${escapeHtml(route.business.phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(route.business.emails.join(", "))}</p>
        ${websiteHtml}
        <p><strong>Address:</strong> ${escapeHtml(route.business.address)}</p>
      </div>
      <div class="detail-block customer-reply"><h4>Spoken Visitor Reply</h4><p>${escapeHtml(customerReply)}</p></div>
      <div class="detail-block"><h4>Agent Script</h4><p>${escapeHtml(handoffScript(route))}</p></div>
      <div class="detail-block"><h4>Next Question</h4><p>${escapeHtml(route.nextQuestion)}</p></div>
    </div>
  `;

  if (shouldRecord) recordCall(route, rawText);
}

function recordCall(route, rawText) {
  state.analytics.calls.push({
    business: route.business.id,
    confidence: route.confidence,
    score: route.score,
    text: rawText,
    createdAt: new Date().toISOString(),
  });
  saveAnalytics();
  renderAnalytics();
}

function readAnalytics() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return {
      calls: Array.isArray(saved && saved.calls) ? saved.calls : [],
      leads: Array.isArray(saved && saved.leads) ? saved.leads : [],
    };
  } catch {
    return { calls: [], leads: [] };
  }
}

function saveAnalytics() {
  localStorage.setItem(storageKey, JSON.stringify(state.analytics));
}

function renderAnalytics() {
  const calls = state.analytics.calls;
  els.metricCalls.textContent = calls.length;
  els.metricLow.textContent = calls.filter((call) => call.confidence === "low").length;
  els.metricLeads.textContent = state.analytics.leads.length;

  const counts = { spooltech: 0, trcw: 0, isd: 0, review: 0 };
  calls.forEach((call) => { counts[call.business] = (counts[call.business] || 0) + 1; });
  const max = Math.max(...Object.values(counts), 1);
  els.routeBreakdown.innerHTML = Object.entries(counts)
    .map(([id, count]) => {
      const width = Math.round((count / max) * 100);
      return `<div class="breakdown-row"><span>${escapeHtml(businesses[id].name)}</span><span class="bar"><span style="width:${width}%"></span></span><strong>${count}</strong></div>`;
    })
    .join("");
}

function renderRules() {
  els.rulesGrid.innerHTML = ["spooltech", "trcw", "isd"]
    .map((id) => {
      const business = businesses[id];
      return `<article class="rules-card"><h3>${escapeHtml(business.name)}</h3><p>${escapeHtml(business.bestFor)}</p><ul>${business.rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}</ul></article>`;
    })
    .join("");
}

function updateCallerMessage(text) {
  const paragraph = els.callerMessage.querySelector("p");
  els.callerMessage.classList.toggle("is-empty", !text.trim());
  paragraph.textContent = text.trim() || "Your spoken or typed request will appear here.";
}

function setupVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!("speechSynthesis" in window)) {
    state.speakEnabled = false;
    els.speakToggle.textContent = "Voice reply unavailable";
    els.speakToggle.disabled = true;
    els.replayButton.disabled = true;
  }
  if (!SpeechRecognition) {
    els.voiceStatus.textContent = "Text input ready";
    els.micButton.disabled = true;
    els.micButton.title = "Speech input is not supported in this browser. Use the text box.";
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";
  state.recognition = recognition;

  recognition.onstart = () => {
    state.listening = true;
    els.voiceStatus.textContent = "Listening";
    els.micButton.querySelector("span:last-child").textContent = "Listening";
  };
  recognition.onend = () => {
    state.listening = false;
    els.voiceStatus.textContent = "Ready";
    els.micButton.querySelector("span:last-child").textContent = "Talk";
  };
  recognition.onerror = () => { els.voiceStatus.textContent = "Use text fallback"; };
  recognition.onresult = (event) => {
    const transcript = Array.from(event.results).map((result) => result[0].transcript).join(" ");
    els.input.value = transcript;
    updateCallerMessage(transcript);
    const lastResult = event.results[event.results.length - 1];
    if (lastResult && lastResult.isFinal) renderRoute(analyzeRoute(transcript), transcript);
  };
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = els.input.value;
  updateCallerMessage(text);
  renderRoute(analyzeRoute(text), text);
});

els.input.addEventListener("input", (event) => updateCallerMessage(event.target.value));

els.micButton.addEventListener("click", () => {
  if (!state.recognition) return;
  if (state.listening) state.recognition.stop();
  else state.recognition.start();
});

els.resetButton.addEventListener("click", () => {
  els.input.value = "";
  updateCallerMessage("");
  updateAgentReply(buildDefaultReply(), false);
  els.resultTitle.textContent = "Awaiting visitor request";
  els.confidenceBadge.textContent = "No score";
  els.confidenceBadge.className = "confidence-badge neutral";
  els.routeResult.className = "route-card empty-state";
  els.routeResult.innerHTML = "<p>The agent will answer the visitor, explain whether the current company can help, and recommend a sister company when needed.</p>";
});

els.speakToggle.addEventListener("click", () => {
  state.speakEnabled = !state.speakEnabled;
  els.speakToggle.textContent = `Voice reply: ${state.speakEnabled ? "On" : "Off"}`;
  if (!state.speakEnabled && "speechSynthesis" in window) window.speechSynthesis.cancel();
});

els.replayButton.addEventListener("click", () => {
  if (state.lastReply) speak(state.lastReply);
});

els.siteSelect.addEventListener("change", () => {
  if (state.lastRoute) renderRoute(state.lastRoute.route, state.lastRoute.rawText, false);
  else updateAgentReply(buildDefaultReply(), false);
});

document.querySelectorAll("[data-sample]").forEach((button) => {
  button.addEventListener("click", () => {
    const sample = button.dataset.sample;
    els.input.value = sample;
    updateCallerMessage(sample);
    renderRoute(analyzeRoute(sample), sample);
  });
});

els.clearAnalytics.addEventListener("click", () => {
  state.analytics = { calls: [], leads: [] };
  saveAnalytics();
  renderAnalytics();
});

els.leadForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.analytics.leads.push({
    name: $("#leadName").value.trim(),
    company: $("#leadCompany").value.trim(),
    phone: $("#leadPhone").value.trim(),
    email: $("#leadEmail").value.trim(),
    route: state.lastRoute ? state.lastRoute.route.business.id : "review",
    request: state.lastRoute ? state.lastRoute.rawText : "",
    createdAt: new Date().toISOString(),
  });
  saveAnalytics();
  renderAnalytics();
  els.leadForm.reset();
});

setupVoice();
updateAgentReply(buildDefaultReply(), false);
renderRules();
renderAnalytics();

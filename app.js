const businesses = {
  spooltech: {
    id: "spooltech",
    name: "Spooltech",
    initials: "ST",
    phone: "(281) 861-6800",
    emails: ["sales@spooltech.com"],
    address: "9325 Hwy. 6 North, Houston, TX 77095",
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
    bestFor:
      "cladding, machining, weld overlay, hardfacing, corrosion-resistant alloys, NDE, heat treatment, and wellhead/valve component work.",
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
    address: "Use only when the caller request is outside the approved routing rules.",
    bestFor:
      "requests that are blocked for ISD or do not cleanly match Spooltech, ISD, or TRCW.",
    rules: [
      "commercial cooking equipment, BBQ pits, or smokers",
      "installation, equipment assembly, or plant maintenance when no other approved route is clear",
      "unclear requests with no service details",
    ],
  },
};

const routeSignals = {
  spooltech: [
    { term: "spool", weight: 8 },
    { term: "coil tubing", weight: 8 },
    { term: "vessel", weight: 10 },
    { term: "tank", weight: 10 },
    { term: "pressure", weight: 9 },
    { term: "pressure containment", weight: 12 },
    { term: "fluid transportation", weight: 11 },
    { term: "process piping", weight: 11 },
    { term: "asme", weight: 8 },
    { term: "api", weight: 6 },
    { term: "dnv", weight: 10 },
    { term: "pump base", weight: 5 },
    { term: "manifold", weight: 6 },
    { term: "shipping frame", weight: 5 },
    { term: "large engineered", weight: 7 },
    { term: "offshore package", weight: 7 },
    { term: "spreader bar", weight: 5 },
    { term: "lifting beam", weight: 5 },
  ],
  trcw: [
    { term: "cladding", weight: 12 },
    { term: "overlay", weight: 10 },
    { term: "weld overlay", weight: 12 },
    { term: "weld inlay", weight: 12 },
    { term: "inlay", weight: 8 },
    { term: "hardfacing", weight: 11 },
    { term: "hard facing", weight: 11 },
    { term: "corrosion resistant", weight: 9 },
    { term: "inconel", weight: 9 },
    { term: "hastelloy", weight: 9 },
    { term: "duplex", weight: 7 },
    { term: "stellite", weight: 9 },
    { term: "monel", weight: 8 },
    { term: "nickel 625", weight: 9 },
    { term: "cnc machining", weight: 8 },
    { term: "machining", weight: 7 },
    { term: "milling", weight: 6 },
    { term: "turning", weight: 6 },
    { term: "boring", weight: 6 },
    { term: "frac valve", weight: 9 },
    { term: "valve repair", weight: 8 },
    { term: "wellhead", weight: 9 },
    { term: "bop", weight: 9 },
    { term: "nde", weight: 8 },
    { term: "ndt", weight: 8 },
    { term: "pmi", weight: 6 },
    { term: "pwht", weight: 9 },
    { term: "heat treatment", weight: 8 },
    { term: "stress relief", weight: 8 },
  ],
  isd: [
    { term: "sheet metal", weight: 11 },
    { term: "air handling", weight: 11 },
    { term: "ahu", weight: 10 },
    { term: "thermal coating booth", weight: 12 },
    { term: "coating booth", weight: 11 },
    { term: "plate cutting", weight: 10 },
    { term: "plasma", weight: 8 },
    { term: "cnc cutting", weight: 9 },
    { term: "cut and form", weight: 9 },
    { term: "forming", weight: 7 },
    { term: "press brake", weight: 9 },
    { term: "shearing", weight: 8 },
    { term: "rolling", weight: 7 },
    { term: "custom metal fabrication", weight: 9 },
    { term: "custom fabrication", weight: 8 },
    { term: "industrial fabrication", weight: 7 },
    { term: "weldment", weight: 9 },
    { term: "skid", weight: 7 },
    { term: "frame", weight: 5 },
    { term: "structural", weight: 5 },
    { term: "ventilation", weight: 7 },
    { term: "silencer", weight: 7 },
    { term: "dust collection", weight: 8 },
    { term: "material handling", weight: 6 },
    { term: "stairs", weight: 6 },
    { term: "stairway", weight: 6 },
    { term: "handrail", weight: 6 },
    { term: "architectural", weight: 5 },
  ],
};

const isdBlocks = [
  "commercial cooking",
  "cooking equipment",
  "bbq",
  "smoker",
  "installation",
  "install",
  "equipment assembly",
  "plant maintenance",
  "maintenance",
];

const hardSpooltech = [
  "vessel",
  "tank",
  "pressure containment",
  "fluid transportation",
  "process piping",
  "spool",
  "dnv",
];

const hardTrcw = [
  "cladding",
  "weld overlay",
  "weld inlay",
  "hardfacing",
  "inconel",
  "stellite",
  "frac valve",
  "wellhead",
  "bop",
  "pwht",
];

const storageKey = "industrial-router-demo-v1";

const state = {
  analytics: readAnalytics(),
  lastRoute: null,
  recognition: null,
  listening: false,
};

const els = {
  form: document.querySelector("#requestForm"),
  input: document.querySelector("#requestInput"),
  callerMessage: document.querySelector("#callerMessage"),
  resultTitle: document.querySelector("#result-title"),
  confidenceBadge: document.querySelector("#confidenceBadge"),
  routeResult: document.querySelector("#routeResult"),
  voiceStatus: document.querySelector("#voiceStatus"),
  micButton: document.querySelector("#micButton"),
  resetButton: document.querySelector("#resetButton"),
  rulesGrid: document.querySelector("#rulesGrid"),
  metricCalls: document.querySelector("#metricCalls"),
  metricLow: document.querySelector("#metricLow"),
  metricLeads: document.querySelector("#metricLeads"),
  routeBreakdown: document.querySelector("#routeBreakdown"),
  clearAnalytics: document.querySelector("#clearAnalytics"),
  leadForm: document.querySelector("#leadForm"),
};

function normalize(text) {
  return text
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
  const pressureOrPipingTerm =
    normalizedPhrase.includes("pressure") || normalizedPhrase.includes("piping");
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
      (normalizedText.includes("no pressure piping") ||
        normalizedText.includes("without pressure piping")))
  );
}

function collectMatches(text, signalList) {
  return signalList.reduce(
    (acc, signal) => {
      if (phraseInText(text, signal.term) && !isNegatedTerm(text, signal.term)) {
        acc.score += signal.weight;
        acc.matches.push(signal.term);
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
      reasons: ["No caller request was provided."],
      nextQuestion:
        "Could you briefly describe whether this is cladding, machining, plate cutting, forming, a pressure item, or custom fabrication?",
    };
  }

  const scores = Object.entries(routeSignals).map(([id, signals]) => ({
    id,
    ...collectMatches(text, signals),
  }));

  const blockedIsdMatches = isdBlocks.filter((term) => phraseInText(text, term));
  const spooltechHardMatch = hardSpooltech.some(
    (term) => phraseInText(text, term) && !isNegatedTerm(text, term),
  );
  const trcwHardMatch = hardTrcw.some(
    (term) => phraseInText(text, term) && !isNegatedTerm(text, term),
  );

  const isdScore = scores.find((score) => score.id === "isd");
  if (blockedIsdMatches.length && isdScore.score > 0 && !spooltechHardMatch && !trcwHardMatch) {
    return {
      business: businesses.review,
      score: Math.max(isdScore.score, 1),
      confidence: "low",
      confidenceLabel: "Needs review",
      matches: [...isdScore.matches, ...blockedIsdMatches],
      reasons: [
        "The request contains ISD-related fabrication language, but it also includes work that ISD should not receive.",
        "ISD does not handle installation, equipment assembly, plant maintenance, commercial cooking equipment, BBQ pits, or smokers.",
      ],
      nextQuestion:
        "Should this be captured for group sales review, or is the caller only asking for fabrication without installation or blocked equipment?",
    };
  }

  if (spooltechHardMatch) {
    scores.find((score) => score.id === "spooltech").score += 8;
  }

  if (trcwHardMatch) {
    scores.find((score) => score.id === "trcw").score += 8;
  }

  const ranked = scores.sort((a, b) => b.score - a.score);
  const winner = ranked[0];
  const runnerUp = ranked[1];
  const margin = winner.score - runnerUp.score;

  if (winner.score === 0) {
    return {
      business: businesses.review,
      score: 0,
      confidence: "low",
      confidenceLabel: "Low confidence",
      matches: [],
      reasons: ["No approved routing signals were detected."],
      nextQuestion:
        "Is this mainly cladding or machining, spools or pressure-containing equipment, or custom fabrication like sheet metal, plate cutting, forming, skids, or weldments?",
    };
  }

  let confidence = "low";
  if (winner.score >= 18 || margin >= 8) confidence = "high";
  else if (winner.score >= 9 || margin >= 4) confidence = "medium";

  const reasons = buildReasons(winner.id, winner.matches, text);
  return {
    business: businesses[winner.id],
    score: winner.score,
    confidence,
    confidenceLabel: `${confidence[0].toUpperCase()}${confidence.slice(1)} confidence`,
    matches: winner.matches,
    runnersUp: ranked.slice(1),
    reasons,
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
      reasons.push("It includes a strong TRCW signal such as cladding, overlay, hardfacing, exotic alloys, or wellhead/valve work.");
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
    return "Capture the caller's name, company, phone, email, material, drawings/spec availability, and timeline before transferring.";
  }
  if (id === "spooltech") {
    return "Ask whether the job involves spools, vessels/tanks, pressure containment, process piping, fluid transportation, or DNV work.";
  }
  if (id === "trcw") {
    return "Ask whether the job involves cladding, weld overlay, machining, hardfacing, exotic alloys, NDE, or heat treatment.";
  }
  return "Ask whether the job is fabrication-only sheet metal, plate cutting, forming, air handling units, thermal coating booths, skids, or weldments.";
}

function handoffScript(route) {
  if (route.business.id === "review") {
    return "I want to make sure this gets reviewed by the right person. I can capture your details and send a summary for follow-up.";
  }

  return `Based on what you told me, the best team is ${route.business.name}. I can transfer you now and pass along a short summary so you do not have to repeat everything.`;
}

function renderRoute(route, rawText) {
  state.lastRoute = { route, rawText, time: new Date().toISOString() };
  els.resultTitle.textContent = route.business.name;
  els.confidenceBadge.textContent = `${route.confidenceLabel} · ${route.score}`;
  els.confidenceBadge.className = `confidence-badge ${route.confidence}`;

  const matchItems = route.matches.length
    ? route.matches.map((match) => `<li>${escapeHtml(match)}</li>`).join("")
    : "<li>No direct signals</li>";

  const reasonHtml = route.reasons.map((reason) => `<p>${escapeHtml(reason)}</p>`).join("");

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
      <div class="detail-block">
        <h4>Matched Signals</h4>
        <ul class="signal-list">${matchItems}</ul>
      </div>
      <div class="detail-block">
        <h4>Why</h4>
        ${reasonHtml}
      </div>
      <div class="detail-block">
        <h4>Transfer Details</h4>
        <p><strong>Phone:</strong> ${escapeHtml(route.business.phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(route.business.emails.join(", "))}</p>
        <p><strong>Address:</strong> ${escapeHtml(route.business.address)}</p>
      </div>
      <div class="detail-block">
        <h4>Agent Script</h4>
        <p>${escapeHtml(handoffScript(route))}</p>
      </div>
      <div class="detail-block">
        <h4>Next Question</h4>
        <p>${escapeHtml(route.nextQuestion)}</p>
      </div>
    </div>
  `;

  recordCall(route, rawText);
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
      calls: Array.isArray(saved?.calls) ? saved.calls : [],
      leads: Array.isArray(saved?.leads) ? saved.leads : [],
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
  const lowConfidence = calls.filter((call) => call.confidence === "low").length;
  els.metricCalls.textContent = calls.length;
  els.metricLow.textContent = lowConfidence;
  els.metricLeads.textContent = state.analytics.leads.length;

  const counts = {
    spooltech: 0,
    trcw: 0,
    isd: 0,
    review: 0,
  };
  calls.forEach((call) => {
    counts[call.business] = (counts[call.business] || 0) + 1;
  });
  const max = Math.max(...Object.values(counts), 1);
  els.routeBreakdown.innerHTML = Object.entries(counts)
    .map(([id, count]) => {
      const width = Math.round((count / max) * 100);
      return `
        <div class="breakdown-row">
          <span>${escapeHtml(businesses[id].name)}</span>
          <span class="bar"><span style="width:${width}%"></span></span>
          <strong>${count}</strong>
        </div>
      `;
    })
    .join("");
}

function renderRules() {
  els.rulesGrid.innerHTML = ["spooltech", "trcw", "isd"]
    .map((id) => {
      const business = businesses[id];
      return `
        <article class="rules-card">
          <h3>${escapeHtml(business.name)}</h3>
          <p>${escapeHtml(business.bestFor)}</p>
          <ul>${business.rules.map((rule) => `<li>${escapeHtml(rule)}</li>`).join("")}</ul>
        </article>
      `;
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
  if (!SpeechRecognition) {
    els.voiceStatus.textContent = "Voice unavailable";
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

  recognition.onerror = () => {
    els.voiceStatus.textContent = "Use text fallback";
  };

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join(" ");
    els.input.value = transcript;
    updateCallerMessage(transcript);
    const lastResult = event.results[event.results.length - 1];
    if (lastResult?.isFinal) {
      const route = analyzeRoute(transcript);
      renderRoute(route, transcript);
    }
  };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

els.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = els.input.value;
  updateCallerMessage(text);
  renderRoute(analyzeRoute(text), text);
});

els.input.addEventListener("input", (event) => {
  updateCallerMessage(event.target.value);
});

els.micButton.addEventListener("click", () => {
  if (!state.recognition) return;
  if (state.listening) {
    state.recognition.stop();
  } else {
    state.recognition.start();
  }
});

els.resetButton.addEventListener("click", () => {
  els.input.value = "";
  updateCallerMessage("");
  els.resultTitle.textContent = "Awaiting caller request";
  els.confidenceBadge.textContent = "No score";
  els.confidenceBadge.className = "confidence-badge neutral";
  els.routeResult.className = "route-card empty-state";
  els.routeResult.innerHTML =
    "<p>The demo will score the request, choose a destination, explain why, and generate the handoff script.</p>";
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
  const formData = {
    name: document.querySelector("#leadName").value.trim(),
    company: document.querySelector("#leadCompany").value.trim(),
    phone: document.querySelector("#leadPhone").value.trim(),
    email: document.querySelector("#leadEmail").value.trim(),
    route: state.lastRoute?.route.business.id || "review",
    request: state.lastRoute?.rawText || "",
    createdAt: new Date().toISOString(),
  };
  state.analytics.leads.push(formData);
  saveAnalytics();
  renderAnalytics();
  els.leadForm.reset();
});

setupVoice();
renderRules();
renderAnalytics();

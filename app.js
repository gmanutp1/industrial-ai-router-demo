const businesses = {
  spooltech: {
    id: "spooltech",
    name: "Spooltech",
    shortFit: "pressure work, spools, process piping, vessels, tanks, DNV work, and larger engineered fabrication",
    signals: [
      "spool", "vessel", "tank", "pressure", "pressure containment", "fluid transportation",
      "process piping", "piping", "asme", "api", "dnv", "pump base", "manifold",
      "offshore", "lifting beam", "spreader bar",
    ],
  },
  isd: {
    id: "isd",
    name: "ISD",
    shortFit: "sheet metal, plate cutting, forming, skids, weldments, coating booths, and air handling units",
    signals: [
      "sheet metal", "air handling", "ahu", "thermal coating booth", "coating booth",
      "plate cutting", "plasma", "cnc cutting", "cut and form", "forming", "press brake",
      "shearing", "rolling", "custom fabrication", "industrial fabrication", "weldment",
      "skid", "frame", "structural", "ventilation", "silencer", "dust collection",
      "material handling", "stairs", "handrail", "architectural",
    ],
    blocked: [
      "commercial cooking", "cooking equipment", "bbq", "smoker", "installation", "install",
      "equipment assembly", "plant maintenance", "maintenance",
    ],
  },
  trcw: {
    id: "trcw",
    name: "TRCW",
    shortFit: "cladding, weld overlay, hardfacing, machining, exotic alloys, NDE, and heat treatment",
    signals: [
      "cladding", "overlay", "weld overlay", "weld inlay", "inlay", "hardfacing",
      "hard facing", "corrosion resistant", "inconel", "hastelloy", "duplex", "stellite",
      "monel", "nickel 625", "cnc machining", "machining", "milling", "turning",
      "boring", "frac valve", "valve repair", "wellhead", "bop", "nde", "ndt",
      "pmi", "pwht", "heat treatment", "stress relief",
    ],
  },
};

const siteCopy = {
  spooltech: {
    company: "Spooltech",
    headline: "Industrial fabrication support without the phone tree.",
    copy: "This page is only a host-site preview. The actual product experience is Bob, the floating voice agent in the lower-left corner.",
  },
  isd: {
    company: "ISD",
    headline: "Custom fabrication and sheet metal support, routed in seconds.",
    copy: "Bob can sit on the ISD website, answer naturally, and redirect visitors when a sister company is the better fit.",
  },
  trcw: {
    company: "TRCW",
    headline: "Cladding, machining, and overlay questions get a faster first answer.",
    copy: "Bob can qualify the visitor request and keep the handoff clean when the work belongs with TRCW.",
  },
  group: {
    company: "Spooltech Group",
    headline: "One voice agent for three industrial businesses.",
    copy: "Bob can greet visitors, understand the request, and guide them to Spooltech, ISD, or TRCW without showing the customer a routing dashboard.",
  },
};

const greetingText = "Hi I am Bob, how can I be of assistance today?";
const spokenGreetingText = "Hi, I am Bob. How can I be of assistance today?";

const state = {
  open: false,
  listening: false,
  recognition: null,
  voices: [],
  lastReply: greetingText,
};

const els = {
  previewCompany: document.querySelector("#previewCompany"),
  previewHeadline: document.querySelector("#previewHeadline"),
  previewCopy: document.querySelector("#previewCopy"),
  siteSelect: document.querySelector("#siteSelect"),
  launcher: document.querySelector("#bobLauncher"),
  panel: document.querySelector("#bobPanel"),
  close: document.querySelector("#closeBob"),
  status: document.querySelector("#bobStatus"),
  reply: document.querySelector("#bobReply"),
  visitorText: document.querySelector("#visitorText"),
  micButton: document.querySelector("#micButton"),
  replayButton: document.querySelector("#replayButton"),
  fallbackForm: document.querySelector("#textFallback"),
  input: document.querySelector("#requestInput"),
};

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9+\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function currentSiteId() {
  return els.siteSelect.value;
}

function setPreview(siteId) {
  const copy = siteCopy[siteId];
  els.previewCompany.textContent = copy.company;
  els.previewHeadline.textContent = copy.headline;
  els.previewCopy.textContent = copy.copy;
}

function chooseVoice() {
  const voices = state.voices.length ? state.voices : window.speechSynthesis?.getVoices?.() || [];
  const preferred = [
    "Microsoft Aria",
    "Microsoft Jenny",
    "Microsoft Guy",
    "Microsoft Ava",
    "Microsoft Andrew",
    "Microsoft Brian",
    "Google US English",
    "Google UK English Male",
    "Google UK English Female",
    "Samantha",
    "Karen",
    "Alex",
    "Daniel",
  ];

  return (
    preferred.map((name) => voices.find((voice) => voice.name.includes(name))).find(Boolean) ||
    voices.find((voice) => voice.lang && voice.lang.toLowerCase().startsWith("en-us")) ||
    voices.find((voice) => voice.lang && voice.lang.toLowerCase().startsWith("en")) ||
    null
  );
}

function speechText(text) {
  if (text === greetingText) return spokenGreetingText;
  return text;
}

function speak(text, onDone) {
  state.lastReply = text;
  els.reply.textContent = text;

  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
    els.status.textContent = "Text reply ready";
    if (onDone) onDone();
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(speechText(text));
  const voice = chooseVoice();
  if (voice) utterance.voice = voice;
  utterance.rate = 0.94;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.onstart = () => {
    els.status.textContent = "Bob is speaking";
  };
  utterance.onend = () => {
    els.status.textContent = "Ready when you are";
    if (onDone) onDone();
  };
  utterance.onerror = () => {
    els.status.textContent = "Text reply ready";
    if (onDone) onDone();
  };
  window.speechSynthesis.speak(utterance);
}

function openBob() {
  state.open = true;
  els.panel.hidden = false;
  els.launcher.setAttribute("aria-expanded", "true");
  els.reply.textContent = greetingText;
  speak(greetingText);
}

function closeBob() {
  state.open = false;
  els.panel.hidden = true;
  els.launcher.setAttribute("aria-expanded", "false");
  if (state.recognition && state.listening) state.recognition.stop();
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

function scoreBusiness(text, business) {
  const normalized = normalize(text);
  return business.signals.reduce((score, signal) => {
    return normalized.includes(signal) ? score + signal.length : score;
  }, 0);
}

function analyzeRoute(text) {
  const normalized = normalize(text);
  const blockedIsd = businesses.isd.blocked.some((term) => normalized.includes(term));
  const scores = ["spooltech", "isd", "trcw"]
    .map((id) => ({ id, score: scoreBusiness(normalized, businesses[id]) }))
    .sort((a, b) => b.score - a.score);

  if (blockedIsd && scores[0].id === "isd") return { id: "review", confidence: "low" };
  if (!scores[0].score) return { id: "review", confidence: "low" };
  return { id: scores[0].id, confidence: scores[0].score > scores[1].score + 8 ? "high" : "medium" };
}

function buildReply(text) {
  const route = analyzeRoute(text);
  const siteId = currentSiteId();

  if (route.id === "review") {
    return "Thanks for explaining that. I do not want to send you to the wrong person, so I would have the team review this and follow up directly.";
  }

  const business = businesses[route.id];
  if (siteId === "group") {
    return `Thanks. That sounds like a good fit for ${business.name}. I can help get the request pointed to the right team.`;
  }

  if (siteId === route.id) {
    return `Yes, ${business.name} should be able to help with that. I can help get your request moving.`;
  }

  return `Thanks. That sounds more like a fit for ${business.name}, one of the sister companies. I would point you that direction.`;
}

function handleVisitorText(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  els.visitorText.textContent = trimmed;
  const reply = buildReply(trimmed);
  speak(reply);
}

function setupSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    els.status.textContent = "Mic unavailable. Type instead.";
    els.micButton.disabled = true;
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = "en-US";
  state.recognition = recognition;

  recognition.onstart = () => {
    state.listening = true;
    els.status.textContent = "Listening";
    els.micButton.textContent = "Listening...";
  };

  recognition.onend = () => {
    state.listening = false;
    els.micButton.textContent = "Start talking";
    if (els.status.textContent === "Listening") els.status.textContent = "Ready when you are";
  };

  recognition.onerror = () => {
    els.status.textContent = "I did not catch that. Type it below or try again.";
  };

  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join(" ");
    els.visitorText.textContent = transcript;
    const finalResult = event.results[event.results.length - 1];
    if (finalResult && finalResult.isFinal) handleVisitorText(transcript);
  };
}

if ("speechSynthesis" in window) {
  state.voices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    state.voices = window.speechSynthesis.getVoices();
  };
}

setPreview(currentSiteId());
setupSpeechRecognition();

els.siteSelect.addEventListener("change", (event) => setPreview(event.target.value));

els.launcher.addEventListener("click", () => {
  if (state.open) {
    speak(greetingText);
  } else {
    openBob();
  }
});

els.close.addEventListener("click", closeBob);

els.micButton.addEventListener("click", () => {
  if (!state.recognition) return;
  if (state.listening) state.recognition.stop();
  else state.recognition.start();
});

els.replayButton.addEventListener("click", () => speak(state.lastReply));

els.fallbackForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleVisitorText(els.input.value);
  els.input.value = "";
});

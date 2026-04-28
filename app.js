const businesses = {
  spooltech: {
    id: "spooltech",
    name: "Spooltech",
    shortFit: "pressure work, spools, piping, vessels, tanks, DNV work, and larger engineered fabrication",
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
const spokenGreetingText = "Hi, I'm Bob. How can I help today?";
const contactFields = ["name", "phone", "email", "company", "timeline"];
const allowedVoices = ["cedar", "marin", "onyx", "echo"];
const defaultVoice = "cedar";
const voiceStyleInstructions = [
  "You are Bob, a warm adult male industrial receptionist.",
  "Sound relaxed, confident, friendly, and lightly expressive.",
  "Use a natural lower-register delivery with medium-slow pacing.",
  "Speak in short phrases with small pauses between ideas.",
  "Make it sound like one helpful person talking, not a script being read.",
  "Use contractions like I'm, you're, that's, and we'll.",
  "Avoid robotic phrasing, corporate jargon, long sentences, numbered-list speech, and support-article language.",
  "Never say: As an AI language model, I am here to assist you, or Processing your request.",
].join(" ");

const voiceConfig = {
  endpoint:
    new URLSearchParams(window.location.search).get("tts") ||
    window.BOB_TTS_ENDPOINT ||
    localStorage.getItem("bobTtsEndpoint") ||
    "",
  voice:
    new URLSearchParams(window.location.search).get("voice") ||
    localStorage.getItem("bobVoice") ||
    defaultVoice,
};

const state = {
  open: false,
  listening: false,
  recognition: null,
  audio: null,
  lastReply: greetingText,
  intake: createIntake(),
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
  summary: document.querySelector("#intakeSummary"),
  reply: document.querySelector("#bobReply"),
  visitorText: document.querySelector("#visitorText"),
  micButton: document.querySelector("#micButton"),
  replayButton: document.querySelector("#replayButton"),
  voiceSelect: document.querySelector("#voiceSelect"),
  fallbackForm: document.querySelector("#textFallback"),
  input: document.querySelector("#requestInput"),
};

function createIntake() {
  return {
    step: "request",
    request: "",
    route: null,
    fields: {
      name: "",
      phone: "",
      email: "",
      company: "",
      timeline: "",
    },
  };
}

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9+@._\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanValue(text) {
  return String(text || "")
    .replace(/\s+/g, " ")
    .replace(/^[,.\s]+|[,.\s]+$/g, "")
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

function configuredVoice() {
  return allowedVoices.includes(voiceConfig.voice) ? voiceConfig.voice : defaultVoice;
}

function rewriteForSpeech(text) {
  const base = text === greetingText ? spokenGreetingText : text;
  return base
    .replace(/[*_`#>-]/g, "")
    .replace(/\bI am\b/g, "I'm")
    .replace(/\bI will\b/g, "I'll")
    .replace(/\bI do not\b/g, "I don't")
    .replace(/\bYou are\b/g, "You're")
    .replace(/\bThat is\b/g, "That's")
    .replace(/\bWe will\b/g, "We'll")
    .replace(/\bGot it\. That sounds more like\b/g, "Got it. That sounds like")
    .replace(/\bPerfect\. I have what I need for now\./g, "Perfect. I've got what I need for now.")
    .replace(/\bISD\b/g, "I S D")
    .replace(/\bTRCW\b/g, "T R C W")
    .replace(/\bDNV\b/g, "D N V")
    .replace(/\bNDE\b/g, "N D E")
    .replace(/\s+/g, " ")
    .trim();
}

function setVoiceStatus(message) {
  els.status.textContent = message;
}

async function speak(text, onDone) {
  state.lastReply = text;
  els.reply.textContent = text;

  if (!voiceConfig.endpoint) {
    setVoiceStatus("OpenAI voice endpoint not configured");
    if (onDone) onDone();
    return;
  }

  if (state.audio) {
    state.audio.pause();
    state.audio = null;
  }

  try {
    setVoiceStatus("Getting Bob's voice");
    const response = await fetch(voiceConfig.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: rewriteForSpeech(text),
        voice: configuredVoice(),
        instructions: voiceStyleInstructions,
        response_format: "mp3",
      }),
    });

    if (!response.ok) throw new Error(`TTS request failed: ${response.status}`);
    const contentType = response.headers.get("content-type") || "";
    let audioBlob;
    if (contentType.includes("application/json")) {
      const data = await response.json();
      audioBlob = base64ToBlob(data.audio, data.mimeType || "audio/mpeg");
    } else {
      audioBlob = await response.blob();
    }

    const audio = new Audio(URL.createObjectURL(audioBlob));
    state.audio = audio;
    audio.onplay = () => setVoiceStatus("Bob is speaking");
    audio.onended = () => {
      setVoiceStatus("Ready when you are");
      URL.revokeObjectURL(audio.src);
      if (onDone) onDone();
    };
    audio.onerror = () => {
      setVoiceStatus("Voice playback failed");
      if (onDone) onDone();
    };
    await audio.play();
  } catch (error) {
    console.warn(error);
    setVoiceStatus("OpenAI voice unavailable");
    if (onDone) onDone();
  }
}

function base64ToBlob(base64, mimeType) {
  const binary = atob(base64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new Blob([bytes], { type: mimeType });
}

function updateSummary() {
  const route = state.intake.route;
  const captured = contactFields.filter((field) => state.intake.fields[field]).length;
  if (!state.intake.request) {
    els.summary.textContent = "Tell Bob what you need first.";
    return;
  }
  const routeName = route && route.id !== "review" ? businesses[route.id].name : "review";
  els.summary.textContent = `Route: ${routeName} | Details: ${captured}/5`;
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
  if (state.audio) state.audio.pause();
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

  if (blockedIsd && (!scores[0].score || scores[0].id === "isd")) {
    return { id: "review", confidence: "low", reason: "blocked" };
  }
  if (!scores[0].score) return { id: "review", confidence: "low", reason: "unknown" };
  return {
    id: scores[0].id,
    confidence: scores[0].score > scores[1].score + 8 ? "high" : "medium",
    reason: "matched",
  };
}

function hasRoutingSignal(text) {
  return analyzeRoute(text).reason !== "unknown";
}

function isGreetingOnly(text) {
  const normalized = normalize(text);
  return ["hi", "hello", "hey", "good morning", "good afternoon"].includes(normalized);
}

function firstName() {
  const name = state.intake.fields.name;
  return name ? name.split(" ")[0] : "";
}

function nextMissingField() {
  return contactFields.find((field) => !state.intake.fields[field]) || "done";
}

function questionFor(field) {
  if (field === "name") return "What name should I put on this?";
  if (field === "phone") return `${firstName() ? `Thanks, ${firstName()}. ` : "Thanks. "}What's the best phone number for you?`;
  if (field === "email") return "Got it. What's the best email address?";
  if (field === "company") return "Thanks. What company are you with?";
  if (field === "timeline") return "And what timeline are you working with?";
  return finalReply();
}

function routeIntro(route) {
  const siteId = currentSiteId();
  if (route.id === "review") {
    return "Got it. I don't want to point you to the wrong team, so I'll have someone review it.";
  }
  const business = businesses[route.id];
  if (siteId === "group") return `Got it. That sounds like ${business.name}.`;
  if (siteId === route.id) return `Yes, ${business.name} should be the right place for that.`;
  return `Got it. That sounds more like ${business.name}, one of the sister companies.`;
}

function finalReply() {
  const route = state.intake.route;
  const routeName = route && route.id !== "review" ? businesses[route.id].name : "the team";
  return `Perfect. I've got what I need for now. I'll route this to ${routeName}, and someone can follow up with you.`;
}

function clarifyReply() {
  return "I can help. Is this closer to pressure work, sheet metal and air handling, or overlay and machining?";
}

function applyExtractedFields(text, expectedField) {
  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  if (email) state.intake.fields.email = email[0];

  const phone = text.match(/(?:\+?1[\s.-]?)?(?:\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}/);
  if (phone) state.intake.fields.phone = phone[0];

  const named = text.match(/\b(?:my name is|this is|i am|i'm|name is)\s+([a-z][a-z.'-]+(?:\s+[a-z][a-z.'-]+){0,3})/i);
  if (named) state.intake.fields.name = cleanValue(named[1]);

  const company = text.match(/\b(?:company is|company name is|i work for|we are with|i am with|i'm with|from)\s+([a-z0-9&.,' -]{2,50})/i);
  if (company) state.intake.fields.company = cleanValue(company[1]);

  if (expectedField === "name" && !state.intake.fields.name && !hasRoutingSignal(text) && !email && !phone) {
    state.intake.fields.name = cleanValue(text.replace(/^(it is|it's|this is|name is)\s+/i, ""));
  }

  if (expectedField === "company" && !state.intake.fields.company && !email && !phone) {
    state.intake.fields.company = cleanValue(text.replace(/^(company is|we are|we're|i'm with|i am with|from)\s+/i, ""));
  }

  if (expectedField === "timeline" && !state.intake.fields.timeline && !email && !phone) {
    state.intake.fields.timeline = cleanValue(text);
  }
}

function missingFieldReply(field) {
  if (field === "phone") return "I may have missed the number. What's the best phone number?";
  if (field === "email") return "I may have missed the email. What's the best email address?";
  if (field === "name") return "Sure. What name should I put on the request?";
  if (field === "company") return "What company are you with?";
  return questionFor(field);
}

function handleRequestStep(text) {
  if (isGreetingOnly(text)) {
    return "Hey, glad to help. What are you trying to get built or serviced?";
  }

  applyExtractedFields(text);
  const route = analyzeRoute(text);
  if (route.reason === "unknown") {
    state.intake.request = text;
    state.intake.route = route;
    updateSummary();
    return clarifyReply();
  }

  state.intake.request = text;
  state.intake.route = route;
  state.intake.step = nextMissingField();
  updateSummary();
  return `${routeIntro(route)} ${questionFor(state.intake.step)}`;
}

function handleFieldStep(text) {
  const expected = state.intake.step;
  applyExtractedFields(text, expected);

  if (expected !== "done" && !state.intake.fields[expected]) {
    updateSummary();
    return missingFieldReply(expected);
  }

  state.intake.step = nextMissingField();
  updateSummary();

  if (state.intake.step === "done") return finalReply();
  return questionFor(state.intake.step);
}

function nextBobReply(text) {
  const trimmed = cleanValue(text);
  if (!trimmed) return "I am here. What can I help you route today?";

  if (/\b(start over|reset|new request)\b/i.test(trimmed)) {
    state.intake = createIntake();
    updateSummary();
    return "No problem. Let's start fresh. What do you need help with?";
  }

  if (state.intake.step === "request") return handleRequestStep(trimmed);
  if (state.intake.step === "done") {
    return "Got it. I will add that note.";
  }
  return handleFieldStep(trimmed);
}

function handleVisitorText(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  els.visitorText.textContent = trimmed;
  speak(nextBobReply(trimmed));
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

setPreview(currentSiteId());
setupSpeechRecognition();
updateSummary();
els.voiceSelect.value = configuredVoice();

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

els.voiceSelect.addEventListener("change", (event) => {
  voiceConfig.voice = allowedVoices.includes(event.target.value) ? event.target.value : defaultVoice;
  localStorage.setItem("bobVoice", voiceConfig.voice);
  setVoiceStatus("Voice updated");
});

els.fallbackForm.addEventListener("submit", (event) => {
  event.preventDefault();
  handleVisitorText(els.input.value);
  els.input.value = "";
});

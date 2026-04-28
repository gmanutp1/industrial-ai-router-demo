const allowedVoices = new Set(["cedar", "marin", "onyx", "echo"]);

export async function handler(event) {
  const method = event.requestContext?.http?.method || event.httpMethod;

  if (method === "OPTIONS") {
    return corsResponse(204, "");
  }

  try {
    const rawBody = event.isBase64Encoded
      ? Buffer.from(event.body || "", "base64").toString("utf8")
      : event.body || "{}";
    const body = JSON.parse(rawBody || "{}");
    const text = String(body.text || "").slice(0, 2000).trim();
    const voice = allowedVoices.has(body.voice) ? body.voice : "cedar";
    const instructions = String(body.instructions || "").slice(0, 1200);

    if (!text) return corsResponse(400, JSON.stringify({ error: "Missing text" }), "application/json");
    if (!process.env.OPENAI_API_KEY) {
      return corsResponse(500, JSON.stringify({ error: "OPENAI_API_KEY is not configured" }), "application/json");
    }

    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts",
        voice,
        input: text,
        instructions,
        response_format: "mp3",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return corsResponse(response.status, JSON.stringify({ error: errorText }), "application/json");
    }

    const audio = Buffer.from(await response.arrayBuffer()).toString("base64");
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST,OPTIONS",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ audio, mimeType: "audio/mpeg", voice }),
    };
  } catch (error) {
    return corsResponse(500, JSON.stringify({ error: error.message }), "application/json");
  }
}

function corsResponse(statusCode, body, contentType = "text/plain") {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Content-Type": contentType,
    },
    body,
  };
}

export async function getAIResponse(message, language = "english") {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost",
          "X-Title": "AgriVision AI"
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are an expert agriculture assistant. Reply clearly and help farmers."
            },
            {
              role: "user",
              content: `Language: ${language}. Question: ${message}`
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("OPENROUTER RESPONSE:", data); // IMPORTANT DEBUG

    if (!response.ok) {
      return `API Error: ${data?.error?.message || "Request failed"}`;
    }

    return data?.choices?.[0]?.message?.content;
  } catch (err) {
    return "Network error or API not working";
  }
}
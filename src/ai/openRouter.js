export async function getAIResponse(message, language = "english") {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "AgriVision AI"
        },

        body: JSON.stringify({
          model: "openai/gpt-4o-mini",

          messages: [
            {
              role: "system",
              content:
                "You are an expert agriculture assistant. Help farmers with crops, soil, fertilizer, weather, pests, plant diseases, and general farming questions. Give clear, practical answers in simple language."
            },
            {
              role: "user",
              content: `Language: ${language}. Question: ${message}`
            }
          ],

          // Keep the response small enough for available OpenRouter credits
          max_tokens: 1000,

          temperature: 0.4
        })
      }
    );

    const data = await response.json();

    console.log("🌾 OPENROUTER RESPONSE:", data);

    if (!response.ok) {
      console.error("❌ OpenRouter Error:", data);

      return `API Error: ${
        data?.error?.message || "Request failed"
      }`;
    }

    const answer = data?.choices?.[0]?.message?.content;

    if (!answer) {
      console.error("❌ No AI response:", data);

      return "Sorry, I could not generate a response.";
    }

    return answer;

  } catch (err) {
    console.error("❌ Network/API Error:", err);

    return "Network error or AI service is currently unavailable.";
  }
}
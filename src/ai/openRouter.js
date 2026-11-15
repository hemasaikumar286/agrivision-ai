export async function getAIResponse(message, language = "english") {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Gemini API key is missing");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an expert agriculture assistant.

Help farmers with:
- Crops
- Soil
- Fertilizers
- Weather
- Pests
- Plant diseases
- General farming questions

Give clear, practical answers in simple language.

Language: ${language}

Question: ${message}`
                }
              ]
            }
          ],

          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1000
          }
        })
      }
    );

    const data = await response.json();

    console.log("🌾 GEMINI RESPONSE:", data);

    if (!response.ok) {
      console.error("❌ Gemini Error:", data);

      return `API Error: ${
        data?.error?.message || "Request failed"
      }`;
    }

    const answer = data?.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "")
      .join("\n")
      .trim();

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
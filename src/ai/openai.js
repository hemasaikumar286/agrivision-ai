export async function getAIResponse(message, language = "english") {
  try {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Gemini API key is missing");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
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
                  text:
                    "You are an expert farming assistant. Respond in the user's language.\n\n" +
                    message +
                    "\n\nLanguage: " + language
                }
              ]
            }
          ],

          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1000
          }
        })
      }
    );

    const data = await response.json();

    console.log("🌱 GEMINI RESPONSE:", data);

    if (!response.ok) {
      throw new Error(
        data?.error?.message || "Gemini API request failed"
      );
    }

    return (
      data?.candidates?.[0]?.content?.parts
        ?.map(part => part.text || "")
        .join("\n")
        .trim() || "No response from AI"
    );

  } catch (error) {
    console.error("AI error:", error);
    return "AI error: " + error.message;
  }
}
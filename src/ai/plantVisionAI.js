export async function analyzePlantImage(base64Image, language = "english") {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are ONLY a plant disease detection AI. You must NOT answer anything else. If image is not a plant leaf, say 'Not a plant image'. Always return: Disease name, cause, and solution in simple farming language."
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Language: ${language}. Analyze ONLY this plant image.`
              },
              {
                type: "image_url",
                image_url: {
                  url: base64Image
                }
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    console.log("API RESPONSE:", data); // 🔥 IMPORTANT DEBUG

    return (
      data?.choices?.[0]?.message?.content ||
      "⚠ Unable to analyze plant image"
    );
  } catch (err) {
    console.error(err);
    return "❌ Plant analysis failed";
  }
}
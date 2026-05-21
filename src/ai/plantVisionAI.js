export async function analyzePlantImage(base64Image, language = "english") {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_OPENROUTER_API_KEY"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert plant disease detection AI. Analyze images and respond with disease, cause, and solution in simple farmer-friendly language."
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Language: ${language}. Identify plant disease and give solution.`
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

    return data?.choices?.[0]?.message?.content || "No analysis available";
  } catch (err) {
    return "Image analysis failed. Try again.";
  }
}
export async function analyzePlantImage(base64Image, language = "english") {
  try {
    if (!base64Image) {
      throw new Error("No image was provided");
    }

    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!apiKey) {
      throw new Error("OpenRouter API key is missing");
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "AgriVision AI"
        },

        body: JSON.stringify({
          model: "nvidia/nemotron-3.5-super-vl:free",

          reasoning: {
            enabled: false
          },

          messages: [
            {
              role: "system",
              content:
                "You are AgriVision AI, an agricultural plant disease detection assistant. Analyze ONLY plant or plant-leaf images. If the uploaded image is not a plant, clearly say 'Not a plant image'. Identify the likely disease or condition, cause, symptoms, and practical treatment or prevention steps. Do not diagnose humans or animals. Give the answer in simple language suitable for farmers."
            },

            {
              role: "user",

              content: [
                {
                  type: "text",
                  text: `Analyze this plant image carefully.

Language: ${language}

Provide the result using this format:

Plant:
Disease / Condition:
Confidence:
Symptoms:
Possible Cause:
Treatment:
Prevention:
Farmer Advice:

If the image is not a plant, say:
"Not a plant image"`
                },

                {
                  type: "image_url",

                  image_url: {
                    url: base64Image
                  }
                }
              ]
            }
          ],

          temperature: 0.2,

          max_tokens: 300
        })
      }
    );

    const data = await response.json();

    console.log("🌿 PLANT AI RESPONSE:", data);

    if (!response.ok) {
      console.error("❌ OpenRouter HTTP Error:", data);

      return `❌ Image analysis failed: ${
        data?.error?.message || `HTTP ${response.status}`
      }`;
    }

    if (data?.error) {
      console.error("❌ OpenRouter API Error:", data.error);

      return `❌ Image analysis failed: ${
        data.error.message || "OpenRouter returned an error"
      }`;
    }

    const choice = data?.choices?.[0];
    const message = choice?.message;

    let result = message?.content;

    if (Array.isArray(result)) {
      result = result
        .filter(item => item.type === "text" && item.text)
        .map(item => item.text)
        .join("\n");
    }

    if (typeof result === "string" && result.trim()) {
      return result.trim();
    }

    console.error("❌ No AI response:", data);
    console.error("Finish reason:", choice?.finish_reason);

    if (choice?.finish_reason === "length") {
      return "⚠️ AI response was cut short. Please try again.";
    }

    return "⚠️ AI returned an empty response. Please try again.";

  } catch (error) {
    console.error("❌ Plant image analysis error:", error);

    return `❌ Plant analysis failed: ${
      error?.message || "Unknown error"
    }`;
  }
}
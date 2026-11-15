export async function analyzePlantImage(base64Image, language = "english") {
  try {
    if (!base64Image) {
      throw new Error("No image was provided");
    }

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("Gemini API key is missing");
    }

    // Extract image data and MIME type
    const imageParts = base64Image.match(/^data:(image\/[^;]+);base64,(.+)$/);

    if (!imageParts) {
      throw new Error("Invalid image format");
    }

    const mimeType = imageParts[1];
    const imageData = imageParts[2];

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
                  text: `You are AgriVision AI, an agricultural plant disease detection assistant.

Analyze ONLY plant or plant-leaf images.

If the uploaded image is not a plant, clearly say "Not a plant image".

Identify the likely disease or condition, cause, symptoms, and practical treatment or prevention steps.

Do not diagnose humans or animals.

Give the answer in simple language suitable for farmers.

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
"Not a plant image".`
                },
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: imageData
                  }
                }
              ]
            }
          ],

          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1200
          }
        })
      }
    );

    const data = await response.json();

    console.log("🌿 GEMINI AI RESPONSE:", data);

    if (!response.ok) {
      console.error("❌ Gemini API Error:", data);

      return `❌ Image analysis failed: ${
        data?.error?.message || `HTTP ${response.status}`
      }`;
    }

    const result = data?.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "")
      .join("\n")
      .trim();

    if (!result) {
      console.error("❌ No Gemini response:", data);

      return "⚠️ No analysis was returned by Gemini. Please try again.";
    }

    return result;

  } catch (error) {
    console.error("❌ Plant image analysis error:", error);

    return `❌ Plant analysis failed: ${
      error?.message || "Unknown error"
    }`;
  }
}
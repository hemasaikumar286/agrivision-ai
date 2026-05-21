export async function getAIResponse(message, language = "english") {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_OPENAI_API_KEY`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are an expert farming assistant. Respond in the user's language."
          },
          {
            role: "user",
            content: message + " (Language: " + language + ")"
          }
        ]
      })
    });

    const data = await response.json();

    return data?.choices?.[0]?.message?.content || "No response from AI";
  } catch (error) {
    return "AI error. Please try again.";
  }
}
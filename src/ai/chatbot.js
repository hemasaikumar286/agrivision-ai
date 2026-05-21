export async function getAIResponse(message, language = "english") {
  // 🔴 Placeholder AI (safe version)
  // Later we can connect OpenAI / Gemini API here

  const responses = {
    english: "I am your farming assistant. Ask me about crops, soil, or weather.",
    hindi: "मैं आपका कृषि सहायक हूँ। मुझसे फसल, मिट्टी या मौसम के बारे में पूछें।",
    telugu: "నేను మీ వ్యవసాయ సహాయకుడు. పంటలు, మట్టి లేదా వాతావరణం గురించి అడగండి.",
    tamil: "நான் உங்கள் விவசாய உதவியாளர். பயிர்கள், மண் அல்லது வானிலை பற்றி கேளுங்கள்."
  };

  const lower = message.toLowerCase();

  if (lower.includes("weather")) {
    return language === "hindi"
      ? "मौसम अभी खेती के लिए उपयुक्त है।"
      : language === "telugu"
      ? "వాతావరణం వ్యవసాయానికి అనుకూలంగా ఉంది."
      : language === "tamil"
      ? "வானிலை விவசாயத்திற்கு ஏற்றது."
      : "Weather is good for farming right now.";
  }

  if (lower.includes("soil")) {
    return language === "hindi"
      ? "मिट्टी की गुणवत्ता मध्यम है, सुधार की जरूरत है।"
      : "Soil quality is moderate, improvement needed.";
  }

  return responses[language] || responses.english;
}
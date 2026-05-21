export function getFarmingAdvice(message, language = "english") {
  const text = message.toLowerCase();

  // 🌧 Weather-based advice
  if (text.includes("rain")) {
    return language === "hindi"
      ? "बारिश के कारण फसल की देखभाल करें और जल निकासी सुनिश्चित करें।"
      : "Due to rain, ensure proper drainage and protect crops.";
  }

  // 🌱 Soil advice
  if (text.includes("soil")) {
    return language === "hindi"
      ? "मिट्टी की उर्वरता बढ़ाने के लिए जैविक खाद का उपयोग करें।"
      : "Use organic fertilizer to improve soil fertility.";
  }

  // 🌾 Crop advice
  if (text.includes("crop")) {
    return language === "hindi"
      ? "इस मौसम में धान और मक्का अच्छे विकल्प हैं।"
      : "Rice and maize are good crops for this season.";
  }

  return null;
}
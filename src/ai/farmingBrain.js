export function farmingBrain(message, language = "english") {
  const text = message.toLowerCase();

  // 🌧 weather farming logic
  if (text.includes("rain")) {
    return language === "hindi"
      ? "बारिश के दौरान जल निकासी का ध्यान रखें और फसल सुरक्षित रखें।"
      : "During rain, ensure drainage and protect crops.";
  }

  // 🌱 soil logic
  if (text.includes("soil")) {
    return language === "hindi"
      ? "जैविक खाद मिट्टी की गुणवत्ता सुधारती है।"
      : "Organic compost improves soil quality.";
  }

  // 🌾 crop logic
  if (text.includes("crop")) {
    return language === "hindi"
      ? "धान और मक्का इस मौसम के लिए अच्छे हैं।"
      : "Rice and maize are good crops for this season.";
  }

  return null;
}
export function detectPlantDisease(description, language = "english") {
  const text = description.toLowerCase();

  if (text.includes("yellow")) {
    return language === "hindi"
      ? "पौधे में पोषक तत्वों की कमी हो सकती है (नाइट्रोजन की कमी)।"
      : "Plant may have nutrient deficiency (nitrogen deficiency).";
  }

  if (text.includes("spots")) {
    return language === "hindi"
      ? "पत्तों पर धब्बे फंगल संक्रमण का संकेत हो सकते हैं।"
      : "Spots may indicate fungal infection.";
  }

  if (text.includes("dry")) {
    return language === "hindi"
      ? "पौधा सूखा तनाव या कम पानी का संकेत दे रहा है।"
      : "Plant shows signs of drought stress.";
  }

  return language === "hindi"
    ? "स्पष्ट समस्या नहीं मिली, पौधे की स्थिति सामान्य लगती है।"
    : "No clear disease detected. Plant appears normal.";
}
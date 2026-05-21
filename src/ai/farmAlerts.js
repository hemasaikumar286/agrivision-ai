export function getFarmAlerts(message, language = "english") {
  const text = message.toLowerCase();

  // 🌧 Heavy rain risk
  if (text.includes("heavy rain") || text.includes("storm")) {
    return language === "hindi"
      ? "⚠ भारी बारिश का अलर्ट: फसल की सुरक्षा करें और जल निकासी सुनिश्चित करें।"
      : "⚠ Heavy rain alert: Protect crops and ensure drainage.";
  }

  // 🌡 Heatwave risk
  if (text.includes("heat") || text.includes("hot")) {
    return language === "hindi"
      ? "🔥 गर्मी का अलर्ट: सिंचाई बढ़ाएँ और फसल को धूप से बचाएँ।"
      : "🔥 Heat alert: Increase irrigation and protect crops from sun.";
  }

  // 🐛 Pest risk
  if (text.includes("pest") || text.includes("insect")) {
    return language === "hindi"
      ? "🐛 कीट संक्रमण का खतरा: जैविक कीटनाशक का उपयोग करें।"
      : "🐛 Pest risk detected: Use organic pesticides.";
  }

  return null;
}
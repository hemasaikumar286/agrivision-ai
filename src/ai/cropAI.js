export function getCropRecommendation(season, soil, language = "english") {
  const s = season.toLowerCase();
  const soilType = soil.toLowerCase();

  // 🌾 Kharif season
  if (s.includes("kharif") || s.includes("rainy")) {
    return language === "hindi"
      ? "धान, मक्का और ज्वार इस मौसम के लिए अच्छे फसल हैं।"
      : "Rice, maize, and sorghum are good crops for this season.";
  }

  // 🌾 Rabi season
  if (s.includes("rabi") || s.includes("winter")) {
    return language === "hindi"
      ? "गेहूं, चना और सरसों उपयुक्त फसल हैं।"
      : "Wheat, chickpea, and mustard are suitable crops.";
  }

  // 🌱 Soil-based logic
  if (soilType.includes("black")) {
    return language === "hindi"
      ? "काली मिट्टी कपास और सोयाबीन के लिए अच्छी है।"
      : "Black soil is good for cotton and soybean.";
  }

  return language === "hindi"
    ? "मौसम और मिट्टी के अनुसार फसल चुनें।"
    : "Choose crops based on season and soil type.";
}
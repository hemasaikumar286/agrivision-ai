import { farmingBrain } from "./farmingBrain";
import { detectPlantDisease } from "./plantAI";
import { getWeatherAdvice } from "./weatherAI";
import { getFarmAlerts } from "./farmAlerts";
import { getAIResponse } from "./openRouter";

/**
 * 🧠 AGRIBRAIN AI - MASTER DECISION ENGINE
 * Routes all user queries to correct AI layer
 */
export async function agribrain(message, language = "english") {
  const text = message.toLowerCase();

  /*********************************
   * 🚨 1. FARM ALERT SYSTEM (HIGHEST PRIORITY)
   *********************************/
  const alert = getFarmAlerts(text, language);
  if (alert) return alert;

  /*********************************
   * 🌿 2. PLANT DISEASE INTELLIGENCE
   *********************************/
  const plant = detectPlantDisease(text, language);
  if (plant && (text.includes("plant") || text.includes("leaf") || text.includes("crop"))) {
    return plant;
  }

  /*********************************
   * 🌦 3. WEATHER INTELLIGENCE
   *********************************/
  if (text.includes("weather") || text.includes("rain") || text.includes("temperature")) {
    return await getWeatherAdvice("Pune", language);
  }

  /*********************************
   * 🌱 4. FARMING RULE ENGINE (OFFLINE FAST AI)
   *********************************/
  const farm = farmingBrain(text, language);
  if (farm) return farm;

  /*********************************
   * 🤖 5. FULL AI FALLBACK (OpenRouter LLM)
   *********************************/
  try {
    const aiReply = await getAIResponse(message, language);
    return aiReply;
  } catch (err) {
    return language === "hindi"
      ? "AI उपलब्ध नहीं है, कृपया बाद में प्रयास करें।"
      : "AI is currently unavailable. Please try again later.";
  }
}
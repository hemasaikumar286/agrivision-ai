export async function getWeatherAdvice(city = "Pune", language = "english") {
  try {
    // STEP 1: Get coordinates from city name
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );

    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      return language === "hindi"
        ? "❌ शहर नहीं मिला"
        : "❌ City not found";
    }

    const { latitude, longitude, name } = geoData.results[0];

    // STEP 2: Get weather
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    const weatherData = await weatherRes.json();

    const temp = weatherData.current_weather.temperature;
    const wind = weatherData.current_weather.windspeed;

    // STEP 3: Language output
    if (language === "hindi") {
      return `🌦 ${name} में तापमान ${temp}°C है और हवा ${wind} km/h है।`;
    }

    if (language === "tamil") {
      return `🌦 ${name} இல் வெப்பநிலை ${temp}°C, காற்று ${wind} km/h.`;
    }

    if (language === "telugu") {
      return `🌦 ${name} లో ఉష్ణోగ్రత ${temp}°C, గాలి వేగం ${wind} km/h.`;
    }

    return `🌦 In ${name}, temperature is ${temp}°C and wind speed is ${wind} km/h.`;

  } catch (err) {
    return "⚠ Weather service error";
  }
}
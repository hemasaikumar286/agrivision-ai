import { useState } from "react";
import { getWeatherAdvice } from "../ai";

export default function Weather({ goBack, language }) {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) {
      setResult(language === "hindi"
        ? "कृपया शहर का नाम दर्ज करें"
        : "Please enter a city name"
      );
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await getWeatherAdvice(city, language);
      setResult(response);
    } catch (err) {
      setResult(language === "hindi"
        ? "⚠ मौसम डेटा लोड नहीं हो सका"
        : "⚠ Failed to load weather data"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white p-6">

      {/* HEADER */}
      <button
        onClick={goBack}
        className="mb-4 bg-white text-black px-4 py-2 rounded"
      >
        ⬅ Back
      </button>

      <h1 className="text-3xl font-bold mb-6">
        🌦 Weather Intelligence
      </h1>

      {/* INPUT */}
      <div className="flex gap-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city (e.g. Pune)"
          className="p-2 rounded text-black w-full"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="mt-4 text-yellow-300">
          Loading weather...
        </p>
      )}

      {/* RESULT */}
      {result && (
        <div className="mt-6 p-4 bg-white/10 rounded">
          {result}
        </div>
      )}

    </div>
  );
}
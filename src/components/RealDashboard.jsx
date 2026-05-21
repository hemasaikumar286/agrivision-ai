import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../App";
import { getDashboardInsights } from "../ai/dashboardAI";

export default function RealDashboard({ goBack }) {
  const { language, t } = useContext(LanguageContext);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const insights = getDashboardInsights(language);

    // simulate real API delay (feels like real dashboard)
    setTimeout(() => {
      setData(insights);
      setLoading(false);
    }, 800);
  }, [language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900 to-green-600 text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          🌾 Smart Farm Intelligence Dashboard
        </h1>

        <button
          onClick={goBack}
          className="bg-white text-black px-4 py-2 rounded-xl font-bold"
        >
          ⬅ Back
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center text-xl mt-20 animate-pulse">
          Loading farm intelligence...
        </div>
      )}

      {/* DASHBOARD CARDS */}
      {!loading && data && (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* WEATHER RISK */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-blue-400 shadow-xl">
            <h2 className="text-xl font-bold mb-2">🌦 Weather Risk</h2>
            <p className="text-lg">
              {data.weatherRisk === "low"
                ? "Low Risk ✅"
                : data.weatherRisk}
            </p>
          </div>

          {/* SOIL HEALTH */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-yellow-400 shadow-xl">
            <h2 className="text-xl font-bold mb-2">🌱 Soil Health</h2>
            <p className="text-lg capitalize">
              {data.soilHealth}
            </p>
          </div>

          {/* CROP STATUS */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-green-400 shadow-xl">
            <h2 className="text-xl font-bold mb-2">🌾 Crop Status</h2>
            <p className="text-lg capitalize">
              {data.cropStatus}
            </p>
          </div>

          {/* PEST RISK */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-red-400 shadow-xl">
            <h2 className="text-xl font-bold mb-2">🐛 Pest Risk</h2>
            <p className="text-lg capitalize">
              {data.pestRisk}
            </p>
          </div>

        </div>
      )}

      {/* INFO SECTION */}
      {!loading && (
        <div className="mt-10 text-center text-gray-200">
          AI-powered insights based on farming intelligence system
        </div>
      )}
    </div>
  );
}
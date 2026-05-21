import { useState, useEffect, createContext } from "react";

import Login from "./components/Login";
import PlantDisease from "./components/PlantDisease";
import Weather from "./components/Weather";
import SoilHealth from "./components/SoilHealth";
import ChatBot from "./components/ChatBot";
import RealDashboard from "./components/RealDashboard";
import CameraScan from "./components/CameraScan";

import { translations } from "./ai/translations";

export const LanguageContext = createContext();

export default function App() {
  const [page, setPage] = useState("home");
  const [language, setLanguage] = useState("english");
  const [user, setUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const languages = ["english", "hindi", "telugu", "tamil"];

  // 🌍 Load saved language
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLanguage(savedLang);
  }, []);

  // 🌍 Save language
  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  // 👤 Load saved user login
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
      setLoggedIn(true);
    }
  }, []);

  // 🔐 Login
  const enterApp = (username) => {
    if (username.trim()) {
      setUser(username);
      setLoggedIn(true);
      localStorage.setItem("user", username);
    }
  };

  // 🚪 Logout
  const logout = () => {
    setUser("");
    setLoggedIn(false);
    localStorage.removeItem("user");
  };

  const goBack = () => setPage("home");

  if (!loggedIn) {
    return <Login enterApp={enterApp} />;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>

      {/* 🌿 MODULE ROUTING */}
      {page === "plant" && (
        <PlantDisease goBack={goBack} language={language} />
      )}

      {page === "weather" && (
        <Weather goBack={goBack} language={language} />
      )}

      {page === "soil" && (
        <SoilHealth goBack={goBack} language={language} />
      )}

      {page === "chat" && (
        <ChatBot goBack={goBack} language={language} />
      )}

      {page === "dashboard" && (
        <RealDashboard goBack={goBack} language={language} />
      )}

      {page === "camera" && (
        <CameraScan goBack={goBack} language={language} />
      )}

      {/* 🏠 HOME PAGE */}
      {page === "home" && (
        <div className="min-h-screen bg-gradient-to-br from-black via-green-900 to-green-600 text-white px-4 py-6">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold">
              🌾 AgriVision AI
            </h1>

            <p className="text-gray-200 mt-2 text-sm sm:text-lg">
              {translations[language]?.subtitle || "Smart Farming AI System"}
            </p>

            <p className="mt-2 text-green-200">
              {translations[language]?.welcome || "Welcome"}, {user} 👋
            </p>
          </div>

          {/* LANGUAGE SELECTOR */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-6">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-semibold transition ${
                  language === lang
                    ? "bg-green-400 text-black"
                    : "bg-white/20 hover:bg-white/30"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>

          {/* MODULE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            <Card title={`🌿 ${translations[language]?.plant}`} onClick={() => setPage("plant")} />
            <Card title={`🌦 ${translations[language]?.weather}`} onClick={() => setPage("weather")} />
            <Card title={`🌱 ${translations[language]?.soil}`} onClick={() => setPage("soil")} />
            <Card title={`🤖 ${translations[language]?.chat}`} onClick={() => setPage("chat")} />
            <Card title={`📊 ${translations[language]?.dashboard}`} onClick={() => setPage("dashboard")} />
            <Card title={`📷 ${translations[language]?.camera}`} onClick={() => setPage("camera")} />

          </div>

          {/* FOOTER + LOGOUT */}
          <div className="text-center mt-10 text-gray-300 text-sm">

            <p>Built for Smart Agriculture 🌾</p>

            <button
              onClick={logout}
              className="mt-4 bg-red-500 px-4 py-2 rounded-xl text-white"
            >
              Logout
            </button>

          </div>

        </div>
      )}
    </LanguageContext.Provider>
  );
}

/* 🎴 CARD COMPONENT */
function Card({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-6 rounded-2xl backdrop-blur-lg bg-gradient-to-br from-green-500/20 to-black/30 border border-white/10 hover:scale-105 transition"
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-sm text-gray-300 mt-2">
        Tap to open module
      </p>
    </div>
  );
}
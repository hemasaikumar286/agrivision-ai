import { useState, useContext } from "react";
import { LanguageContext } from "../App";
import { agribrain } from "../ai/agribrain";

export default function ChatBot({ goBack }) {
  const { language, t } = useContext(LanguageContext);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;

    // add user message
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMsg }
    ]);

    setInput("");

    // get AI response from Agribrain
    const reply = await agribrain(userMsg, language);

    // add AI message
    setMessages((prev) => [
      ...prev,
      { role: "ai", text: reply }
    ]);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      
      {/* HEADER */}
      <button
        onClick={goBack}
        className="bg-gray-700 px-4 py-2 rounded mb-4"
      >
        ⬅ Back
      </button>

      <h1 className="text-3xl font-bold mb-4">
        🤖 AI Farmer Chatbot
      </h1>

      {/* CHAT BOX */}
      <div className="bg-white/10 p-4 rounded h-[400px] overflow-y-auto mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-3 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-3 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-green-500 text-black"
                  : "bg-blue-500 text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT AREA */}
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about crops, soil, weather..."
          className="flex-1 p-3 rounded text-black"
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 px-6 py-2 rounded font-bold"
        >
          Send
        </button>
      </div>
    </div>
  );
}
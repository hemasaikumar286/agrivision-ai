import { useState, useContext } from "react";
import { LanguageContext } from "../App";
import { analyzePlantImage } from "../ai/plantVisionAI";

export default function PlantDisease({ goBack }) {
  const { language } = useContext(LanguageContext);

  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 📸 Convert image to base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  // 🤖 AI Analysis
  const analyze = async () => {
    if (!image) return;

    setLoading(true);
    setResult("");

    try {
      const res = await analyzePlantImage(image, language);
      setResult(res);
    } catch (err) {
      setResult("Analysis failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-green-950 text-white p-6">
      
      {/* HEADER */}
      <button
        onClick={goBack}
        className="bg-white text-black px-4 py-2 rounded mb-6"
      >
        ⬅ Back
      </button>

      <h1 className="text-3xl font-bold mb-4">
        🌿 Plant Disease Detection AI
      </h1>

      <p className="mb-6 text-gray-300">
        Upload a plant leaf image and get AI-powered disease detection.
      </p>

      {/* UPLOAD */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />

      {/* PREVIEW */}
      {image && (
        <div className="mb-4">
          <img
            src={image}
            alt="Plant"
            className="w-64 h-64 object-cover rounded-lg border"
          />
        </div>
      )}

      {/* BUTTON */}
      <button
        onClick={analyze}
        disabled={loading}
        className="bg-green-400 text-black px-6 py-2 rounded font-bold"
      >
        {loading ? "Analyzing..." : "🌿 Analyze Plant"}
      </button>

      {/* RESULT */}
      {result && (
        <div className="mt-6 p-4 bg-black/40 rounded-lg border border-green-400">
          <h2 className="font-bold mb-2">AI Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
import { useState, useContext } from "react";
import { LanguageContext } from "../App";
import { analyzePlantImage } from "../ai/plantVisionAI";

export default function PlantDisease({ goBack }) {
  const { language } = useContext(LanguageContext);

  const [image, setImage] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 📸 Convert image properly
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result); // data:image/...base64
    };

    reader.readAsDataURL(file);
  };

  // 🌿 Analyze plant image
  const analyze = async () => {
    if (!image) {
      setResult("⚠ Please upload a plant image first");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await analyzePlantImage(image, language);

      setResult(res || "⚠ No analysis received");
    } catch (err) {
      setResult("❌ Error analyzing plant image");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-green-950 text-white p-5">
      
      {/* HEADER */}
      <button
        onClick={goBack}
        className="mb-4 bg-white text-black px-4 py-2 rounded"
      >
        ⬅ Back
      </button>

      <h1 className="text-3xl font-bold mb-4">
        🌿 Plant Disease Detection AI
      </h1>

      <p className="text-gray-300 mb-6">
        Upload a plant leaf image to detect disease, cause, and solution.
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
        <img
          src={image}
          alt="plant"
          className="w-64 h-64 object-cover rounded-xl border mb-4"
        />
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
        <div className="mt-6 bg-black/40 p-4 rounded-xl border border-green-400">
          <h2 className="font-bold mb-2">Result:</h2>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";

function SoilHealth({ goBack }) {

  const [nitrogen, setNitrogen] = useState("");

  const [ph, setPh] = useState("");

  const [result, setResult] = useState("");

  const analyzeSoil = () => {

    if (nitrogen < 40) {

      setResult(
        "Low nitrogen detected. Add organic compost or urea fertilizer."
      );

    }

    else if (ph < 5.5) {

      setResult(
        "Soil is acidic. Add lime treatment for balance."
      );

    }

    else {

      setResult(
        "Soil health appears good for crop cultivation."
      );
    }
  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <button
        onClick={goBack}
        className="mb-8 bg-green-400 text-black px-6 py-3 rounded-xl font-bold"
      >
        ← Back
      </button>

      <h1 className="text-5xl font-bold text-yellow-300 mb-10">
        Soil Health Analyzer
      </h1>

      <div className="bg-white/10 p-8 rounded-3xl border border-yellow-400 max-w-3xl">

        <div className="mb-6">

          <label className="text-2xl">
            Nitrogen Level
          </label>

          <input
            type="number"
            value={nitrogen}
            onChange={(e) =>
              setNitrogen(e.target.value)
            }
            className="w-full mt-3 p-4 rounded-xl text-black"
          />

        </div>

        <div className="mb-6">

          <label className="text-2xl">
            Soil pH
          </label>

          <input
            type="number"
            step="0.1"
            value={ph}
            onChange={(e) =>
              setPh(e.target.value)
            }
            className="w-full mt-3 p-4 rounded-xl text-black"
          />

        </div>

        <button
          onClick={analyzeSoil}
          className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
        >
          Analyze Soil
        </button>

        {result && (

          <div className="mt-8 bg-yellow-500/20 p-6 rounded-2xl">

            <h2 className="text-3xl font-bold mb-4">
              AI Soil Report
            </h2>

            <p className="text-xl leading-8">
              {result}
            </p>

          </div>

        )}

      </div>

    </div>
  );
}

export default SoilHealth;
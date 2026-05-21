import { useState } from "react";

function Login({ enterApp }) {

  const [name, setName] = useState("");

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-green-900 to-green-500 flex justify-center items-center p-8">

      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl border border-green-400 w-full max-w-xl">

        <h1 className="text-5xl font-bold text-white mb-8 text-center">
          AgriVision AI
        </h1>

        <p className="text-center text-gray-200 mb-8 text-xl">
          Smart Agriculture Intelligence Platform
        </p>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 rounded-xl text-black text-xl mb-6 outline-none"
        />

        <button
          onClick={() => enterApp(name)}
          className="w-full bg-green-400 text-black py-4 rounded-xl text-2xl font-bold hover:bg-green-300"
        >
          Enter App
        </button>

      </div>

    </div>
  );
}

export default Login;
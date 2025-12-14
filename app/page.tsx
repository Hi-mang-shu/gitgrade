"use client";

import { useState } from "react";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const analyzeRepo = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repoUrl }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-6">
  <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center">
          GitGrade
        </h1>
        <p className="text-center text-gray-600 mb-6">
          AI-assisted GitHub Repository Evaluation
        </p>
        
        <p className="text-sm text-gray-500 mb-2">
          Paste any public GitHub repository URL to get an instant evaluation
        </p>
        <input
          type="text"
          placeholder="https://github.com/username/repository"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <button
          onClick={analyzeRepo}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
        >
          {loading ? "Analyzing repository..." : "Analyze Repository"}
        </button>

{result && (
  <div className="mt-8 space-y-6">
    <div className="bg-gray-50 p-6 rounded-xl text-center">
    <p
      className={`text-5xl font-bold ${
        result.score >= 75
          ? "text-green-600"
          : result.score >= 50
          ? "text-yellow-500"
          : "text-red-500"
      }`}
    >
      {result.score} / 100
    </p>
    <p className="text-gray-600 mt-1">Overall Repository Score</p>
  </div>

    <div className="bg-gray-50 p-5 rounded-xl">
      <h2 className="font-semibold mb-1">Summary</h2>
      <p className="text-sm text-gray-700">{result.summary}</p>
    </div>

    <div className="bg-gray-50 p-5 rounded-xl">
      <h2 className="font-semibold mb-2">Personalized Roadmap</h2>
      <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
        {result.roadmap.map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
)}

      </div>
    </main>
  );
}

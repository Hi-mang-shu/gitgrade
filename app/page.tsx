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
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">
          GitGrade – Repository Analyzer
        </h1>

        <input
          type="text"
          placeholder="Paste GitHub Repository URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={analyzeRepo}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Analyzing..." : "Analyze Repository"}
        </button>

{result && (
  <div className="mt-6 space-y-4">
    <div className="text-center">
      <p
        className={`text-4xl font-bold ${
          result.score >= 75
            ? "text-green-600"
            : result.score >= 50
            ? "text-yellow-500"
            : "text-red-500"
        }`}
      >
        {result.score} / 100
      </p>

      <p className="text-gray-600">GitGrade Score</p>
    </div>

    <div>
      <h2 className="font-semibold">Summary</h2>
      <p className="text-sm text-gray-700">{result.summary}</p>
    </div>

    <div>
      <h2 className="font-semibold">Personalized Roadmap</h2>
      <ul className="list-disc list-inside text-sm text-gray-700">
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

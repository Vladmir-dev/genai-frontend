// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import QueryForm from "./components/QueryForm";
import ResponseDisplay from "./components/ResponseDisplay";
import Sidebar from "./components/Sidebar";
import { submitQuery } from "./lib/api";

export default function Home() {
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const storedHistory = localStorage.getItem("questionHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Update localStorage when history changes
  useEffect(() => {
    localStorage.setItem("questionHistory", JSON.stringify(history));
  }, [history]);

  const handleSubmit = (response: string, question: string) => {
    setResponse(response);
    setHistory((prev) => {
      const newHistory = [question, ...prev.filter((q) => q !== question)].slice(0, 10);
      return newHistory;
    });
  };

  const handleQuestionSelect = async (question: string) => {
    setLoading(true);
    setError(null);
    try {
      const { response } = await submitQuery(question);
      setResponse(response);
      setHistory((prev) => {
        const newHistory = [question, ...prev.filter((q) => q !== question)].slice(0, 10);
        return newHistory;
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center md:text-3xl">
          Travel Advisor AI
        </h1>
      </header>

      {/* Scrollable Content Area */}
      <main className="flex-1 overflow-y-auto p-4 pb-24 md:pb-28 flex justify-center">
        <div className="w-full max-w-lg space-y-4">
          <ResponseDisplay response={response} loading={loading} error={error} />
        </div>
      </main>

      {/* Fixed Form */}
      <QueryForm onSubmit={handleSubmit} setError={setError} setLoading={setLoading} />

      {/* Sidebar */}
      <Sidebar history={history} onQuestionSelect={handleQuestionSelect} />
    </div>
  );
}
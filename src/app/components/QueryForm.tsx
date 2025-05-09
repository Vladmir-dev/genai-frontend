"use client";

import { useState, FormEvent } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { submitQuery } from "../lib/api";

interface QueryFormProps {
  onSubmit: (response: string, question:string) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export default function QueryForm({ onSubmit, setError, setLoading }: QueryFormProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (question.trim().length < 5) {
      setError("Question must be at least 5 characters long");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { response } = await submitQuery(question);
      onSubmit(response, question);
      setQuestion("");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex gap-2 mx-auto max-w-4xl w-full md:p-6"
    >
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a travel question (e.g., What documents for Uganda to Germany?)"
        className="flex-1 p-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
      >
        <FaPaperPlane />
        Ask
      </button>
    </form>
  );
}
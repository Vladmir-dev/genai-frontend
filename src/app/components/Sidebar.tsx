// src/app/components/Sidebar.tsx
"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

interface SidebarProps {
  history: string[];
  onQuestionSelect: (question: string) => void;
}

export default function Sidebar({ history, onQuestionSelect }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Burger Menu */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 text-gray-800 hover:text-blue-500 focus:outline-none"
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 p-4 transition-transform duration-300 ease-in-out z-40`}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Question History</h2>
        {history.length === 0 ? (
          <p className="text-gray-600">No questions asked yet.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((question, index) => (
              <li
                key={index}
                onClick={() => {
                  onQuestionSelect(question);
                  toggleSidebar();
                }}
                className="p-2 rounded-lg hover:bg-blue-100 cursor-pointer text-gray-700 truncate"
              >
                {question}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0  z-30"
        ></div>
      )}
    </>
  );
}
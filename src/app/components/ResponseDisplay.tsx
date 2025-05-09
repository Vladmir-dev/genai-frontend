import { FaCheckCircle } from "react-icons/fa";

interface ResponseDisplayProps {
  response: string | null;
  loading: boolean;
  error: string | null;
}


// Helper function to process response text
const processResponse = (text: string): string[] => {
  // Split response into lines
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  // Process each line
  return lines.map((line) => {
    // Remove bullet points (e.g., "- " or "* ")
    let processed = line.replace(/^[*-]\s*/, "").trim();

    // Replace *Text:* with bold Text
    processed = processed.replace(/\*([^*]+):\*/g, "<strong>$1</strong>");

    return processed;
  });
};


export default function ResponseDisplay({ response, loading, error }: ResponseDisplayProps) {
  if (loading) {
    return (
      <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow">
        <p className="text-gray-600 animate-pulse">Loading response...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-lg p-4 bg-red-100 text-red-700 rounded-lg shadow">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow">
        <p className="text-gray-600">Ask a question to get travel advice!</p>
      </div>
    );
  }

  const processedLines = processResponse(response);


  return (
    <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow">
      <div className="flex items-center gap-2 mb-2">
        <FaCheckCircle className="text-green-500" />
        <h2 className="text-lg font-semibold text-gray-800">Travel Advice</h2>
      </div>
      <div className="text-gray-700 space-y-2">
        {processedLines.map((line, index) => {
          // Detect headings (lines starting with **)
          const isHeading = line.startsWith("**");
          return (
            <p
              key={index}
              className={isHeading ? "text-lg font-semibold text-gray-800" : "text-base"}
              dangerouslySetInnerHTML={{ __html: line }}
            />
          );
        })}
      </div>
    </div>
  );
}
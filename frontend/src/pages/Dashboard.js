import React, { useState } from 'react';

const Dashboard = () => {
  const [prompt, setPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!prompt) return;
    setLoading(true);
    // Simulate AI summarization API call
    setTimeout(() => {
      setSummary("Summary for: \"" + prompt + "\"\n\n- Slide 1: Introduction\n- Slide 2: Main Points\n- Slide 3: Conclusion");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Brain.AI Dashboard</h1>
      <div className="max-w-4xl mx-auto bg-white bg-opacity-20 rounded-lg p-6 shadow-lg">
        <label className="block mb-2 font-semibold">Enter 1-line prompt or text to summarize:</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={4}
          className="w-full p-3 rounded text-black"
          placeholder="Type your prompt here..."
        />
        <button
          onClick={handleSummarize}
          disabled={loading}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Summarizing...' : 'Summarize to PPT'}
        </button>
        {summary && (
          <div className="mt-6 bg-white p-4 rounded text-black whitespace-pre-line">
            <h2 className="text-2xl font-semibold mb-2">Summary Preview:</h2>
            <pre>{summary}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

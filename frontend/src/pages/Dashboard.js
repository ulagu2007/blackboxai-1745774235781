import React, { useState } from 'react';

const templates = [
  { id: 1, name: 'Classic', description: 'Simple and clean slides' },
  { id: 2, name: 'Modern', description: 'Sleek and stylish design' },
  { id: 3, name: 'Creative', description: 'Colorful and dynamic layouts' },
];

const Dashboard = () => {
  const [prompt, setPrompt] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [numSlides, setNumSlides] = useState(3);
  const [slideOrientation, setSlideOrientation] = useState('landscape');
  const [showGaps, setShowGaps] = useState(true);

  const handleSummarize = async () => {
    if (!prompt) return;
    setLoading(true);
    // Simulate AI summarization API call
    setTimeout(() => {
      setSummary(
        `Summary for: "${prompt}"\n\n` +
        `Template: ${templates.find(t => t.id === selectedTemplate).name}\n` +
        `Slides: ${numSlides}, Orientation: ${slideOrientation}, Gaps: ${showGaps ? 'Yes' : 'No'}\n\n` +
        Array.from({ length: numSlides }, (_, i) => `- Slide ${i + 1}: Content here`).join('\n')
      );
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6 text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Brain.AI Dashboard</h1>
      <div className="max-w-4xl mx-auto bg-white bg-opacity-20 rounded-lg p-6 shadow-lg space-y-6">
        <div>
          <label className="block mb-2 font-semibold text-black">Enter 1-line prompt or text to summarize:</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="w-full p-3 rounded text-black"
            placeholder="Type your prompt here..."
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-black">Select PPT Template:</label>
          <select
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(parseInt(e.target.value))}
            className="w-full p-2 rounded text-black"
          >
            {templates.map(template => (
              <option key={template.id} value={template.id}>
                {template.name} - {template.description}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4 text-black">
          <div>
            <label className="block mb-2 font-semibold">Number of Slides:</label>
            <input
              type="number"
              min={1}
              max={20}
              value={numSlides}
              onChange={(e) => setNumSlides(parseInt(e.target.value))}
              className="w-20 p-2 rounded text-black"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Slide Orientation:</label>
            <select
              value={slideOrientation}
              onChange={(e) => setSlideOrientation(e.target.value)}
              className="p-2 rounded text-black"
            >
              <option value="landscape">Landscape</option>
              <option value="portrait">Portrait</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showGaps}
              onChange={() => setShowGaps(!showGaps)}
              id="showGaps"
            />
            <label htmlFor="showGaps" className="font-semibold">Show Gaps Between Slides</label>
          </div>
        </div>

        <button
          onClick={handleSummarize}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Summarizing...' : 'Summarize to PPT'}
        </button>

        {summary && (
          <div className="bg-white p-4 rounded text-black whitespace-pre-line">
            <h2 className="text-2xl font-semibold mb-2">Summary Preview:</h2>
            <pre>{summary}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrainLogo from '../components/BrainLogo';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!identifier) {
      setError('Please enter your email or phone number');
      return;
    }
    // Simulate login success
    // In real app, call backend API for authentication
    localStorage.setItem('brainai_user', identifier);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <BrainLogo size={96} />
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700 flex items-center justify-center space-x-2">
          <span>Brain.AI Login</span>
        </h2>
        <form onSubmit={handleLogin}>
          <label className="block mb-2 font-semibold text-gray-700">Email or Phone Number</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email or phone number"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

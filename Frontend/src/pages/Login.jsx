import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Squares from '../UI/Squares';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (form) => {
      const { data } = await axios.post(`${import.meta.env.VITE_API_DEV_URL}/api/auth/login`, form);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      setSuccess('Login successful!');
      navigate('/feed');
    },
    onError: (err) => {
      setError(err.response?.data?.error || err.message || 'Login failed');
    },
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    loginMutation.mutate(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Squares */}
      <div className="absolute inset-0 z-10 opacity-15">
        <Squares
          speed={0.5}
          squareSize={40}
          direction="down"
        />
      </div>
      {/* Login Form */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              placeholder="chef@dishly.kitchen"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              placeholder="Your secret ingredient"
            />
          </div>
          <button
            type="submit"
            disabled={loginMutation.isLoading}
            className="w-full py-3 rounded-xl bg-sunset hover:bg-sand text-white font-semibold shadow transition disabled:opacity-50"
          >
            {loginMutation.isLoading ? 'Logging in...' : 'Login'}
          </button>
          {error && <div className="text-red-600 text-center text-sm">{error}</div>}
          {success && <div className="text-green-600 text-center text-sm">{success}</div>}
        </form>
        <div className="text-center text-sm text-gray-500 mt-6">
          New to Dishly?{' '}
          <a href="/register" className="text-sand hover:underline font-medium">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}
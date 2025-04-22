import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '', bio: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const registerMutation = useMutation({
    mutationFn: async ({ form, profileImage }) => {
      const formData = new FormData();
      formData.append('username', form.username);
      formData.append('email', form.email);
      formData.append('password', form.password);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
      const { data } = await axios.post('http://localhost:5000/api/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      setSuccess('Registration successful!');
    },
    onError: (err) => {
      setError(err.response?.data?.error || err.message || 'Registration failed');
    },
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    registerMutation.mutate({ form, profileImage });
  };

  return (
    <div className="min-h-screen flex dark:bg-black">
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <video
          src="/SignUp.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover p-4 border border-black border-opacity-10 dark:border-opacity-20 dark:border-white rounded-2xl opacity-90 dark:opacity-70"
        />
      </div>
      <div className="container mx-auto px-4 flex items-center justify-center w-full lg:w-1/2">
        <div className="max-w-xl w-full bg-white dark:bg-black p-8 rounded-lg shadow-lg border border-white border-opacity-10">
          <a href="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-6 inline-block">
            ← Home
          </a>
          <div className="flex items-center gap-3 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Join Our Kitchen</h1>
            <span className="text-3xl">🧑‍🍳</span>
          </div>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-6 text-sm">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5">
                Chef Name/Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="What should we call you?"
                required
                minLength={4}
                maxLength={20}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="chef@dishly.kitchen"
                required
              />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5">
                Bio (Optional)
              </label>
              <textarea
                id="bio"
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Tell us about yourself..."
                maxLength={500}
                rows={3}
              />
              <p className="text-xs text-gray-500 mt-1">
                {form.bio.length}/500 characters
              </p>
            </div>
            <div>
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5">
                Profile Picture
              </label>
              <div className="space-y-2">
                {profileImage && (
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Profile preview"
                      className="rounded-full object-cover w-24 h-24"
                    />
                  </div>
                )}
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  accept="image/*"
                  required
                />
                <p className="text-xs text-gray-500">
                  Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
                </p>
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5">
                Secret Ingredient/Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Create your secret recipe"
                required
                minLength={8}
                maxLength={50}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 dark:text-white mb-1.5">
                Confirm Secret Ingredient
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Confirm your secret recipe"
                required
                minLength={8}
                maxLength={50}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {registerMutation.isLoading ? 'Creating Account...' : 'Start Cooking'}
            </button>
            <p className="text-center text-sm text-gray-500">
              Already a chef?{' '}
              <a href="/login" className="text-blue-600 hover:underline font-medium">
                Return to Kitchen
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
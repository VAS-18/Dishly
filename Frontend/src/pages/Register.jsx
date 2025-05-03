import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Squares from "../UI/Squares";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const registerMutation = useMutation({
    mutationFn: async ({ form, profileImage }) => {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("email", form.email);
      formData.append("password", form.password);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return data;
    },
    onSuccess: () => {
      setSuccess("Registration successful!");
    },
    onError: (err) => {
      setError(
        err.response?.data?.error || err.message || "Registration failed"
      );
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
    setError("");
    setSuccess("");
    registerMutation.mutate({ form, profileImage });
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Squares */}
      <div className="absolute inset-0 z-10 opacity-15">
        <Squares speed={0.5} squareSize={40} direction="up" />
      </div>
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-10 border border-gray-100 z-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Join Dishly
        </h1>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm text-center">
            {success}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Chef Name/Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              placeholder="What should we call you?"
              required
              minLength={4}
              maxLength={20}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              placeholder="chef@dishly.kitchen"
              required
            />
          </div>
          <div>
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Bio (Optional)
            </label>
            <textarea
              id="bio"
              name="bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              placeholder="Tell us about yourself..."
              maxLength={500}
              rows={3}
            />
            <p className="text-xs text-gray-400 mt-1">
              {form.bio.length}/500 characters
            </p>
          </div>
          <div>
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Profile Picture
            </label>
            <div className="space-y-2">
              {profileImage && (
                <div className="relative w-20 h-20 mx-auto mb-2">
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile preview"
                    className="rounded-full object-cover w-20 h-20 border-4 border-indigo-200"
                  />
                </div>
              )}
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                onChange={handleFileChange}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                accept="image/*"
                required
              />
              <p className="text-xs text-gray-400">
                Max size: 5MB. JPG, PNG, GIF supported.
              </p>
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              placeholder="Create your secret recipe"
              required
              minLength={8}
              maxLength={50}
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
              placeholder="Confirm your secret recipe"
              required
              minLength={8}
              maxLength={50}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sunset hover:bg-sand text-white font-bold py-3 rounded-xl shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {registerMutation.isLoading
              ? "Creating Account..."
              : "Start Cooking"}
          </button>
          <p className="text-center text-sm text-gray-500">
            Already a chef?{" "}
            <a
              href="/login"
              className="text-orange-500 hover:underline font-medium"
            >
              Return to Kitchen
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

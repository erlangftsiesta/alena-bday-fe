"use client";

import { useState } from "react";
import {
  Heart,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Star,
  User,
  Home,
} from "lucide-react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom"; // Add this import

export default function LoginMobile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, login, clearError, isAuthenticated, user } =
    useAuth(); // Add isAuthenticated and user
  const navigate = useNavigate(); // Add this

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login({ username, password });
    if (success) {
      // Redirect to home or dashboard
      console.log("Login successful! 💕");
    }
  };

  const handleUserIconClick = () => {
    if (isAuthenticated) {
      navigate("/homepage"); // Navigate to homepage if authenticated
    } else {
      // Already on login page, maybe scroll to top or do nothing
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-pink-200 p-4 relative overflow-hidden">
      {/* User Icon - Top Right */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={handleUserIconClick}
          className="bg-white/90 backdrop-blur-sm text-pink-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border-2 border-pink-200"
          title={
            isAuthenticated
              ? `Go to Homepage (${user?.name || "User"})`
              : "Login"
          }
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          ) : isAuthenticated ? (
            <Home className="w-6 h-6 text-pink-600" />
          ) : (
            <User className="w-6 h-6 text-pink-600" />
          )}
        </button>

        {/* User Info Tooltip - Show when authenticated */}
        {isAuthenticated && user && (
          <div className="absolute top-14 right-0 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-pink-200 min-w-[120px] animate-fade-in">
            <p className="text-pink-800 font-semibold text-sm truncate">
              Hi, {user.name}! 👋
            </p>
            <p className="text-pink-600 text-xs">Tap to go home</p>
          </div>
        )}
      </div>
      {/* Decorative Elements */}
      <div className="absolute top-10 left-6 text-pink-300 animate-pulse">
        <Heart className="w-6 h-6" />
      </div>
      <div className="absolute top-20 right-8 text-pink-400 animate-bounce">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="absolute bottom-32 left-4 text-pink-300 animate-pulse">
        <Star className="w-4 h-4" />
      </div>
      <div className="absolute bottom-20 right-6 text-pink-400 animate-bounce">
        <Heart className="w-5 h-5" />
      </div>

      <div className="flex flex-col justify-center min-h-screen py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
          </div>
          <p className="text-pink-600 text-lg font-medium">
            Happy Birthday my sweetie girl 💕
          </p>
          <p className="text-pink-500 text-sm mt-2">
            Sign in to your beautiful account ✨
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mx-4 border border-pink-100">
          {/* Error Message */}
          {error && (
            <div className="bg-pink-50 border-2 border-pink-200 text-pink-700 px-4 py-3 rounded-2xl mb-6 text-center">
              <p className="font-medium">{error}</p>
              <button
                onClick={clearError}
                className="text-pink-500 text-sm mt-1 underline"
              >
                Dismiss
              </button>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-pink-800 font-semibold mb-3 text-lg">
                Username 💌
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-pink-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-400 text-pink-800 placeholder-pink-400 text-lg transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-pink-800 font-semibold mb-3 text-lg">
                Password 🔐
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your secret password"
                  className="w-full pl-12 pr-12 py-4 border-2 border-pink-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-400 text-pink-800 placeholder-pink-400 text-lg transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            {/* <div className="text-right">
              <button
                type="button"
                className="text-pink-500 hover:text-pink-700 font-medium text-sm underline transition-colors"
              >
                Forgot your password? 🥺
              </button>
            </div> */}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:from-pink-500 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing you in... 💕
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Sign In with Love
                  <Heart className="w-5 h-5" />
                </div>
              )}
            </button>
          </form>

          {/* <div className="flex items-center my-8">
            <div className="flex-1 border-t border-pink-200"></div>
            <span className="px-4 text-pink-500 font-medium">or continue with</span>
            <div className="flex-1 border-t border-pink-200"></div>
          </div>
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white border-2 border-pink-200 text-pink-700 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-pink-50 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            Continue with Google ✨
          </button>

          <div className="text-center mt-8">
            <p className="text-pink-600">
              New here sweetie?{" "}
              <button className="text-pink-500 hover:text-pink-700 font-semibold underline transition-colors">
                Create your beautiful account 🌸
              </button>
            </p>
          </div> */}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-pink-500 text-sm">
            Made with 💕 for spreading love through music
          </p>
        </div>
      </div>
    </div>
  );
}

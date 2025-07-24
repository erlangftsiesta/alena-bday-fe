"use client"

import type React from "react"

import { useState } from "react"
import { Heart, Lock, Eye, EyeOff, Sparkles, Star, Music, User } from "lucide-react"
import { useAuth } from "../../../hooks/useAuth"

export default function LoginDesktop() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { loading, error, login, clearError } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login({ username, password })
    if (success) {
      // Redirect to home or dashboard
      console.log("Login successful! 💕")
    }
  }

  // const handleGoogleLogin = async () => {
  //   const success = await loginWithGoogle()
  //   if (success) {
  //     console.log("Google login successful! ✨")
  //   }
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-pink-200 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 text-pink-300 animate-pulse">
        <Heart className="w-12 h-12" />
      </div>
      <div className="absolute top-32 right-32 text-pink-400 animate-bounce">
        <Sparkles className="w-10 h-10" />
      </div>
      <div className="absolute bottom-40 left-16 text-pink-300 animate-pulse">
        <Star className="w-8 h-8" />
      </div>
      <div className="absolute bottom-20 right-20 text-pink-400 animate-bounce">
        <Music className="w-10 h-10" />
      </div>
      <div className="absolute top-1/2 left-10 text-pink-200 animate-pulse">
        <Heart className="w-6 h-6" />
      </div>
      <div className="absolute top-1/3 right-16 text-pink-300 animate-bounce">
        <Star className="w-7 h-7" />
      </div>

      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl w-full gap-12 items-center">
          {/* Left Side - Welcome Message */}
          <div className="text-center lg:text-left space-y-8">
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <Heart className="w-12 h-12 text-pink-500 animate-pulse" />
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <Heart className="w-12 h-12 text-pink-500 animate-pulse" />
              </div>
              <p className="text-2xl text-pink-600 font-medium mb-4">Happy Birthday my sweetie girl 💕</p>
              <p className="text-lg text-pink-500">
                Sign in to your beautiful account and continue your musical journey ✨
              </p>
            </div>

            <div className="space-y-4 text-pink-600">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center">
                  <Music className="w-4 h-4 text-pink-600" />
                </div>
                <span className="text-lg">Get happiness from the music they sent</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-pink-600" />
                </div>
                <span className="text-lg">Fill your thoughts and ears with love</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-pink-600" />
                </div>
                <span className="text-lg">All of this is only for you</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-pink-100">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-pink-800 mb-2">Sign In</h2>
                <p className="text-pink-600">Welcome back, beautiful! 🌸</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-pink-50 border-2 border-pink-200 text-pink-700 px-6 py-4 rounded-2xl mb-6 text-center">
                  <p className="font-medium">{error}</p>
                  <button onClick={clearError} className="text-pink-500 text-sm mt-2 underline">
                    Dismiss
                  </button>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Input */}
                <div>
                  <label className="block text-pink-800 font-semibold mb-3 text-lg">Username 💌</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 w-6 h-6" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-14 pr-4 py-4 border-2 border-pink-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-400 text-pink-800 placeholder-pink-400 text-lg transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-pink-800 font-semibold mb-3 text-lg">Password 🔐</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 w-6 h-6" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your secret password"
                      className="w-full pl-14 pr-14 py-4 border-2 border-pink-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-400 text-pink-800 placeholder-pink-400 text-lg transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-pink-400 hover:text-pink-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                {/* <div className="text-right">
                  <button
                    type="button"
                    className="text-pink-500 hover:text-pink-700 font-medium underline transition-colors"
                  >
                    Forgot your password? 🥺
                  </button>
                </div> */}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white py-5 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:from-pink-500 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing you in... 💕
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Heart className="w-6 h-6" />
                      Sign In with Love
                      <Heart className="w-6 h-6" />
                    </div>
                  )}
                </button>
              </form>

              {/* Divider */}
              {/* <div className="flex items-center my-8">
                <div className="flex-1 border-t border-pink-200"></div>
                <span className="px-4 text-pink-500 font-medium">or continue with</span>
                <div className="flex-1 border-t border-pink-200"></div>
              </div> */}

              {/* Google Login */}
              {/* <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full bg-white border-2 border-pink-200 text-pink-700 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-pink-50 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                Continue with Google ✨
              </button> */}

              {/* Sign Up Link */}
              {/* <div className="text-center mt-8">
                <p className="text-pink-600 text-lg">
                  New here sweetie?{" "}
                  <button className="text-pink-500 hover:text-pink-700 font-semibold underline transition-colors">
                    Create your beautiful account 🌸
                  </button>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <p className="text-pink-500 text-sm">Made with 💕 from your favourite boy</p>
      </div>
    </div>
  )
}

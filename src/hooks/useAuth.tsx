"use client"

import { useState, useCallback } from "react"

export interface LoginCredentials {
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true)
    setError(null)

    try {
      // Mock API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simple validation
      if (!credentials.email || !credentials.password) {
        throw new Error("Please fill in all fields sweetie! 💕")
      }

      if (!credentials.email.includes("@")) {
        throw new Error("Please enter a valid email address darling! 📧")
      }

      if (credentials.password.length < 6) {
        throw new Error("Password should be at least 6 characters honey! 🔒")
      }

      // Mock successful login
      const mockUser: User = {
        id: "1",
        name: "Sarah Johnson",
        email: credentials.email,
        avatar: "/placeholder.svg?height=120&width=120",
      }

      setUser(mockUser)
      setIsAuthenticated(true)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong sweetie! 💔")
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const loginWithGoogle = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Mock Google login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: "2",
        name: "Google User",
        email: "user@gmail.com",
        avatar: "/placeholder.svg?height=120&width=120",
      }

      setUser(mockUser)
      setIsAuthenticated(true)
      return true
    } catch (err) {
      setError("Google login failed sweetie! Try again? 🥺")
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setIsAuthenticated(false)
    setError(null)
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    loginWithGoogle,
    logout,
    clearError,
  }
}

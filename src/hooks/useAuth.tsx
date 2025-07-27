"use client";

import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constant";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/auth/me`, { withCredentials: true });
      setUser(res.data);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.post(`${API_URL}/auth/login`, credentials, {
          withCredentials: true,
        });
        console.log("Login response:", res.data);

        await fetchUser();
        navigate("/homepage"); // ✅ Redirect ke homepage
        return true;
      } catch (err: any) {
        setError(err.response?.data?.message || "Login failed");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [fetchUser, navigate]
  );

  const logout = useCallback(async () => {
    await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
    setUser(null);
    setIsAuthenticated(false);
    navigate("/send-message");
  }, [navigate]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    clearError,
    fetchUser,
  };
}

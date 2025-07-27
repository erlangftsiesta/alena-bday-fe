import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../constant";

interface UserProfile {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
  createdAt: string;
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<UserProfile>(`${API_URL}/auth/me`, {withCredentials: true});
      setProfile(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.patch<UserProfile>(`${API_URL}/users/1`, updates, {withCredentials: true});
      setProfile(res.data); // anggap backend return data yg udah terupdate
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const deleteAccount = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Mock API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In real app, this would redirect to login or home
      console.log("Account deleted successfully");
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete account");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    profile,
    loading,
    error,
    updateProfile,
    deleteAccount,
  };
}

"use client";

import axios from "axios";
import { useState, useCallback, useRef, useEffect } from "react";

export interface Song {
  id: string;
  title: string;
  artist: string;
  image: string;
  previewUrl?: string;
  duration?: number;
}

export interface MessageData {
  song: Song | null;
  message: string;
  sender: string;
}

export function useMusicSearch() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState("");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: string }>(
    {}
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<number | null>(null);

  const searchSongs = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // Mock API call - replace with your actual backend endpoint
      const response = await fetch(
        `http://localhost:3000/spotify/search?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Failed to search songs");
      }

      const data = await response.json();
      setSongs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      // Mock data for development
      setSongs([
        {
          id: "1",
          title: "Beautiful in White",
          artist: "Shane Filan",
          image: "/placeholder.svg?height=80&width=80",
          previewUrl:
            "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
        },
        {
          id: "2",
          title: "Perfect",
          artist: "Ed Sheeran",
          image: "/placeholder.svg?height=80&width=80",
          previewUrl:
            "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  const togglePlay = useCallback(
    (song: Song) => {
      if (!song.previewUrl) return;

      if (currentlyPlaying === song.id) {
        // Pause current song
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setCurrentlyPlaying(null);
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }
      } else {
        // Stop previous song and play new one
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }

        const audio = new Audio(song.previewUrl);
        audio.crossOrigin = "anonymous";
        audioRef.current = audio;

        // Reset progress for all other songs
        setProgress({});
        setTimeRemaining({});

        audio.play().catch((err) => console.error("Error playing audio:", err));
        setCurrentlyPlaying(song.id);

        // Update progress
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }

        progressInterval.current = setInterval(() => {
          if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration || 30;
            const progressPercent = (current / duration) * 100;

            setProgress((prev) => ({ ...prev, [song.id]: progressPercent }));

            const remaining = duration - current;
            const minutes = Math.floor(remaining / 60);
            const seconds = Math.floor(remaining % 60);
            setTimeRemaining((prev) => ({
              ...prev,
              [song.id]: `-${minutes}:${seconds.toString().padStart(2, "0")}`,
            }));
          }
        }, 100);

        // Handle song end
        audio.addEventListener("ended", () => {
          setCurrentlyPlaying(null);
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
          }
        });
      }
    },
    [currentlyPlaying]
  );

  const setProgressManually = useCallback(
    (song: Song, percentage: number) => {
      if (currentlyPlaying === song.id && audioRef.current) {
        const duration = audioRef.current.duration || 30;
        audioRef.current.currentTime = (percentage / 100) * duration;
      }
    },
    [currentlyPlaying]
  );

  const sendMessage = useCallback(async (messageData: MessageData) => {
    if (!messageData.song || !messageData.message.trim()) {
      setError("Please select a song and write a message.");
      return false;
    }

    try {
      await axios.post("http://localhost:3000/messages/new-message", {
        songTitle: messageData.song.title,
        artist: messageData.song.artist,
        albumCover: messageData.song.image,
        songMp3: messageData.song.previewUrl,
        message: messageData.message,
        sender: messageData.sender || "Anonymous",
        date: new Date().toISOString(),
      });

      setSelectedSong(null);
      setMessage("");
      setSender("");

      return true;
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to send message");
      return false;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  return {
    songs,
    loading,
    error,
    selectedSong,
    message,
    sender,
    currentlyPlaying,
    progress,
    timeRemaining,
    searchSongs,
    togglePlay,
    setProgressManually,
    setSelectedSong,
    setMessage,
    setSender,
    sendMessage,
  };
}

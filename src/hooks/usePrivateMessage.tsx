"use client";

import axios from "axios";
import { useState, useCallback, useEffect, useRef } from "react";
import { API_URL } from "../constant";

export interface PrivateMessage {
  id: string;
  sender: string;
  message: string;
  songTitle: string;
  artist: string;
  albumCover: string;
  mp3Url: string;
  date: string;
  duration: number;
}

export function usePrivateMessages() {
  const [messages, setMessages] = useState<PrivateMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: string }>(
    {}
  );
  const [selectedMessage, setSelectedMessage] = useState<PrivateMessage | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<number | null>(null);

  // Mock data - only private messages
  // const mockMessages: PrivateMessage[] = [
  //   {
  //     id: "p1",
  //     sender: "Secret Admirer",
  //     message:
  //       "I've been thinking about you every day since we met. This song perfectly captures how I feel about you. I hope someday I'll have the courage to tell you in person how much you mean to me. Until then, let this melody speak for my heart. 💕",
  //     songTitle: "Thinking of You",
  //     artist: "Katy Perry",
  //     albumCover: "/placeholder.svg?height=60&width=60",
  //     mp3Url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  //     date: "2024-01-21",
  //     duration: 30,
  //   },
  //   {
  //     id: "p2",
  //     sender: "Your Best Friend",
  //     message:
  //       "Remember our late-night conversations about love and life? This song always reminds me of those precious moments. You're such an amazing person and I'm so grateful to have you in my life. Keep being your wonderful self! 🌟",
  //     songTitle: "Best Day of My Life",
  //     artist: "American Authors",
  //     albumCover: "/placeholder.svg?height=60&width=60",
  //     mp3Url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  //     date: "2024-01-20",
  //     duration: 30,
  //   },
  //   {
  //     id: "p3",
  //     sender: "Anonymous",
  //     message:
  //       "I saw you at the coffee shop yesterday and you looked so beautiful. I wanted to come talk to you but I got nervous. This song reminds me of that moment when our eyes met for just a second. Maybe next time I'll be brave enough to say hello. 😊",
  //     songTitle: "Nervous",
  //     artist: "Shawn Mendes",
  //     albumCover: "/placeholder.svg?height=60&width=60",
  //     mp3Url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
  //     date: "2024-01-19",
  //     duration: 30,
  //   },
  // ]

  const loadMessages = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<PrivateMessage[]>(
        `${API_URL}/messages/private-messages`
      );
      setMessages(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  const truncateMessage = useCallback(
    (message: string, maxLength: number = 80) => {
      if (message.length <= maxLength) return message;
      return message.substring(0, maxLength).trim() + "...";
    },
    []
  );

  const togglePlay = useCallback(
    (message: PrivateMessage) => {
      if (currentlyPlaying === message.id) {
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
        }

        audioRef.current = new Audio(message.mp3Url);
        audioRef.current.crossOrigin = "anonymous";
        audioRef.current.play();
        setCurrentlyPlaying(message.id);

        // Update progress
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }

        progressInterval.current = setInterval(() => {
          if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration || message.duration;
            const progressPercent = (current / duration) * 100;

            setProgress((prev) => ({ ...prev, [message.id]: progressPercent }));

            const remaining = duration - current;
            const minutes = Math.floor(remaining / 60);
            const seconds = Math.floor(remaining % 60);
            setTimeRemaining((prev) => ({
              ...prev,
              [message.id]: `-${minutes}:${seconds
                .toString()
                .padStart(2, "0")}`,
            }));
          }
        }, 100);

        // Handle song end
        audioRef.current.addEventListener("ended", () => {
          setCurrentlyPlaying(null);
          if (progressInterval.current) {
            clearInterval(progressInterval.current);
          }
        });
      }
    },
    [currentlyPlaying]
  );

  const openModal = useCallback((message: PrivateMessage) => {
    setSelectedMessage(message);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedMessage(null);
  }, []);

  const setProgressManually = useCallback(
    (message: PrivateMessage, percentage: number) => {
      if (currentlyPlaying === message.id && audioRef.current) {
        const duration = audioRef.current.duration || message.duration;
        audioRef.current.currentTime = (percentage / 100) * duration;
      }
    },
    [currentlyPlaying]
  );

  const makeMessagePublic = useCallback(async (messageId: string) => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // In real app, this would move the message to public messages
      console.log(`Making message ${messageId} public`);

      // Remove from private messages
      setMessages((prev) => prev.filter((msg) => msg.id !== messageId));

      return true;
    } catch (err) {
      setError("Failed to make message public");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

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
    messages,
    loading,
    error,
    currentlyPlaying,
    progress,
    timeRemaining,
    selectedMessage,
    showModal,
    truncateMessage,
    togglePlay,
    openModal,
    closeModal,
    setProgressManually,
    makeMessagePublic,
    loadMessages,
  };
}

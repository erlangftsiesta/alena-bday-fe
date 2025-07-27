"use client";

import axios from "axios";
import { useState, useCallback, useEffect, useRef } from "react";
import { API_URL } from "../constant";

export interface Message {
  id: string;
  songTitle: string;
  artist: string;
  albumCover: string;
  message: string;
  songMp3?: string;
  sender: string;
  date: string;
  isPublic: boolean | number;
  isNew: boolean | number; // New field for unread messages
}

export interface AudioState {
  currentlyPlaying: string | null;
  progress: { [key: string]: number };
  timeRemaining: { [key: string]: string };
}

export interface NotificationData {
  totalMessages: number;
  unreadMessages: number;
  lastMessageDate: string;
  newMessages: number; // New field for new messages
}

export function useHomepage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [notification, setNotification] = useState<NotificationData>({
    totalMessages: 0,
    unreadMessages: 0,
    lastMessageDate: "",
    newMessages: 0, // Initialize new messages count
  });
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: string }>(
    {}
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<number | null>(null);

  // Mock data
  // const mockMessages: Message[] = [
  //   {
  //     id: "1",
  //     songTitle: "Perfect",
  //     artist: "Ed Sheeran",
  //     albumCover: "/placeholder.svg?height=60&width=60",
  //     message: "This song reminds me of you every single day. You're my perfect person! 💕",
  //     sender: "Alex",
  //     date: "2024-01-20",
  //     isPublic: false,
  //   },
  //   {
  //     id: "2",
  //     songTitle: "Beautiful in White",
  //     artist: "Shane Filan",
  //     albumCover: "/placeholder.svg?height=60&width=60",
  //     message: "Can't wait to see you in white someday... You're so beautiful! 👰💖",
  //     sender: "Anonymous",
  //     date: "2024-01-19",
  //     isPublic: false,
  //   },
  //   {
  //     id: "3",
  //     songTitle: "All of Me",
  //     artist: "John Legend",
  //     albumCover: "/placeholder.svg?height=60&width=60",
  //     message: "All of me loves all of you. You're my everything, my love! 🌹",
  //     sender: "Your Secret Admirer",
  //     date: "2024-01-18",
  //     isPublic: false,
  //   },
  //   {
  //     id: "4",
  //     songTitle: "Thinking Out Loud",
  //     artist: "Ed Sheeran",
  //     albumCover: "/placeholder.svg?height=60&width=60",
  //     message: "When your legs don't work like they used to before... I'll still love you! 💕",
  //     sender: "Mom",
  //     date: "2024-01-17",
  //     isPublic: false,
  //   },
  // ]

  const loadMessages = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get<Message[]>(`${API_URL}/messages`);

      const data = res.data;

      const sorted = [...data].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      const newMessagesCount = data.filter((m) => m.isNew).length;
      // const privateMessagesCount = data.filter((m) => !m.isPublic).length;

      setMessages(sorted);
      setNotification({
        totalMessages: data.length,
        unreadMessages: data.filter((m: any) => !m.isPublic).length,
        lastMessageDate: sorted[0]?.date || "",
        newMessages: newMessagesCount,
      });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  const openGift = useCallback(() => {
    setIsGiftOpened(true);
    setTimeout(() => {
      setShowModal(true);
    }, 800); // Delay to show opening animation first
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setTimeout(() => {
      setIsGiftOpened(false);
    }, 300);
  }, []);

  const refreshMessages = useCallback(async () => {
    await loadMessages();
  }, [loadMessages]);

  const toggleMessagePrivacy = useCallback(
    async (messageId: string, makePublic: boolean) => {
      setLoading(true);
      try {
        await axios.patch(`${API_URL}/messages/${messageId}/privacy-update`, {
          isPublic: makePublic,
        });

        setMessages((prev) => {
          const updated = prev.map((msg) =>
            msg.id === messageId ? { ...msg, isPublic: makePublic } : msg
          );

          const updatedMessages = messages.map((msg) =>
            msg.id === messageId ? { ...msg, isPublic: makePublic } : msg
          );
          const privateMessagesCount = updatedMessages.filter(
            (m) => !m.isPublic
          ).length;
          const newMessagesCount = updatedMessages.filter(
            (m) => m.isNew
          ).length;

          setNotification((prev) => ({
            ...prev,
            unreadMessages: privateMessagesCount,
            newMessages: newMessagesCount,
          }));

          return updated;
        });

        return true;
      } catch (err) {
        setError("Failed to update message privacy");
        return false;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const togglePlay = useCallback(
    (message: Message) => {
      // Mock mp3 URL for demo - replace with actual song URLs
      const mp3Url = message?.songMp3;

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
          audioRef.current = null;
        }

        const audio = new Audio(mp3Url);
        audio.crossOrigin = "anonymous";
        audioRef.current = audio;

        // Reset progress for all other songs
        setProgress({});
        setTimeRemaining({});

        audio.play().catch((err) => console.error("Error playing audio:", err));
        setCurrentlyPlaying(message.id);

        // Update progress
        if (progressInterval.current) {
          clearInterval(progressInterval.current);
        }

        progressInterval.current = setInterval(() => {
          if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const duration = audioRef.current.duration || 30;
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

  const markMessageAsRead = useCallback(async (messageId: string) => {
    try {
      // Correct axios usage
      const response = await axios.patch(
        `${API_URL}/messages/${messageId}/mark-read`
      );

      // Axios does not use .ok — check response.status instead
      if (response.status !== 200) {
        throw new Error("Failed to mark message as read");
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId && msg.isNew ? { ...msg, isNew: false } : msg
        )
      );

      setNotification((prev) => ({
        ...prev,
        newMessages: Math.max(0, prev.newMessages - 1),
      }));

      return true;
    } catch (err) {
      console.error("Failed to mark message as read:", err);
      return false;
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.patch(`${API_URL}/messages/mark-all-read`);

      if (response.status !== 200) {
        throw new Error("Failed to mark all messages as read");
      }

      setMessages((prev) => prev.map((msg) => ({ ...msg, isNew: false })));
      setNotification((prev) => ({ ...prev, newMessages: 0 }));

      return true;
    } catch (err) {
      setError("Failed to mark all messages as read");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMessages();

    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [loadMessages]);

  return {
    messages,
    notification,
    isGiftOpened,
    showModal,
    loading,
    error,
    currentlyPlaying,
    progress,
    timeRemaining,
    openGift,
    closeModal,
    refreshMessages,
    toggleMessagePrivacy,
    loadMessages,
    togglePlay,
    markMessageAsRead,
    markAllAsRead,
  };
}

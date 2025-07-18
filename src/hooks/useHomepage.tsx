"use client";

import axios from "axios";
import { useState, useCallback, useEffect } from "react";

export interface Message {
  id: string;
  songTitle: string;
  artist: string;
  albumCover: string;
  message: string;
  sender: string;
  date: string;
  isPublic: boolean;
}

export interface NotificationData {
  totalMessages: number;
  unreadMessages: number;
  lastMessageDate: string;
}

export function useHomepage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [notification, setNotification] = useState<NotificationData>({
    totalMessages: 0,
    unreadMessages: 0,
    lastMessageDate: "",
  });
  const [isGiftOpened, setIsGiftOpened] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const res = await axios.get<Message[]>(`http://localhost:3000/messages`);

      const data = res.data;

      const sorted = [...data].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setMessages(sorted);
      setNotification({
        totalMessages: data.length,
        unreadMessages: data.filter((m: any) => !m.isPublic).length,
        lastMessageDate: sorted[0]?.date || "",
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
        await axios.patch(
          `http://localhost:3000/messages/${messageId}/privacy-update`,
          {
            isPublic: makePublic,
          }
        );

        setMessages((prev) => {
          const updated = prev.map((msg) =>
            msg.id === messageId ? { ...msg, isPublic: makePublic } : msg
          );

          // Langsung hitung unreadMessages dari updated array
          const unread = updated.filter((m) => !m.isPublic).length;

          setNotification((prev) => ({
            ...prev,
            unreadMessages: unread,
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

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return {
    messages,
    notification,
    isGiftOpened,
    showModal,
    loading,
    error,
    openGift,
    closeModal,
    refreshMessages,
    toggleMessagePrivacy,
    loadMessages,
  };
}

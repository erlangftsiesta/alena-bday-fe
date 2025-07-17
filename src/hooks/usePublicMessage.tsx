"use client"

import { useState, useCallback, useEffect, useRef } from "react"

export interface PublicMessage {
  id: string
  sender: string
  message: string
  songTitle: string
  artist: string
  albumCover: string
  mp3Url: string
  date: string
  duration: number
}

export function usePublicMessages() {
  const [messages, setMessages] = useState<PublicMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [progress, setProgress] = useState<{ [key: string]: number }>({})
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: string }>({})
  const [selectedMessage, setSelectedMessage] = useState<PublicMessage | null>(null)
  const [showModal, setShowModal] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressInterval = useRef< number | null>(null)

  // Mock data
  const mockMessages: PublicMessage[] = [
    {
      id: "1",
      sender: "Alex",
      message: "This song reminds me of you every single day. You're my perfect person and I can't imagine my life without you! Every time I hear this melody, my heart skips a beat thinking about all our beautiful memories together. 💕",
      songTitle: "Perfect",
      artist: "Ed Sheeran",
      albumCover: "/placeholder.svg?height=60&width=60",
      mp3Url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      date: "2024-01-20",
      duration: 30,
    },
    {
      id: "2",
      sender: "Anonymous",
      message: "Can't wait to see you in white someday... You're so beautiful and amazing! This song perfectly describes how I feel about you. You light up my world in ways I never thought possible. 👰💖",
      songTitle: "Beautiful in White",
      artist: "Shane Filan",
      albumCover: "/placeholder.svg?height=60&width=60",
      mp3Url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      date: "2024-01-19",
      duration: 30,
    },
    {
      id: "3",
      sender: "Your Secret Admirer",
      message: "All of me loves all of you. You're my everything, my love! I've been watching you from afar and I just had to let you know how incredible you are. This song speaks to my soul about you. 🌹",
      songTitle: "All of Me",
      artist: "John Legend",
      albumCover: "/placeholder.svg?height=60&width=60",
      mp3Url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      date: "2024-01-18",
      duration: 30,
    },
    {
      id: "4",
      sender: "Mom",
      message: "When your legs don't work like they used to before... I'll still love you! My dear daughter, this song reminds me of how much I love you unconditionally. No matter what happens in life, remember that mom will always be here for you. 💕",
      songTitle: "Thinking Out Loud",
      artist: "Ed Sheeran",
      albumCover: "/placeholder.svg?height=60&width=60",
      mp3Url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      date: "2024-01-17",
      duration: 30,
    },
    {
      id: "5",
      sender: "Best Friend",
      message: "This is our friendship anthem! Remember when we used to sing this together during our road trips? Those were the best times of our lives and I miss them so much. Can't wait to create more memories with you! 🎵",
      songTitle: "Count on Me",
      artist: "Bruno Mars",
      albumCover: "/placeholder.svg?height=60&width=60",
      mp3Url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      date: "2024-01-16",
      duration: 30,
    },
  ]

  const loadMessages = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setMessages(mockMessages)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages")
    } finally {
      setLoading(false)
    }
  }, [])

  const truncateMessage = useCallback((message: string, maxLength: number = 80) => {
    if (message.length <= maxLength) return message
    return message.substring(0, maxLength).trim() + "..."
  }, [])

  const togglePlay = useCallback(
    (message: PublicMessage) => {
      if (currentlyPlaying === message.id) {
        // Pause current song
        if (audioRef.current) {
          audioRef.current.pause()
        }
        setCurrentlyPlaying(null)
        if (progressInterval.current) {
          clearInterval(progressInterval.current)
        }
      } else {
        // Stop previous song and play new one
        if (audioRef.current) {
          audioRef.current.pause()
        }

        audioRef.current = new Audio(message.mp3Url)
        audioRef.current.crossOrigin = "anonymous"
        audioRef.current.play()
        setCurrentlyPlaying(message.id)

        // Update progress
        if (progressInterval.current) {
          clearInterval(progressInterval.current)
        }

        progressInterval.current = setInterval(() => {
          if (audioRef.current) {
            const current = audioRef.current.currentTime
            const duration = audioRef.current.duration || message.duration
            const progressPercent = (current / duration) * 100

            setProgress((prev) => ({ ...prev, [message.id]: progressPercent }))

            const remaining = duration - current
            const minutes = Math.floor(remaining / 60)
            const seconds = Math.floor(remaining % 60)
            setTimeRemaining((prev) => ({
              ...prev,
              [message.id]: `-${minutes}:${seconds.toString().padStart(2, "0")}`,
            }))
          }
        }, 100)

        // Handle song end
        audioRef.current.addEventListener("ended", () => {
          setCurrentlyPlaying(null)
          if (progressInterval.current) {
            clearInterval(progressInterval.current)
          }
        })
      }
    },
    [currentlyPlaying],
  )

  const openModal = useCallback((message: PublicMessage) => {
    setSelectedMessage(message)
    setShowModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setShowModal(false)
    setSelectedMessage(null)
  }, [])

  const setProgressManually = useCallback(
    (message: PublicMessage, percentage: number) => {
      if (currentlyPlaying === message.id && audioRef.current) {
        const duration = audioRef.current.duration || message.duration
        audioRef.current.currentTime = (percentage / 100) * duration
      }
    },
    [currentlyPlaying],
  )

  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    }
  }, [])

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
    loadMessages,
  }
}

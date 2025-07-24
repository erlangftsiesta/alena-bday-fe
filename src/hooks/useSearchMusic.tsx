"use client"

import axios from "axios"
import { useState, useCallback, useRef, useEffect } from "react"

export interface Song {
  id: string
  title: string
  artist: string
  image: string
  previewUrl?: string
  duration?: number
}

export interface MessageData {
  song: Song | null
  message: string
  sender: string
}

export function useMusicSearch() {
  const [songs, setSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const [message, setMessage] = useState("")
  const [sender, setSender] = useState("")
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [progress, setProgress] = useState<{ [key: string]: number }>({})
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: string }>({})

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressInterval = useRef<number | null>(null)

  // Function to completely stop and cleanup audio
  const stopAllAudio = useCallback(() => {
    // Stop and cleanup current audio
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current.removeEventListener("ended", () => {})
      audioRef.current = null
    }

    // Clear progress interval
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
      progressInterval.current = null
    }

    // Reset states
    setCurrentlyPlaying(null)
    setProgress({})
    setTimeRemaining({})
  }, [])

  const searchSongs = useCallback(async (query: string) => {
    if (!query.trim()) return

    setLoading(true)
    setError(null)

    try {
      // Mock API call - replace with your actual backend endpoint
      const response = await fetch(`http://localhost:3000/spotify/search?q=${encodeURIComponent(query)}`)

      if (!response.ok) {
        throw new Error("Failed to search songs")
      }

      const data = await response.json()
      setSongs(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      // // Mock data for development
      // setSongs([
      //   {
      //     id: "1",
      //     title: "Beautiful in White",
      //     artist: "Shane Filan",
      //     image: "/placeholder.svg?height=80&width=80",
      //     previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      //   },
      //   {
      //     id: "2",
      //     title: "Perfect",
      //     artist: "Ed Sheeran",
      //     image: "/placeholder.svg?height=80&width=80",
      //     previewUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      //   },
      // ])
    } finally {
      setLoading(false)
    }
  }, [])

  const togglePlay = useCallback(
    (song: Song) => {
      if (!song.previewUrl) return

      // If clicking the same song that's currently playing, pause it
      if (currentlyPlaying === song.id) {
        stopAllAudio()
        return
      }

      // Stop any currently playing audio first
      stopAllAudio()

      try {
        // Create new audio instance
        const audio = new Audio(song.previewUrl)
        audio.crossOrigin = "anonymous"
        audioRef.current = audio

        // Set up event listeners before playing
        const handleEnded = () => {
          stopAllAudio()
        }

        const handleError = (e: Event) => {
          console.error("Audio error:", e)
          stopAllAudio()
          setError("Failed to play audio")
        }

        audio.addEventListener("ended", handleEnded)
        audio.addEventListener("error", handleError)

        // Start playing
        audio
          .play()
          .then(() => {
            setCurrentlyPlaying(song.id)

            // Set up progress tracking
            progressInterval.current = setInterval(() => {
              if (audioRef.current && !audioRef.current.paused) {
                const current = audioRef.current.currentTime
                const duration = audioRef.current.duration || 30
                const progressPercent = (current / duration) * 100

                setProgress({ [song.id]: progressPercent })

                const remaining = duration - current
                const minutes = Math.floor(remaining / 60)
                const seconds = Math.floor(remaining % 60)
                setTimeRemaining({
                  [song.id]: `-${minutes}:${seconds.toString().padStart(2, "0")}`,
                })
              }
            }, 100)
          })
          .catch((err) => {
            console.error("Error playing audio:", err)
            stopAllAudio()
            setError("Failed to play audio")
          })
      } catch (err) {
        console.error("Error creating audio:", err)
        stopAllAudio()
        setError("Failed to load audio")
      }
    },
    [currentlyPlaying, stopAllAudio],
  )

  const setProgressManually = useCallback(
    (song: Song, percentage: number) => {
      if (currentlyPlaying === song.id && audioRef.current) {
        const duration = audioRef.current.duration || 30
        audioRef.current.currentTime = (percentage / 100) * duration
      }
    },
    [currentlyPlaying],
  )

  const sendMessage = useCallback(
    async (messageData: MessageData) => {
      if (!messageData.song || !messageData.message.trim()) {
        setError("Please select a song and write a message.")
        return false
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
        })

        // Reset form
        setSelectedSong(null)
        setMessage("")
        setSender("")

        // Stop any playing audio
        stopAllAudio()

        return true
      } catch (err: any) {
        console.error(err)
        setError(err.response?.data?.message || "Failed to send message")
        return false
      }
    },
    [stopAllAudio],
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAllAudio()
    }
  }, [stopAllAudio])

  // Cleanup when songs change (new search)
  useEffect(() => {
    stopAllAudio()
  }, [songs, stopAllAudio])

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
  }
}

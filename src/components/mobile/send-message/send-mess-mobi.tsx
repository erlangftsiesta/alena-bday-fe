"use client"

import type React from "react"

import { useState } from "react"
import { Search, Play, Pause, Music, Send, Heart } from "lucide-react"
import { useMusicSearch, type Song } from "../../../hooks/useSearchMusic"

export default function SendMessageMobile() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showMessageForm, setShowMessageForm] = useState(false)

  const {
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
  } = useMusicSearch()

  const handleSearch = () => {
    searchSongs(searchQuery)
  }

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song)
    setShowMessageForm(true)
  }

  const handleSendMessage = async () => {
    if (!selectedSong) return

    const success = await sendMessage({
      song: selectedSong,
      message,
      sender: sender || "Anonymous",
    })

    if (success) {
      setShowMessageForm(false)
      // Show success message or redirect
    }
  }

  const handleProgressClick = (song: Song, event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const percentage = (clickX / rect.width) * 100
    setProgressManually(song, percentage)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="w-6 h-6 text-pink-500" />
          <h1 className="text-2xl font-bold text-pink-800">Send a Song</h1>
          <Heart className="w-6 h-6 text-pink-500" />
        </div>
        <p className="text-pink-600 text-sm">Share your feelings through music</p>
      </div>

      {!showMessageForm ? (
        <>
          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-6">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a song..."
                  className="w-full pl-10 pr-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-pink-800"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
              >
                {loading ? "..." : "Search"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4">{error}</div>
          )}

          {/* Song Results */}
          <div className="space-y-4">
            {songs.map((song) => {
              const isPlaying = currentlyPlaying === song.id
              return (
                <div
                  key={song.id}
                  className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl p-4 shadow-lg border border-pink-200"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={song.image || "/placeholder.svg"}
                      alt="Album cover"
                      className="w-16 h-16 rounded-xl object-cover shadow-md"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-pink-800 text-lg truncate">{song.title}</h3>
                      <p className="text-pink-600 text-sm truncate">{song.artist}</p>

                      {/* Progress Bar */}
                      <div className="flex items-center gap-2 mt-2">
                        <div
                          className="flex-1 bg-pink-200 h-1 rounded-full cursor-pointer"
                          onClick={(e) => handleProgressClick(song, e)}
                        >
                          <div
                            className="bg-pink-500 h-full rounded-full transition-all duration-100"
                            style={{ width: `${progress[song.id] || 0}%` }}
                          />
                        </div>
                        <span className="text-xs text-pink-600 min-w-[40px]">{timeRemaining[song.id] || "-0:30"}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {song.previewUrl ? (
                        <button
                          onClick={() => togglePlay(song)}
                          className={`bg-white text-pink-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 ${
                            isPlaying ? "ring-2 ring-pink-400" : ""
                          }`}
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                        </button>
                      ) : (
                        <div className="text-pink-400 text-xs">No preview</div>
                      )}

                      <button
                        onClick={() => handleSongSelect(song)}
                        className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}

            {songs.length === 0 && !loading && (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <Music className="w-16 h-16 text-pink-300 mx-auto mb-4" />
                <p className="text-pink-600 text-lg font-medium">No songs found</p>
                <p className="text-pink-500 text-sm">Try searching for another song</p>
              </div>
            )}
          </div>
        </>
      ) : (
        /* Message Form */
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <button
            onClick={() => setShowMessageForm(false)}
            className="text-pink-500 mb-4 flex items-center gap-2 text-sm"
          >
            ← Back to search
          </button>

          {/* Selected Song */}
          {selectedSong && (
            <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <img
                  src={selectedSong.image || "/placeholder.svg"}
                  alt="Album cover"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-bold text-pink-800">{selectedSong.title}</h3>
                  <p className="text-pink-600 text-sm">{selectedSong.artist}</p>
                </div>
                <Music className="w-5 h-5 text-pink-500 ml-auto" />
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="mb-4">
            <label className="block text-pink-800 font-medium mb-2">Your Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your heartfelt message here..."
              className="w-full p-4 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-pink-800 resize-none"
              rows={4}
            />
          </div>

          {/* Sender Input */}
          <div className="mb-6">
            <label className="block text-pink-800 font-medium mb-2">From (optional)</label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="Anonymous"
              className="w-full p-4 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-pink-800"
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Send with Love
          </button>
        </div>
      )}
    </div>
  )
}

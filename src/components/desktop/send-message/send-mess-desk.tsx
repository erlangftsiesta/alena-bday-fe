"use client"

import type React from "react"

import { useState } from "react"
import { Search, Play, Pause, Music, Send, Heart, ArrowLeft } from "lucide-react"
import { useMusicSearch, type Song } from "../../../hooks/useSearchMusic"

export default function SendMessageDesktop() {
  const [searchQuery, setSearchQuery] = useState("beautiful in white")
  const [showSearchResults, setShowSearchResults] = useState(true)

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
    setShowSearchResults(true)
  }

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song)
    setShowSearchResults(false) // Hide search results after selecting a song
  }

  const handleBackToSearch = () => {
    setShowSearchResults(true)
  }

  const handleSendMessage = async () => {
    if (!selectedSong) return

    const success = await sendMessage({
      song: selectedSong,
      message,
      sender: sender || "Anonymous",
    })

    if (success) {
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Heart className="w-8 h-8 text-pink-500" />
            <h1 className="text-4xl font-bold text-pink-800">Send a Song</h1>
            <Heart className="w-8 h-8 text-pink-500" />
          </div>
          <p className="text-pink-600 text-lg">Share your feelings through music</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Search and Results */}
          <div className="lg:col-span-2">
            {/* Search Box */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for a song..."
                    className="w-full pl-12 pr-4 py-4 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-pink-800 text-lg"
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-gradient-to-r from-pink-400 to-pink-500 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl mb-6">{error}</div>
            )}

            {/* Song Results */}
            {showSearchResults ? (
              <div className="space-y-4">
                {songs.map((song) => {
                  const isPlaying = currentlyPlaying === song.id
                  return (
                    <div
                      key={song.id}
                      className={`bg-gradient-to-r from-orange-100 to-pink-100 rounded-2xl p-6 shadow-lg border-2 transition-all duration-200 hover:shadow-xl relative ${
                        selectedSong?.id === song.id ? "border-pink-400 ring-2 ring-pink-200" : "border-pink-200"
                      }`}
                    >
                      {/* Play Button - Top Right Corner */}
                      {song.previewUrl && (
                        <button
                          onClick={() => togglePlay(song)}
                          className={`absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                            isPlaying ? "bg-pink-500 text-white" : "bg-white text-pink-500 hover:bg-pink-50"
                          }`}
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                        </button>
                      )}

                      <div className="flex items-center gap-4 pr-16">
                        <img
                          src={song.image || "/placeholder.svg"}
                          alt="Album cover"
                          className="w-20 h-20 rounded-xl object-cover shadow-md"
                        />

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-pink-800 text-xl mb-1">{song.title}</h3>
                          <p className="text-pink-600 mb-3">{song.artist}</p>

                          {/* Progress Bar - Only show when playing */}
                          {isPlaying && (
                            <div className="flex items-center gap-3 mb-2">
                              <div
                                className="flex-1 bg-pink-200 h-2 rounded-full cursor-pointer"
                                onClick={(e) => handleProgressClick(song, e)}
                              >
                                <div
                                  className="bg-pink-500 h-full rounded-full transition-all duration-100"
                                  style={{ width: `${progress[song.id] || 0}%` }}
                                />
                              </div>
                              <span className="text-sm text-pink-600 min-w-[50px]">
                                {timeRemaining[song.id] || "-0:30"}
                              </span>
                            </div>
                          )}

                          {!song.previewUrl && <div className="text-pink-400 text-sm mb-2">No preview available</div>}
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleSongSelect(song)}
                            className={`px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 ${
                              selectedSong?.id === song.id
                                ? "bg-pink-500 text-white"
                                : "bg-gradient-to-r from-pink-400 to-pink-500 text-white"
                            }`}
                          >
                            {selectedSong?.id === song.id ? "Selected" : "Select"}
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
            ) : (
              /* Message Form for Desktop - Show when a song is selected and search results are hidden */
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <button
                  onClick={handleBackToSearch}
                  className="text-pink-500 mb-6 flex items-center gap-2 hover:text-pink-700 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to search results
                </button>

                {/* Selected Song Display - Larger version */}
                {selectedSong && (
                  <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl p-6 mb-8 relative">
                    {/* Play Button - Top Right Corner */}
                    {selectedSong.previewUrl && (
                      <button
                        onClick={() => togglePlay(selectedSong)}
                        className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                          currentlyPlaying === selectedSong.id
                            ? "bg-pink-500 text-white"
                            : "bg-white text-pink-500 hover:bg-pink-50"
                        }`}
                      >
                        {currentlyPlaying === selectedSong.id ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" />
                        )}
                      </button>
                    )}

                    <div className="flex items-center gap-4 pr-12">
                      <img
                        src={selectedSong.image || "/placeholder.svg"}
                        alt="Album cover"
                        className="w-24 h-24 rounded-xl object-cover shadow-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-pink-800 text-2xl mb-1">{selectedSong.title}</h3>
                        <p className="text-pink-600 text-lg mb-3">{selectedSong.artist}</p>

                        {/* Progress Bar - Only show when playing */}
                        {currentlyPlaying === selectedSong.id && (
                          <div className="flex items-center gap-3">
                            <div
                              className="flex-1 bg-pink-200 h-2 rounded-full cursor-pointer"
                              onClick={(e) => handleProgressClick(selectedSong, e)}
                            >
                              <div
                                className="bg-pink-500 h-full rounded-full transition-all duration-100"
                                style={{ width: `${progress[selectedSong.id] || 0}%` }}
                              />
                            </div>
                            <span className="text-sm text-pink-600 min-w-[50px]">
                              {timeRemaining[selectedSong.id] || "-0:30"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Message Input */}
                <div className="mb-6">
                  <label className="block text-pink-800 font-medium mb-3 text-lg">Your Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your heartfelt message here..."
                    className="w-full p-5 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-pink-800 resize-none text-lg"
                    rows={6}
                  />
                </div>

                {/* Sender Input */}
                <div className="mb-8">
                  <label className="block text-pink-800 font-medium mb-3 text-lg">From (optional)</label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    placeholder="Anonymous"
                    className="w-full p-5 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 text-pink-800 text-lg"
                  />
                </div>

                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={!selectedSong || !message.trim()}
                  className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-5 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  <Send className="w-6 h-6" />
                  Send with Love
                </button>
              </div>
            )}
          </div>

          {/* Right Column - Message Form (only visible when search results are shown) */}
          {showSearchResults && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                <h2 className="text-2xl font-bold text-pink-800 mb-6 flex items-center gap-2">
                  <Music className="w-6 h-6" />
                  Your Message
                </h2>

                {/* Selected Song Display */}
                {selectedSong && (
                  <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedSong.image || "/placeholder.svg"}
                        alt="Album cover"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-pink-800 text-sm truncate">{selectedSong.title}</h3>
                        <p className="text-pink-600 text-xs truncate">{selectedSong.artist}</p>
                      </div>
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
                    rows={6}
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
                  disabled={!selectedSong || !message.trim()}
                  className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send with Love
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

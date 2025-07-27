"use client"

import type React from "react"

import { Heart, Play, Pause, Music, X, Sparkles, Globe, Star } from "lucide-react"
import { usePublicMessages } from "../../../hooks/usePublicMessage"

export default function PublicMessagesDesktop() {
  const {
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
  } = usePublicMessages()

  const handleProgressClick = (message: any, event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const percentage = (clickX / rect.width) * 100
    setProgressManually(message, percentage)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-pink-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-pink-600 font-medium text-xl">Loading love messages... 💕</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-pink-200 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 text-pink-300 animate-pulse">
        <Heart className="w-12 h-12" />
      </div>
      <div className="absolute top-32 right-32 text-pink-400 animate-bounce">
        <Sparkles className="w-10 h-10" />
      </div>
      <div className="absolute bottom-40 left-16 text-pink-300 animate-pulse">
        <Star className="w-8 h-8" />
      </div>
      <div className="absolute bottom-20 right-20 text-pink-400 animate-bounce">
        <Music className="w-10 h-10" />
      </div>

      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-10 h-10 text-pink-500" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
                Public Love Messages
              </h1>
              <Globe className="w-10 h-10 text-pink-500" />
            </div>
            <p className="text-pink-600 text-xl font-medium">Beautiful songs shared with the world 🌍💕</p>
            <p className="text-pink-500 text-lg mt-2">Click any message to read the full story ✨</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl mb-8 text-center max-w-2xl mx-auto">
              {error}
            </div>
          )}

          {/* Messages Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-200 hover:shadow-2xl transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={message.albumCover || "/placeholder.svg"}
                    alt="Album cover"
                    className="w-20 h-20 rounded-xl object-cover shadow-lg flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-pink-800 text-lg truncate">{message.songTitle}</h3>
                        <p className="text-pink-600 truncate">{message.artist}</p>
                      </div>
                      <button
                        onClick={() => togglePlay(message)}
                        className="bg-pink-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-600 transition-colors flex-shrink-0 ml-3"
                      >
                        {currentlyPlaying === message.id ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5 ml-0.5" />
                        )}
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="flex-1 bg-pink-200 h-2 rounded-full cursor-pointer"
                        onClick={(e) => handleProgressClick(message, e)}
                      >
                        <div
                          className="bg-pink-500 h-full rounded-full transition-all duration-100"
                          style={{ width: `${progress[message.id] || 0}%` }}
                        />
                      </div>
                      <span className="text-sm text-pink-600 min-w-[45px]">{timeRemaining[message.id] || "-0:30"}</span>
                    </div>

                    {/* Message Preview */}
                    <div
                      onClick={() => openModal(message)}
                      className="cursor-pointer hover:bg-pink-50 p-3 rounded-xl transition-colors"
                    >
                      <p className="text-pink-700 leading-relaxed mb-3 h-12 overflow-hidden">
                        {truncateMessage(message.message, 100)}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-pink-500 font-medium">From: {message.sender}</span>
                        <span className="text-pink-400 text-sm">{new Date(message.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {messages.length === 0 && !loading && (
            <div className="text-center py-20">
              <Music className="w-24 h-24 text-pink-300 mx-auto mb-6" />
              <p className="text-pink-600 text-2xl font-medium mb-2">No public messages yet</p>            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-modal-appear shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-pink-400 to-pink-600 p-8 text-white relative">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 text-white hover:text-pink-200 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">{selectedMessage.songTitle}</h2>
                <p className="text-xl text-pink-100">{selectedMessage.artist}</p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="text-center mb-8">
                <img
                  src={selectedMessage.albumCover || "/placeholder.svg"}
                  alt="Album cover"
                  className="w-32 h-32 rounded-2xl object-cover shadow-xl mx-auto mb-6"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-pink-800 font-bold text-xl mb-4">Full Message:</h3>
                  <p className="text-pink-700 text-lg leading-relaxed bg-pink-50 p-6 rounded-2xl">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-pink-200">
                  <div>
                    <p className="text-pink-600 font-semibold text-lg">From: {selectedMessage.sender}</p>
                    <p className="text-pink-500">{new Date(selectedMessage.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-pink-500">
                      <Globe className="w-5 h-5" />
                      <span className="font-medium">Public Message</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes modal-appear {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-modal-appear {
          animation: modal-appear 0.4s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}

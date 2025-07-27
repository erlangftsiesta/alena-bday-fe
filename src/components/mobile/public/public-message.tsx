"use client";

import type React from "react";

import { Heart, Play, Pause, Music, X, Sparkles, Globe } from "lucide-react";
import { usePublicMessages } from "../../../hooks/usePublicMessage";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function PublicMessagesMobile() {
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
  } = usePublicMessages();

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleProgressClick = (
    message: any,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    setProgressManually(message, percentage);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-pink-200 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-pink-600 font-medium">
            Loading love messages... 💕
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-pink-200 p-4">
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-6 text-pink-300 animate-pulse">
        <Heart className="w-6 h-6" />
      </div>
      <div className="absolute top-20 right-8 text-pink-400 animate-bounce">
        <Sparkles className="w-5 h-5" />
      </div>

      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Globe className="w-6 h-6 text-pink-500" />
          <h1 className="text-2xl font-bold text-pink-800">
            Public Love Messages
          </h1>
          <Globe className="w-6 h-6 text-pink-500" />
        </div>
        <p className="text-pink-600 text-sm">
          Beautiful songs shared with the world 🌍💕
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-4">
          {error}
        </div>
      )}

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-pink-200 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <img
                src={message.albumCover || "/placeholder.svg"}
                alt="Album cover"
                className="w-16 h-16 rounded-xl object-cover shadow-md flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-pink-800 text-sm truncate">
                      {message.songTitle}
                    </h3>
                    <p className="text-pink-600 text-xs truncate">
                      {message.artist}
                    </p>
                  </div>
                  <button
                    onClick={() => togglePlay(message)}
                    className="bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-pink-600 transition-colors flex-shrink-0 ml-2"
                  >
                    {currentlyPlaying === message.id ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="flex-1 bg-pink-200 h-1 rounded-full cursor-pointer"
                    onClick={(e) => handleProgressClick(message, e)}
                  >
                    <div
                      className="bg-pink-500 h-full rounded-full transition-all duration-100"
                      style={{ width: `${progress[message.id] || 0}%` }}
                    />
                  </div>
                  <span className="text-xs text-pink-600 min-w-[35px]">
                    {timeRemaining[message.id] || "-0:30"}
                  </span>
                </div>

                {/* Message Preview */}
                <div
                  onClick={() => openModal(message)}
                  className="cursor-pointer hover:bg-pink-50 p-2 rounded-lg transition-colors"
                >
                  <p className="text-pink-700 text-sm leading-relaxed mb-2">
                    {truncateMessage(message.message, 60)}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-pink-500 text-xs font-medium">
                      From: {message.sender}
                    </span>
                    <span className="text-pink-400 text-xs">
                      {new Date(message.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {messages.length === 0 && !loading && (
        <div className="text-center py-12">
          <Music className="w-16 h-16 text-pink-300 mx-auto mb-4" />
          <p className="text-pink-600 text-lg font-medium">
            No public messages yet
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-hidden animate-slide-up">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-pink-400 to-pink-600 p-6 text-white relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-pink-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-center">
                <h2 className="text-xl font-bold mb-1">
                  {selectedMessage.songTitle}
                </h2>
                <p className="text-pink-100 text-sm">
                  {selectedMessage.artist}
                </p>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <img
                  src={selectedMessage.albumCover || "/placeholder.svg"}
                  alt="Album cover"
                  className="w-24 h-24 rounded-2xl object-cover shadow-lg mx-auto mb-4"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-pink-800 font-semibold mb-2">Message:</h3>
                  <p className="text-pink-700 leading-relaxed bg-pink-50 p-4 rounded-xl">
                    {selectedMessage.message}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-pink-200">
                  <div>
                    <p className="text-pink-600 font-medium">
                      From: {selectedMessage.sender}
                    </p>
                    <p className="text-pink-500 text-sm">
                      {new Date(selectedMessage.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-pink-500">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">Public</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
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
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

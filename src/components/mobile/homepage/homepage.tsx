"use client"

import {
  Heart,
  Gift,
  Music,
  Sparkles,
  Lock,
  Globe,
  X,
  RefreshCw,
  Play,
  Pause,
  Eye,
  CheckIcon as EyeCheck,
} from "lucide-react"
import { useHomepage } from "../../../hooks/useHomepage"

export default function HomepageMobile() {
  const {
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
    togglePlay,
    markMessageAsRead,
    markAllAsRead,
  } = useHomepage()

  const handleMessageClick = async (message: any) => {
    if (message.isNew) {
      await markMessageAsRead(message.id)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-pink-200 p-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-6 text-pink-300 animate-pulse">
        <Heart className="w-6 h-6" />
      </div>
      <div className="absolute top-20 right-8 text-pink-400 animate-bounce">
        <Sparkles className="w-5 h-5" />
      </div>
      <div className="absolute bottom-32 left-4 text-pink-300 animate-pulse">
        <Music className="w-4 h-4" />
      </div>

      <div className="flex flex-col justify-center min-h-screen py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
              Musical Love Box
            </h1>
            <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
          </div>
          <p className="text-pink-600 text-lg font-medium">Your special messages await! 💕</p>
        </div>

        {/* Refresh Button */}
        <div className="text-center mb-4">
          <button
            onClick={refreshMessages}
            disabled={loading}
            className="bg-white/80 backdrop-blur-sm text-pink-600 px-6 py-3 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center gap-2 mx-auto"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Refreshing..." : "Refresh Messages"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-600 px-4 py-3 rounded-2xl mb-6 mx-4 text-center">
            {error}
          </div>
        )}

        {/* Gift Box */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Notification Badge - Show new messages count */}
            {notification.newMessages > 0 && !isGiftOpened && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg animate-bounce z-10">
                {notification.newMessages}
              </div>
            )}

            {/* Total messages badge */}
            {notification.totalMessages > 0 && !isGiftOpened && (
              <div className="absolute -top-2 -left-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg z-10">
                {notification.totalMessages}
              </div>
            )}

            {/* Gift Box */}
            <div
              onClick={openGift}
              className={`relative cursor-pointer transition-all duration-800 transform ${
                isGiftOpened ? "scale-110" : "hover:scale-105"
              }`}
            >
              {/* Gift Box Base */}
              <div
                className={`w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl shadow-2xl transition-all duration-800 ${
                  isGiftOpened ? "animate-pulse" : ""
                }`}
              >
                {/* Gift Box Lid */}
                <div
                  className={`absolute -top-2 left-0 w-full h-8 bg-gradient-to-br from-pink-500 to-pink-700 rounded-t-2xl transition-all duration-800 transform-gpu ${
                    isGiftOpened ? "-translate-y-6 rotate-12 opacity-80" : ""
                  }`}
                />

                {/* Ribbon Vertical */}
                <div
                  className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-full bg-gradient-to-b from-yellow-300 to-yellow-500 transition-all duration-800 ${
                    isGiftOpened ? "opacity-30 scale-x-150" : ""
                  }`}
                />

                {/* Ribbon Horizontal */}
                <div
                  className={`absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-4 bg-gradient-to-r from-yellow-300 to-yellow-500 transition-all duration-800 ${
                    isGiftOpened ? "opacity-30 scale-y-150" : ""
                  }`}
                />

                {/* Bow */}
                <div
                  className={`absolute -top-4 left-1/2 transform -translate-x-1/2 transition-all duration-800 ${
                    isGiftOpened ? "-translate-y-4 rotate-45 opacity-60" : ""
                  }`}
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full" />
                  <div className="absolute -left-2 top-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full" />
                  <div className="absolute -right-2 top-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full" />
                </div>

                {/* Gift Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Gift className="w-12 h-12 text-white drop-shadow-lg" />
                </div>

                {/* Sparkle Effects */}
                {isGiftOpened && (
                  <>
                    <div className="absolute -top-8 -left-4 text-yellow-400 animate-ping">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="absolute -top-6 -right-6 text-pink-400 animate-ping animation-delay-200">
                      <Sparkles className="w-3 h-3" />
                    </div>
                    <div className="absolute -bottom-4 -left-6 text-yellow-300 animate-ping animation-delay-400">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Gift Status */}
        <div className="text-center mb-8">
          {!isGiftOpened ? (
            <div className="space-y-2">
              <p className="text-pink-700 font-semibold text-lg">
                {notification.totalMessages} love messages waiting! 💌
              </p>
              {notification.newMessages > 0 && (
                <p className="text-red-600 font-bold text-sm animate-pulse">
                  🔥 {notification.newMessages} NEW messages!
                </p>
              )}
              <p className="text-pink-600 text-sm">Tap the gift to open your musical surprises ✨</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-pink-700 font-semibold text-lg animate-pulse">Opening your love box... 💕</p>
              <p className="text-pink-600 text-sm">Get ready for something magical! ✨</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
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

              {/* Mark All as Read Button */}
              {notification.newMessages > 0 && (
                <button
                  onClick={markAllAsRead}
                  disabled={loading}
                  className="absolute top-4 left-4 bg-white/20 text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-white/30 transition-colors disabled:opacity-50 flex items-center gap-1"
                >
                  <EyeCheck className="w-3 h-3" />
                  Mark All Read
                </button>
              )}

              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Your Love Messages 💕</h2>
                <p className="text-pink-100">
                  {messages.length} beautiful songs just for you!
                  {notification.newMessages > 0 && (
                    <span className="block text-yellow-200 font-semibold mt-1">
                      ✨ {notification.newMessages} new messages!
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Messages List with Privacy Controls */}
            <div className="p-4 max-h-[calc(80vh-120px)] overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    onClick={() => handleMessageClick(message)}
                    className={`bg-gradient-to-r rounded-2xl p-4 border-2 animate-fade-in relative cursor-pointer transition-all duration-200 ${
                      message.isNew
                        ? "from-red-50 to-pink-50 border-red-300 shadow-lg ring-2 ring-red-200"
                        : "from-pink-50 to-orange-50 border-pink-200"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* New Message Indicator */}
                    {message.isNew && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
                        NEW
                      </div>
                    )}

                    {/* Play Button - Top Right Corner */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        togglePlay(message)
                      }}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                        currentlyPlaying === message.id
                          ? "bg-pink-500 text-white"
                          : "bg-white text-pink-500 hover:bg-pink-50"
                      }`}
                    >
                      {currentlyPlaying === message.id ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>

                    <div className="flex items-start gap-3 mb-3 pr-10">
                      <img
                        src={message.albumCover || "/placeholder.svg"}
                        alt="Album"
                        className="w-12 h-12 rounded-xl object-cover shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-bold text-sm truncate ${message.isNew ? "text-red-800" : "text-pink-800"}`}
                        >
                          {message.songTitle}
                        </h3>
                        <p className={`text-xs mb-2 ${message.isNew ? "text-red-600" : "text-pink-600"}`}>
                          {message.artist}
                        </p>
                        <p className={`text-sm leading-relaxed ${message.isNew ? "text-red-700" : "text-pink-700"}`}>
                          {message.message}
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar - Only show when playing */}
                    {currentlyPlaying === message.id && (
                      <div className="flex items-center gap-2 mb-3 px-1">
                        <div className="flex-1 bg-pink-200 h-1 rounded-full">
                          <div
                            className="bg-pink-500 h-full rounded-full transition-all duration-100"
                            style={{ width: `${progress[message.id] || 0}%` }}
                          />
                        </div>
                        <span className="text-xs text-pink-600 min-w-[35px]">
                          {timeRemaining[message.id] || "-0:30"}
                        </span>
                      </div>
                    )}

                    {/* Compact Privacy Buttons */}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleMessagePrivacy(message.id, false)
                        }}
                        disabled={loading || !message.isPublic}
                        className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1 ${
                          !message.isPublic
                            ? "bg-pink-500 text-white"
                            : "bg-gray-200 text-gray-600 hover:bg-pink-200 hover:text-pink-700"
                        } disabled:opacity-50`}
                      >
                        <Lock className="w-3 h-3" />
                        Private
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleMessagePrivacy(message.id, true)
                        }}
                        disabled={loading || message.isPublic}
                        className={`flex-1 py-1.5 px-2 rounded-md text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1 ${
                          message.isPublic
                            ? "bg-orange-500 text-white"
                            : "bg-gray-200 text-gray-600 hover:bg-orange-200 hover:text-orange-700"
                        } disabled:opacity-50`}
                      >
                        <Globe className="w-3 h-3" />
                        Public
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-xs font-medium ${message.isNew ? "text-red-500" : "text-pink-500"}`}>
                        From: {message.sender}
                      </span>
                      <div className="flex items-center gap-2">
                        {message.isNew && <Eye className="w-3 h-3 text-red-400" />}
                        <span className={`text-xs ${message.isNew ? "text-red-400" : "text-pink-400"}`}>
                          {message.date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  )
}

"use client"

import { Heart, Gift, Music, Sparkles, Lock, Globe, X, Star, RefreshCw } from 'lucide-react'
import { useHomepage } from '../../../hooks/useHomepage'

export default function HomepageDesktop() {
  const {
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
  } = useHomepage()

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
      <div className="absolute top-1/2 left-10 text-pink-200 animate-pulse">
        <Heart className="w-6 h-6" />
      </div>
      <div className="absolute top-1/3 right-16 text-pink-300 animate-bounce">
        <Star className="w-7 h-7" />
      </div>

      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Heart className="w-12 h-12 text-pink-500 animate-pulse" />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
                Musical Love Box
              </h1>
              <Heart className="w-12 h-12 text-pink-500 animate-pulse" />
            </div>
            <p className="text-2xl text-pink-600 font-medium mb-4">Your special messages await! 💕</p>
            <p className="text-lg text-pink-500">Click the magical gift to reveal your love songs ✨</p>
          </div>

          {/* Refresh Button */}
          <div className="text-center mb-8">
            <button
              onClick={refreshMessages}
              disabled={loading}
              className="bg-white/80 backdrop-blur-sm text-pink-600 px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 flex items-center gap-3 mx-auto"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Refreshing Messages...' : 'Refresh Messages'}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-600 px-6 py-4 rounded-2xl mb-8 text-center max-w-md mx-auto">
              {error}
            </div>
          )}

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Left Side - Stats */}
            <div className="text-center lg:text-left space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
                <h3 className="text-2xl font-bold text-pink-800 mb-6">Love Statistics 💖</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
                      <Music className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-pink-800">{notification.totalMessages}</p>
                      <p className="text-pink-600">Love Messages</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                      <Heart className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-pink-800">{notification.unreadMessages}</p>
                      <p className="text-pink-600">New Messages</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-pink-800">
                        {notification.lastMessageDate
                          ? new Date(notification.lastMessageDate).toLocaleDateString()
                          : "N/A"}
                      </p>
                      <p className="text-pink-600">Last Message</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center - Gift Box */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Notification Badge */}
                {notification.totalMessages > 0 && !isGiftOpened && (
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold shadow-xl animate-bounce z-10">
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
                    className={`w-48 h-48 bg-gradient-to-br from-pink-400 to-pink-600 rounded-3xl shadow-2xl transition-all duration-800 ${
                      isGiftOpened ? "animate-pulse" : ""
                    }`}
                  >
                    {/* Gift Box Lid */}
                    <div
                      className={`absolute -top-4 left-0 w-full h-12 bg-gradient-to-br from-pink-500 to-pink-700 rounded-t-3xl transition-all duration-800 transform-gpu ${
                        isGiftOpened ? "-translate-y-12 rotate-12 opacity-80" : ""
                      }`}
                    />

                    {/* Ribbon Vertical */}
                    <div
                      className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-full bg-gradient-to-b from-yellow-300 to-yellow-500 transition-all duration-800 ${
                        isGiftOpened ? "opacity-30 scale-x-150" : ""
                      }`}
                    />

                    {/* Ribbon Horizontal */}
                    <div
                      className={`absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-6 bg-gradient-to-r from-yellow-300 to-yellow-500 transition-all duration-800 ${
                        isGiftOpened ? "opacity-30 scale-y-150" : ""
                      }`}
                    />

                    {/* Bow */}
                    <div
                      className={`absolute -top-8 left-1/2 transform -translate-x-1/2 transition-all duration-800 ${
                        isGiftOpened ? "-translate-y-8 rotate-45 opacity-60" : ""
                      }`}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full" />
                      <div className="absolute -left-4 top-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full" />
                      <div className="absolute -right-4 top-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full" />
                    </div>

                    {/* Gift Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Gift className="w-20 h-20 text-white drop-shadow-lg" />
                    </div>

                    {/* Sparkle Effects */}
                    {isGiftOpened && (
                      <>
                        <div className="absolute -top-12 -left-8 text-yellow-400 animate-ping">
                          <Sparkles className="w-6 h-6" />
                        </div>
                        <div className="absolute -top-8 -right-12 text-pink-400 animate-ping animation-delay-200">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="absolute -bottom-8 -left-12 text-yellow-300 animate-ping animation-delay-400">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="absolute -bottom-12 -right-8 text-pink-300 animate-ping animation-delay-600">
                          <Sparkles className="w-4 h-4" />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Instructions */}
            <div className="text-center lg:text-right space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-pink-200">
                <h3 className="text-2xl font-bold text-pink-800 mb-6">How it Works ✨</h3>
                <div className="space-y-4 text-left">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center text-pink-600 font-bold">
                      1
                    </div>
                    <p className="text-pink-700">Click the magical gift box</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center text-pink-600 font-bold">
                      2
                    </div>
                    <p className="text-pink-700">View your love messages</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center text-pink-600 font-bold">
                      3
                    </div>
                    <p className="text-pink-700">Choose privacy settings</p>
                  </div>
                </div>
              </div>

              {!isGiftOpened ? (
                <div className="bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-3xl p-6 shadow-xl">
                  <p className="text-xl font-bold mb-2">{notification.totalMessages} love messages waiting! 💌</p>
                  <p className="text-pink-100">Click to unwrap your musical surprises</p>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-3xl p-6 shadow-xl animate-pulse">
                  <p className="text-xl font-bold mb-2">Opening your love box... 💕</p>
                  <p className="text-pink-100">Get ready for something magical!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-modal-appear shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-pink-400 to-pink-600 p-8 text-white relative">
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 text-white hover:text-pink-200 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">Your Love Messages 💕</h2>
                <p className="text-xl text-pink-100">{messages.length} beautiful songs just for you!</p>
              </div>
            </div>

            {/* Messages Grid */}
            <div className="p-8 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-2xl p-6 border border-pink-200 animate-fade-in hover:shadow-lg transition-all duration-200"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={message.albumCover || "/placeholder.svg"}
                        alt="Album"
                        className="w-16 h-16 rounded-xl object-cover shadow-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-pink-800 text-lg truncate">{message.songTitle}</h3>
                        <p className="text-pink-600 text-sm mb-3">{message.artist}</p>
                        <p className="text-pink-700 leading-relaxed mb-3">{message.message}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-pink-500 text-sm font-medium">From: {message.sender}</span>
                          <span className="text-pink-400 text-sm">{message.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons - Per Message */}
            <div className="p-8 bg-pink-50 border-t border-pink-200">
              <h3 className="text-2xl font-bold text-pink-800 text-center mb-6">Choose privacy for each message:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-80 overflow-y-auto">
                {messages.map((message) => (
                  <div key={message.id} className="bg-white rounded-2xl p-4 border border-pink-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={message.albumCover || "/placeholder.svg"}
                        alt="Album"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-pink-800 font-semibold truncate">{message.songTitle}</p>
                        <p className="text-pink-600 text-sm truncate">From: {message.sender}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => toggleMessagePrivacy(message.id, false)}
                        disabled={loading || !message.isPublic}
                        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                          !message.isPublic 
                            ? 'bg-pink-500 text-white shadow-lg' 
                            : 'bg-gray-200 text-gray-600 hover:bg-pink-200 hover:text-pink-700'
                        } disabled:opacity-50`}
                      >
                        <Lock className="w-4 h-4" />
                        Private
                      </button>
                      <button
                        onClick={() => toggleMessagePrivacy(message.id, true)}
                        disabled={loading || message.isPublic}
                        className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                          message.isPublic 
                            ? 'bg-orange-500 text-white shadow-lg' 
                            : 'bg-gray-200 text-gray-600 hover:bg-orange-200 hover:text-orange-700'
                        } disabled:opacity-50`}
                      >
                        <Globe className="w-4 h-4" />
                        Public
                      </button>
                    </div>
                  </div>
                ))}
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
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
      `}</style>
    </div>
  )
}

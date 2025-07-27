"use client"

import { Heart, Sparkles } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

export default function NavbarDesktop() {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    {
      id: "homepage",
      label: "Homepage",
      path: "/homepage",
      color: "pink",
    },
    {
      id: "private",
      label: "Private Messages",
      path: "/private-messages",
      color: "purple",
    },
    {
      id: "public",
      label: "Public Messages",
      path: "/public-messages",
      color: "orange",
    },
    {
      id: "profile",
      label: "Profile",
      path: "/profile",
      color: "pink",
    },
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const getActiveStyles = (item: any, isActiveItem: boolean) => {
    const baseStyles =
      "px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform relative overflow-hidden"

    if (isActiveItem) {
      const colorMap = {
        pink: "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-xl scale-105",
        purple: "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-xl scale-105",
        orange: "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl scale-105",
      }
      return `${baseStyles} ${colorMap[item.color as keyof typeof colorMap]}`
    }

    return `${baseStyles} text-pink-600 hover:text-pink-800 hover:bg-pink-100 hover:scale-105 hover:shadow-lg`
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-pink-200 shadow-xl">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
                MusicalLoveBox
              </h1>
              <Sparkles className="w-6 h-6 text-pink-400 animate-bounce" />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const isActiveItem = isActive(item.path)

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={getActiveStyles(item, isActiveItem)}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Active background animation */}
                  {isActiveItem && (
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20 animate-pulse" />
                  )}

                  {/* Hover shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              )
            })}
          </div>

          {/* User Info (Optional) */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <Heart className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400" />
    </nav>
  )
}

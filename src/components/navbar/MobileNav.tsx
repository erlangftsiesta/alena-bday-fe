"use client"

import { Home, Lock, Globe, User } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

export default function NavbarMobile() {
  const location = useLocation()
  const navigate = useNavigate()

  const navItems = [
    {
      id: "homepage",
      label: "Home",
      icon: Home,
      path: "/homepage",
      color: "pink",
    },
    {
      id: "private",
      label: "Private",
      icon: Lock,
      path: "/private-messages",
      color: "purple",
    },
    {
      id: "public",
      label: "Public",
      icon: Globe,
      path: "/public-messages",
      color: "orange",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
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
    const baseStyles = "flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 transform"

    if (isActiveItem) {
      const colorMap = {
        pink: "bg-gradient-to-t from-pink-500 to-pink-400 text-white shadow-lg scale-110",
        purple: "bg-gradient-to-t from-purple-500 to-purple-400 text-white shadow-lg scale-110",
        orange: "bg-gradient-to-t from-orange-500 to-orange-400 text-white shadow-lg scale-110",
      }
      return `${baseStyles} ${colorMap[item.color as keyof typeof colorMap]}`
    }

    return `${baseStyles} text-pink-400 hover:text-pink-600 hover:bg-pink-50 hover:scale-105`
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-pink-200 shadow-2xl">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActiveItem = isActive(item.path)

          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.path)}
              className={getActiveStyles(item, isActiveItem)}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 mb-1 transition-all duration-300 ${isActiveItem ? "animate-pulse" : ""}`} />

                {/* Active indicator dot */}
                {isActiveItem && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                )}
              </div>

              <span
                className={`text-xs font-medium transition-all duration-300 ${
                  isActiveItem ? "font-bold" : "font-normal"
                }`}
              >
                {item.label}
              </span>

              {/* Active underline */}
              {isActiveItem && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-yellow-400 rounded-full animate-pulse" />
              )}
            </button>
          )
        })}
      </div>

      {/* Decorative bottom line */}
      <div className="h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-orange-400" />
    </div>
  )
}

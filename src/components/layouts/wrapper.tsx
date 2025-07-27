"use client"

import type { ReactNode } from "react"
import Navbar from "../navbar/Navbar"
import { useMobile } from "../../hooks/useWhatDeviceIs"
import { useAuth } from "../../hooks/useAuth"

interface PageWrapperProps {
  children: ReactNode
}

interface PageWrapperProps {
  children: ReactNode
  showNavbarForGuests?: boolean // Optional prop to override default behavior
}

export default function PageWrapper({ children, showNavbarForGuests = false }: PageWrapperProps) {
  const isMobile = useMobile()
  const { isAuthenticated } = useAuth()

  // Show navbar if user is authenticated OR if explicitly requested for guests
  const shouldShowNavbar = isAuthenticated || showNavbarForGuests

  return (
    <div className="min-h-screen">
      {shouldShowNavbar && <Navbar />}

      {/* Content with proper spacing - only add padding if navbar is shown */}
      <main
        className={`${
          shouldShowNavbar
            ? isMobile
              ? "pb-20" // Bottom padding for mobile navbar
              : "pt-20" // Top padding for desktop navbar
            : "" // No padding if no navbar
        }`}
      >
        {children}
      </main>
    </div>
  )
}


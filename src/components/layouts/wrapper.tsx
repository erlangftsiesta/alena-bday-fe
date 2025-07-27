"use client"

import type { ReactNode } from "react"
import Navbar from "../navbar/Navbar"
import { useMobile } from "../../hooks/useWhatDeviceIs"

interface PageWrapperProps {
  children: ReactNode
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const isMobile = useMobile()

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Content with proper spacing */}
      <main
        className={`${
          isMobile
            ? "pb-20" // Bottom padding for mobile navbar
            : "pt-20" // Top padding for desktop navbar
        }`}
      >
        {children}
      </main>
    </div>
  )
}

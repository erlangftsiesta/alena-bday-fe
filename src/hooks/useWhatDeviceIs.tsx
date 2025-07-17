"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const isMobileDevice = /android|iphone|ipad|ipod|windows phone/i.test(userAgent)
      setIsMobile(isMobileDevice)
    }

    checkDevice()
  }, [])

  return isMobile
}

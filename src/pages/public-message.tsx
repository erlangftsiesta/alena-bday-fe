"use client"

import { useMobile } from "../hooks/useWhatDeviceIs"
import PublicMessagesMobile from "../components/mobile/public/public-message"
import PublicMessagesDesktop from "../components/desktop/public/public-message"

export default function PublicMessagesPage() {
  const isMobile = useMobile()

  return isMobile ? <PublicMessagesMobile /> : <PublicMessagesDesktop />
}

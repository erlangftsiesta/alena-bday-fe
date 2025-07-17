"use client"

import { useMobile } from "../hooks/useWhatDeviceIs"
import PrivateMessagesMobile from "../components/mobile/private/private-message"
import PrivateMessagesDesktop from "../components/desktop/private/private-message"

export default function PrivateMessagesPage() {
  const isMobile = useMobile()

  return isMobile ? <PrivateMessagesMobile /> : <PrivateMessagesDesktop />
}

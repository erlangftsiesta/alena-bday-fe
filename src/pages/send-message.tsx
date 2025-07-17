"use client"

import { useMobile } from "../hooks/useWhatDeviceIs"
import SendMessageMobile from "../components/mobile/send-message/send-mess-mobi"
import SendMessageDesktop from "../components/desktop/send-message/send-mess-desk"

export default function SendMessagePage() {
  const isMobile = useMobile()

  return isMobile ? <SendMessageMobile /> : <SendMessageDesktop />
}

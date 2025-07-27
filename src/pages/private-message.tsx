"use client"

import { useMobile } from "../hooks/useWhatDeviceIs"
import PrivateMessagesMobile from "../components/mobile/private/private-message"
import PrivateMessagesDesktop from "../components/desktop/private/private-message"
import PageWrapper from "../components/layouts/wrapper"

export default function PrivateMessagesPage() {
  const isMobile = useMobile()

  return (
    <PageWrapper>
      {isMobile ? <PrivateMessagesMobile /> : <PrivateMessagesDesktop />}
    </PageWrapper>
  )
}

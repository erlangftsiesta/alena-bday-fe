"use client"

import { useMobile } from "../hooks/useWhatDeviceIs"
import ProfileMobile from "../components/mobile/profile/profile-mobile"
import ProfileDesktop from "../components/desktop/profile/profile-desktop"
import PageWrapper from "../components/layouts/wrapper"

export default function ProfilePage() {
  const isMobile = useMobile()

  return (
    <PageWrapper>
      {isMobile ? <ProfileMobile /> : <ProfileDesktop />}
    </PageWrapper>
  )
}

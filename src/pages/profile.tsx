"use client"

import { useMobile } from "../hooks/useWhatDeviceIs"
import ProfileMobile from "../components/mobile/profile/profile-mobile"
import ProfileDesktop from "../components/desktop/profile/profile-desktop"

export default function ProfilePage() {
  const isMobile = useMobile()

  return isMobile ? <ProfileMobile /> : <ProfileDesktop />
}

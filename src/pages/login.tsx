"use client"

import { useMobile } from "../hooks/useWhatDeviceIs"
import LoginMobile from "../components/mobile/login/login"
import LoginDesktop from "../components/desktop/login/login"

export default function LoginPage() {
  const isMobile = useMobile()

  return isMobile ? <LoginMobile /> : <LoginDesktop />
}

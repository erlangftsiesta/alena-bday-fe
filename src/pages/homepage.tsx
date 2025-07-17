"use client"

import { useMobile } from "../hooks/useWhatDeviceIs"
import HomepageMobile from "../components/mobile/homepage/homepage"
import HomepageDesktop from "../components/desktop/homepage/homepage"

export default function Homepage() {
  const isMobile = useMobile()

  return isMobile ? <HomepageMobile /> : <HomepageDesktop />
}

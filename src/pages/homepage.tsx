"use client"

import { useMobile } from "../hooks/useWhatDeviceIs"
import HomepageMobile from "../components/mobile/homepage/homepage"
import HomepageDesktop from "../components/desktop/homepage/homepage"
import PageWrapper from "../components/layouts/wrapper"


export default function Homepage() {
  const isMobile = useMobile()

  return(
    <PageWrapper>
      {isMobile ? <HomepageMobile /> : <HomepageDesktop />}
    </PageWrapper>
  )
}

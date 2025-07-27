"use client"

import { useMobile } from "../../hooks/useWhatDeviceIs";
import NavbarMobile from "./MobileNav";
import NavbarDesktop from "./DesktopNav";

export default function Navbar() {
  const isMobile = useMobile()

  return isMobile ? <NavbarMobile /> : <NavbarDesktop />
}

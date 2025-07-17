import { BrowserRouter, Routes, Route } from "react-router-dom"
import SendMessagePage from "./pages/send-message"
import ProfilePage from "./pages/profile"
import LoginPage from "./pages/login"
import Homepage from "./pages/homepage"
import PublicMessagesPage from "./pages/public-message"
import PrivateMessagesPage from "./pages/private-message"


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/send-message" element={<SendMessagePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/public-message" element={<PublicMessagesPage />} />
        <Route path="/private-message" element={<PrivateMessagesPage />} />

        {/* 404 Fallback */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

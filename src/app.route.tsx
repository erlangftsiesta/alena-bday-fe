import { BrowserRouter, Routes, Route } from "react-router-dom";
import SendMessagePage from "./pages/send-message";
import ProfilePage from "./pages/profile";
import LoginPage from "./pages/login";
import Homepage from "./pages/homepage";
import PublicMessagesPage from "./pages/public-message";
import PrivateMessagesPage from "./pages/private-message";
import {ProtectedRoute, RootRedirect} from "./helper/protectedRoutes"; // ✅ import ini

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} /> {/* ✅ updated */}
        <Route path="/send-message" element={<SendMessagePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/homepage"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/public-messages" element={<PublicMessagesPage />} />
        <Route
          path="/private-messages"
          element={
            <ProtectedRoute>
              <PrivateMessagesPage />
            </ProtectedRoute>
          }
        />

        {/* Optional: 404 */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

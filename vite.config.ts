import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "Alena Birthday App",
        short_name: "Alena Bday PWA",
        description:
          "A Progressive Web App for My Hunni Bunny Sweetie (Alena's) Birthday",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/alena_pwa_192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/alena_pwa_512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://ideavault-mern-full-stack-notes-app.onrender.com",
        secure: false,
        changeOrigin: true, // Add this line
      },
    },
  },
});

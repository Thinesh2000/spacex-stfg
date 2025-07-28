import { defineConfig } from "vite";

// region: plugins
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// region: config
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    strictPort: true, // restrict executing multiple instance on the same port
    headers: {
      "Strict-Transport-Security": "max-age=86400; includeSubDomains; preload", // Adds HSTS options to website, with a expiry time of 1 day
      "X-Content-Type-Options": "nosniff", // Protects from improper scripts runnings
      "X-Frame-Options": "DENY", // Stops site from being used as an iframe
      "X-XSS-Protection": "1; mode=block", // Gives XSS protection to legacy browsers
      "Content-Security-Policy": "frame-ancestors 'self'; upgrade-insecure-requests",
      // "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://hv-camera-web-sg.s3-ap-southeast-1.amazonaws.com; script-src 'self' 'sha256-8ZgGo/nOlaDknQkDUYiedLuFRSGJwIz6LAzsOrNxhmU=' https://app.digio.in https://hv-camera-web-sg.s3-ap-southeast-1.amazonaws.com https://sdk.amazonaws.com; img-src 'self' https://hv-camera-web-sg.s3-ap-southeast-1.amazonaws.com; font-src 'self' https://hv-camera-web-sg.s3-ap-southeast-1.amazonaws.com; connect-src 'self' https://hv-camera-web-sg.s3-ap-southeast-1.amazonaws.com http://localhost:8000; upgrade-insecure-requests; frame-ancestors 'self'",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Block the site from being embedded in iframes (clickjacking).
          { key: "X-Frame-Options", value: "DENY" },
          // Stop browsers from MIME-sniffing responses.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Don't leak full URLs to other origins.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // This site never needs these browser capabilities.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;

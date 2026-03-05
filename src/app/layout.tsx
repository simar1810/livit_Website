import SiteShell from "@/components/SiteShell";
import { AuthProvider } from "@/contexts/AuthContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nature Fit",
  description:
    "Nature Fit – nature-driven, balanced meal plans for everyday wellness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Use original site styles directly from livit.ae */}
        <link
          rel="stylesheet"
          href="https://livit.ae/WebAssets/css/bootstrap.css"
        />
        <link
          rel="stylesheet"
          href="https://livit.ae/WebAssets/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://livit.ae/WebAssets/css/style.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
        <link
          rel="stylesheet"
          href="https://livit.ae/assets/Loader/LoaderCSS.css"
        />
      </head>
      <body>
        <AuthProvider>
          <SiteShell>{children}</SiteShell>
        </AuthProvider>
      </body>
    </html>
  );
}


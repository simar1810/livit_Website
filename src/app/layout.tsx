import SiteShell from "@/components/SiteShell";
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
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}


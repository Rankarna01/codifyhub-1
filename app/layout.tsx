import type { Metadata } from "next";
import FloatingWA from "@/components/ui/FloatingWA";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodifyHub | Custom Web, Mobile Apps & AI Systems Development",
  description: "CodifyHub is a premier software engineering agency specializing in custom web applications, mobile apps, enterprise software, AI integrations, live chatbots, and full-stack solutions.",
  keywords: [
    "custom web app development",
    "mobile app development",
    "AI integration agency",
    "custom software development",
    "AI chatbot integration",
    "SaaS development company",
    "Next.js developer",
    "full-stack software solutions"
  ],
  icons: {
    icon: '/images/logo.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased flex flex-col">
        {children}
        <FloatingWA />
      </body>
    </html>
  );
}

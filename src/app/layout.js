import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    default: "OOA Foundation - JAMB Registration & Education Support Nigeria",
    template: "%s | OOA Foundation",
  },
  description:
    "OOA Foundation provides free JAMB registration support, educational scholarships, and mentorship programs for Nigerian students. Empowering youth through quality education and career guidance.",
  keywords: [
    "JAMB registration Nigeria",
    "education foundation",
    "scholarship for students",
    "JAMB sponsorship",
    "educational support Nigeria",
    "student mentorship",
    "free JAMB registration",
    "OOA Foundation",
  ],
  authors: [{ name: "OOA Foundation" }],
  creator: "OOA Foundation",
  publisher: "OOA Foundation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // metadataBase: new URL("https://www.ooafoundation.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    // url: "https://www.ooafoundation.org",
    siteName: "OOA Foundation",
    title: "OOA Foundation - Empowering Students Through Education",
    description:
      "Supporting Nigerian students with JAMB registration, scholarships, and educational programs. Join us in making education accessible to all.",
  },
  twitter: {
    card: "summary_large_image",
    title: "OOA Foundation - Education Support Nigeria",
    description:
      "Empowering Nigerian students through JAMB registration and educational support",
    // creator: "@ooafoundation", // Add your Twitter handle if you have one
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <head>
        <link rel="canonical" href="https://www.ooafoundation.org" />
      </head> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "OOA Foundation",
//   description:
//     "Empowering students through JAMB registration and educational support",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }

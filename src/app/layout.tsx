import type { Metadata } from "next";
import { ThemeProvider } from '@/components/ThemeProvider';
import "./globals.css";
import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/context/UserContext";




export const metadata: Metadata = {
  title: "Università degli Studi di Padova",
  description: "WebApp per attività laboratoriali di OpenDay",
};


// Ho preso spunto dal sito womenincs per i colori e la struttura visto che comunque sarà qualcosa di "istituzionale", tutto è modificabile ovviamente
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <html lang="en" suppressHydrationWarning className="scroll-smooth">
        <head />
        <body>
          {/* Skip Link */}
          <a
            href="#main-content"
            tabIndex={0}
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:outline-2 focus:outline-blue-500 focus:rounded"
          >
            Vai al contenuto
          </a>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UserProvider>
              <div className="md:hidden block">
                <Header />
              </div>
              <Navbar />
              <main tabIndex={-1}>
                {children}
              </main>
              <BackToTop />
              <Footer />
            </UserProvider>
          </ThemeProvider>

        </body>
      </html>
    </>
  )
}



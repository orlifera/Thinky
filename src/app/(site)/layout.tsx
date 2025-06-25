import { ThemeProvider } from '@/components/ThemeProvider';
import Header from "@/components/Header";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/context/UserContext";
import "@/app/globals.css"

// Ho preso spunto dal sito womenincs per i colori e la struttura visto che comunque sarà qualcosa di "istituzionale", tutto è modificabile ovviamente
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
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
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
          <BackToTop />
          <Footer />
        </UserProvider>
      </ThemeProvider>

    </>
  )
}



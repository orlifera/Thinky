import { ThemeProvider } from '@/components/ThemeProvider';
import LabNavbar from "./components/LabNavbar";
import { UserProvider } from "@/context/UserContext";
import Footer from "@/components/Footer";
import "@/app/globals.css";


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
                    <LabNavbar />
                    <div id="main-content" tabIndex={-1}>
                        {children}
                    </div>
                    <Footer />
                </UserProvider>
            </ThemeProvider>

        </>
    )
}



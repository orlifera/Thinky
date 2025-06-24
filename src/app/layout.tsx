import React from "react"
import "@/app/globals.css"

// Ho preso spunto dal sito womenincs per i colori e la struttura visto che comunque sarà qualcosa di "istituzionale", tutto è modificabile ovviamente
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en" suppressHydrationWarning className="scroll-smooth">
            <head />
            <body>
                <main id="main-content" tabIndex={-1}>
                    {children}
                </main>
            </body>
        </html>
    )
}



'use client' // Error boundaries must be Client Components
import { AlertCircle } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"


export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <html>
            <body className="h-screen flex flex-col bg-white items-center justify-center">
                <div className="flex flex-col items-center">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            C&apos;è stato un errore, per favore prova di nuovo.
                        </AlertDescription>
                    </Alert>
                    <Button onClick={() => reset()} className="mt-4 items-center">
                        Prova di nuovo
                    </Button>
                </div>
                <div className="mt-4">
                    More info:
                    {error.name}
                    {error.digest}
                </div>
            </body>
        </html>
    )
}
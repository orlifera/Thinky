'use client'
import { AlertCircle } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"


export default function GlobalError({
    error,
}: {
    error: Error & { name?: string, message?: string, digest?: string }
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
                    <Button onClick={() => window.location.reload()} className="mt-4 items-center">
                        Prova di nuovo
                    </Button>
                </div>
                <div className="mt-4">
                    More info:
                    <ul>
                        <li>{error.name}</li>
                        <li> {error.digest}</li>
                        <li>{error.message}</li>
                    </ul>
                </div>
            </body>
        </html>
    )
}
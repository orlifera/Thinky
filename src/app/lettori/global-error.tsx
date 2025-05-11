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
        // global-error must include html and body tags
        <html>
            <body>
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                        C&apos;è stato un errore, per favore prova di nuovo.
                    </AlertDescription>
                </Alert>
                <Button onClick={() => reset()} className="mt-4">
                    Prova di nuovo
                </Button>
                <div className="mt-4">
                    More info:
                    {error.message}
                    {error.stack}
                    {error.name}
                    {error.digest}
                </div>
            </body>
        </html>
    )
}
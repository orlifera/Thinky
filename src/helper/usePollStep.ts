import { useEffect, useState } from "react"

export function usePollStep(fetchStep: () => Promise<number>, interval = 3000) {
    const [currentStep, setCurrentStep] = useState<number>(0)

    useEffect(() => {
        let alive = true
        let timeout: NodeJS.Timeout

        async function poll() {
            try {
                const step = await fetchStep()
                if (alive) setCurrentStep(step)
            } finally {
                if (alive) timeout = setTimeout(poll, interval)
            }
        }
        poll()
        return () => {
            alive = false
            clearTimeout(timeout)
        }
    }, [fetchStep, interval])

    return currentStep
}
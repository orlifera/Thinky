'use client'

import { useEffect, useState } from "react"
import { fetchStep } from "@/helper/gh"
import StepUpdateButton from "./StepUpdateButton"

export default function StepPage() {
    const [currentStep, setCurrentStep] = useState<number | null>(null)

    useEffect(() => {
        const loadStep = async () => {
            try {
                const step = await fetchStep()
                setCurrentStep(step)
            } catch (error) {
                console.error("Errore nel caricamento dello step:", error)
            }
        }

        loadStep()
    }, [])

    if (currentStep === null) {
        return <p>Caricamento...</p>
    }

    return <StepUpdateButton currentStep={currentStep} />
}

'use client'

import { Button } from "@/components/ui/button"
import { updateStep } from "@/helper/gh"
import { useState } from "react"

type Props = {
    currentStep: number
}

export default function StepUpdateButton({ currentStep }: Props) {
    const [step, setStep] = useState(currentStep)

    const handleAdvance = async () => {
        try {
            await updateStep(step + 1)
            setStep(prev => prev + 1)
        } catch (error) {
            console.error("Errore durante l'aggiornamento dello step:", error)
        }
    }

    const handleReset = async () => {
        try {
            await updateStep(0)
            setStep(0)
        } catch (error) {
            console.error("Errore durante il reset dello step:", error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">
            <p className="mb-4">
                <span className="font-bold">Step corrente:</span> {step}
            </p>
            <Button onClick={handleAdvance}>Avanza allo step {step + 1}</Button>
            <Button onClick={handleReset}>Resetta gli step</Button>
        </div>
    )
}

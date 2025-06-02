'use client'

import { Button } from "@/components/ui/button"
import { Step } from "@/types"
import { updateStep } from "@/helper/gh"
import { useState } from "react"

export default function StepUpdateButton({ currentStep, onStepChange }: Step & { onStepChange: (step: number) => void }) {
    const [step, setStep] = useState(currentStep)

    const handleAdvance = async () => {
        try {
            await updateStep(step + 1)
            setStep(prev => prev + 1)
            onStepChange(step + 1) // Optimistically update parent
        } catch (error) {
            console.error("Errore durante l'aggiornamento dello step:", error)
        }
    }

    const handleBack = async () => {
        try {
            await updateStep(step - 1)
            setStep(prev => prev - 1)
            onStepChange(step - 1) // Optimistically update parent
        }
        catch (error) {
            console.error("Errore durante il ritorno allo step precedente:", error)
        }
    }

    const handleReset = async () => {
        try {
            await updateStep(0)
            setStep(0)
            onStepChange(0) // Optimistically update parent
        } catch (error) {
            console.error("Errore durante il reset dello step:", error)
        }
    }

    const disabledAdvance = step >= 6; // Assuming 6 is the last step
    const disableBack = step <= 0; // Prevent going back below step 0
    const text = disabledAdvance ? "Ultimo step raggiunto" : `Avanza allo step ${step + 1}`;
    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">
            <p className="mb-4">
                <span className="font-bold">Step corrente:</span> {step}
            </p>
            <Button
                disabled={disabledAdvance}
                className={`${disabledAdvance ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                    }`}
                onClick={handleAdvance}
            >
                {text}
            </Button>
            <Button className="bg-red-500 hover:bg-red-600 text-white" disabled={disableBack} onClick={() => handleBack()}>
                Torna indietro allo step {step - 1}
            </Button>

            <Button onClick={handleReset}>Resetta gli step</Button>
        </div>
    )
}

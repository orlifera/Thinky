'use client'

import { Button } from "@/components/ui/button"
import { Step } from "@/types"
import { updateStep } from "@/helper/gh"
import { useState } from "react"

interface Props extends Step {
    onStepChange: (step: number) => void
}

export default function StepUpdateButton({ currentStep, onStepChange }: Props) {
    const [step, setStep] = useState(currentStep)
    const disabledAdvance = step >= 7;
    const disableBack = step <= 0;
    const text = disabledAdvance ? "Ultimo step raggiunto" : `Avanza allo step ${step + 1}`;

    const handleAdvance = async () => {
        try {
            await updateStep(step + 1);
            setStep(prev => prev + 1)
            onStepChange(step + 1)
        } catch (error) {
            console.error("Errore durante l'aggiornamento dello step:", error)
        }
    }
    const handleBack = async () => {
        try {
            await updateStep(step - 1)
            setStep(prev => prev - 1)
            onStepChange(step - 1)
        }
        catch (error) {
            console.error("Errore durante il ritorno allo step precedente:", error)
        }
    }

    const handleReset = async () => {
        try {
            await updateStep(0)
            setStep(0)
            onStepChange(0)
        } catch (error) {
            console.error("Errore durante il reset dello step:", error)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">
            <p className="m-4">
                <span className="font-bold">Step corrente:</span> {step}
            </p>
            <div className="flex flex-row gap-4 items-center">
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
        </div>
    )
}
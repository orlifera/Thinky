'use client'

import { Button } from "@/components/ui/button"
import { Step } from "@/types"
import { updateStep } from "@/helper/gh"
import { useState } from "react"



export default function StepUpdateButton({ currentStep }: Step) {

    const [step, setStep] = useState(currentStep)

    // const handleAdvance = () => {
    //     setStep(prev => prev + 1)
    //     localStorage.setItem("currentStep", (step + 1).toString())
    // }

    // const handleReset = () => {
    //     setStep(0)
    //     localStorage.setItem("currentStep", "0")
    // }

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

    const disabled = step >= 6; //diminuibile a 4 o 5 se troppo lungo. 
    const text = disabled ? "Ultimo step raggiunto" : `Avanza allo step ${step + 1}`;
    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">
            <p className="mb-4">
                <span className="font-bold">Step corrente:</span> {step}
            </p>
            <Button
                disabled={disabled}
                className={`${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                    }`}
                onClick={handleAdvance}
            >
                {text}
            </Button>

            <Button onClick={handleReset}>Resetta gli step</Button>
        </div>
    )
}

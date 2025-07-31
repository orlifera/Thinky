'use client'

import { Button } from "@/components/ui/button"
import { resetAllUsers } from "@/helper/User"
import { resetStats } from "@/helper/gh"

interface Props {
    currentStep: number
    onStepChange: (step: number) => Promise<void>
}

function resetStatsAndUsers() {
    resetAllUsers();
    resetStats();

}

export default function StepUpdateButton({ currentStep, onStepChange }: Props) {
    const disabledAdvance = currentStep >= 7
    const disableBack = currentStep <= 0
    const text = disabledAdvance
        ? "Ultimo step raggiunto"
        : `Avanza allo step ${currentStep + 1}`

    const handleAdvance = () => onStepChange(currentStep + 1)
    const handleBack = () => onStepChange(currentStep - 1)
    const handleReset = () => onStepChange(0)

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">
            <p className="m-4">
                <span className="font-bold">Step corrente:</span> {currentStep}
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
                <Button
                    className="cursor-pointer"
                    disabled={disableBack}
                    onClick={handleBack}
                >
                    Torna indietro allo step {currentStep - 1}
                </Button>
                <Button onClick={handleReset} className="cursor-pointer">Resetta gli step</Button>
                <Button onClick={() => { resetStatsAndUsers() }} className="cursor-pointer">Azzera le stats</Button>
            </div>
        </div>
    )
}
'use client'

import { useEffect, useState } from 'react'
import { fetchStep } from "@/helper/gh"
import StepZero from './components/steps/StepZero'
import StepOne from './components/steps/StepOne'
import StepTwo from './components/steps/StepTwo'
import StepThree from './components/steps/StepThree'

export default function Page() {
    const [currentStep, setCurrentStep] = useState<number | null>(null)

    useEffect(() => {
        const loadStep = async () => {
            try {
                const step = await fetchStep()
                setCurrentStep(step)
            } catch (error) {
                console.error("Failed to fetch step:", error)
            }
        }

        loadStep()

        // ✅ Poll for updates every 5 seconds
        const interval = setInterval(() => {
            fetchStep()
                .then(setCurrentStep)
                .catch(console.error)
        }, 5000)

        return () => clearInterval(interval)
    }, [])

    if (currentStep === null) {
        return <div>Loading...</div>
    }

    const steps: React.ReactElement[] = [
        <StepZero key={0} />,
        <StepOne key={1} />,
        <StepTwo key={2} />,
        <StepThree key={3} />,
    ]

    return (
        <div>
            {steps[currentStep] || <div>Step non trovato</div>}
        </div>
    )
}

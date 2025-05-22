import React from 'react'
import { fetchStep } from "@/helper/gh"
import StepZero from './components/steps/StepZero'
import StepOne from './components/steps/StepOne'
import StepTwo from './components/steps/StepTwo'
import StepThree from './components/steps/StepThree'

//qua ci sono i vari step in base a currentStep
export default async function page() {
    const steps: React.ReactElement[] = [
        <StepZero key={0} />,
        <StepOne key={1} />,
        <StepTwo key={2} />,
        <StepThree key={3} />,
    ]

    let currentStep = 0;
    try {
        currentStep = await fetchStep();
    }
    catch (error) {
        console.error("Failed to fetch step:", error);
    }
    return (
        <div>
            {steps[currentStep] || <div>Step non trovato</div>}
        </div>
    )
}
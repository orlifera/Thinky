'use client'

import { useEffect, useState } from 'react'
import { fetchStep } from "@/helper/gh"
import StepZero from './components/steps/StepZero'
import StepOne from './components/steps/StepOne'
import StepTwo from './components/steps/StepTwo'
import StepThree from './components/steps/StepThree'
import StepFour from './components/steps/StepFour'
import StepFive from './components/steps/StepFive'
import { Progress } from '@/components/ui/progress'
import StepSix from './components/steps/StepSix'
// import DndStep from './components/steps/DndStep'

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
        <StepFour key={4} />,
        <StepFive key={5} />,
        <StepSix key={6} />,
        // <DndStep key={6} />, da aggiungere se si vule complicare il gioco con il dnd completo di entrambi i processi insieme
        // Aggiungi altri step qui se necessario

    ]

    const percentage: number = Number((currentStep * 16.67).toFixed())

    return (
        <>
            <div className='flex flex-col justify-center items-center align-middle'>
                <div className='flex justify-center items-center align-middle w-full'>
                    0% <Progress value={percentage} className="m-4 w-[70%] flex flex-col" /> 100%
                </div>
                {percentage < 100 ? <h2>Laboratorio completato: {percentage} %</h2> : <h2 className='font-semibold text-lg'>Laboratorio completato! <span aria-hidden>🎉</span></h2>}
            </div>
            {steps[currentStep] || <div>Step non trovato</div>}
        </>
    )
}

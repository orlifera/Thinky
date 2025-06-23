'use client'
import { useLiveStep } from "@/helper/useLiveStep"
import StepZero from './components/steps/StepZero'
import StepThree from './components/steps/StepThree'
import StepFour from './components/steps/StepFour'
import StepOne from './components/steps/StepOne'
import StepFive from './components/steps/StepFive'
import StepTwo from './components/steps/StepTwo'
import { Progress } from '@/components/ui/progress'
import StepSix from './components/steps/StepSix'
import StepSeven from './components/steps/StepSeven'
import { useSendAnswersOnStepChange } from '@/helper/useSendStepThree'
import { useSendStepFourAnswersOnStepChange } from '@/helper/useSendStepFour'
import { useEffect } from "react"



export default function Page() {

    const [currentStep] = useLiveStep()
    console.log("Current Step:", currentStep)
    useSendAnswersOnStepChange(currentStep ?? 0)
    useSendStepFourAnswersOnStepChange(currentStep ?? 0) // stepFour

    useEffect(() => {
        document.title = `${currentStep == 0 ? 'Iniziamo!' : 'Step ' + currentStep}`
    }, [currentStep])

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
        <StepSeven key={7} />,
    ]

    const percentage: number = Number((currentStep * 14.28).toFixed())

    return (
        <>
            <div className='flex flex-col justify-center items-center align-middle'>
                <div className='flex justify-center items-center align-middle w-full'>
                    0% <Progress value={percentage} className="m-4 w-[70%] flex flex-col" aria-label='progress bar' /> 100%
                </div>
                {percentage < 100 ? <h2>Laboratorio completato: {percentage} %</h2> : <h2 className='font-semibold text-lg'>Laboratorio completato! <span aria-hidden>🎉</span></h2>}
            </div>
            {steps[currentStep] || <div>Step non trovato</div>}
        </>
    )
}
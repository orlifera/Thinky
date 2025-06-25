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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"



export default function Page() {

    const [currentStep, updateStep, error] = useLiveStep()
    void updateStep // Per evitare warning su variabile non usata
    console.log("Current Step:", currentStep)
    useSendAnswersOnStepChange(currentStep ?? 0)
    useSendStepFourAnswersOnStepChange(currentStep ?? 0) // stepFour

    useEffect(() => {
        document.title = `${currentStep == 0 ? 'Iniziamo!' : 'Step ' + currentStep + '- Lab OpenDay - Dipartimento di Matematica , UniPd'}`
    }, [currentStep])

    if (!currentStep && error) {
        return (
            <div className="h-[calc(100vh-20em)] flex flex-col items-center justify-center">
                <div className="flex flex-col items-center">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            C&apos;è stato un errore, per favore prova di nuovo.
                        </AlertDescription>
                    </Alert>
                    <Button onClick={() => window.location.reload()} className="mt-4 items-center">
                        Prova di nuovo
                    </Button>
                </div>
                <div className="mt-4">
                    More info:
                    <ul>
                        <li>{error?.name}</li>
                        <li>{error?.message}</li>
                    </ul>
                </div>
            </div>
        )
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

    const percentage: number = Number(((currentStep ?? 0) * 14.28).toFixed())

    return (
        <>
            <div className='flex flex-col justify-center items-center align-middle'>
                <div className='flex justify-center items-center align-middle w-full'>
                    0% <Progress value={percentage} className="m-4 w-[70%] flex flex-col" aria-label='progress bar' /> 100%
                </div>
                {percentage < 100 ? <h2>Laboratorio completato: {percentage} %</h2> : <h2 className='font-semibold text-lg'>Laboratorio completato! <span aria-hidden>🎉</span></h2>}
            </div>
            {
                currentStep
                    ? steps[currentStep]
                    : <div>Step non trovato</div>
            }
        </>
    )
}
'use client'

import { useEffect, useState } from "react"
import { fetchStep } from "@/helper/gh"
import StepUpdateButton from "./StepUpdateButton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StepOneChart from "./StepOneChart"
import StepTwoChart from "./StepTwoChart"

export default function StepPage() {
    const [currentStep, setCurrentStep] = useState<number | null>(null)

    useEffect(() => {
        const loadStep = async () => {
            try {
                const step = await fetchStep()
                setCurrentStep(step)
            } catch (error) {
                console.error("Errore nel caricamento dello step:", error)
            }
        }
        loadStep()
    }, [])

    if (currentStep === null) {
        return <p>Caricamento...</p>
    }

    return (
        <>
            <div className="flex w-full justify-center items-center mb-4">
                <StepUpdateButton currentStep={currentStep} onStepChange={setCurrentStep} />
            </div>
            <Tabs defaultValue="step1" className="w-full">
                <TabsList className='w-[80%] bg-primary flex m-auto'>
                    <TabsTrigger value="step1">Risposte Step 1</TabsTrigger>
                    <TabsTrigger value="step2">Risposte Step 2</TabsTrigger>
                </TabsList>
                <TabsContent value="step1">
                    <StepOneChart />
                </TabsContent>
                <TabsContent value='step2'>
                    <StepTwoChart />
                </TabsContent>
            </Tabs>
        </>
    )
}
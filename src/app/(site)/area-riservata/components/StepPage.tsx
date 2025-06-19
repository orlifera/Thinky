'use client'

import { useLiveStep } from "@/helper/useLiveStep"
import StepUpdateButton from "./StepUpdateButton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StepOneChart from "./StepOneChart"
import StepTwoChart from "./StepTwoChart"

export default function StepPage() {
    const [currentStep, updateStep] = useLiveStep()

    if (currentStep === null) {
        return <p>Caricamento...</p>
    }

    return (
        <>
            <div className="flex w-full justify-center items-center mb-4">
                <StepUpdateButton currentStep={currentStep} onStepChange={updateStep} />
            </div>
            <Tabs defaultValue="step1" className="w-full">
                <TabsList className='w-[80%] bg-primary flex m-auto'>
                    <TabsTrigger value="step1">Risposte Step 3</TabsTrigger>
                    <TabsTrigger value="step2">Risposte Step 4</TabsTrigger>
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
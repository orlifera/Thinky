
import React from "react"
import { fetchStep } from "@/helper/gh"
import StepUpdateButton from "./StepUpdateButton"



export default async function StepPage() {

    let currentStep = 0;
    try {
        currentStep = await fetchStep();
        console.log("Step corrente:", currentStep, "tipo:", typeof currentStep);
    }
    catch (error) {
        console.error("Failed to fetch step:", error);
    }
    console.log("Step corrente:", currentStep, "tipo:", typeof currentStep);

    return (

        <StepUpdateButton currentStep={currentStep} />

    )
}
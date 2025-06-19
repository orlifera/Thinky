import { useEffect } from "react"
import { fetchAnswers, updateAnswers } from "@/helper/gh"
import type { StepOneAnswers } from "@/app/lab/components/steps/StepThree"

const ANSWERS_KEY = 'stepThreeAnswers'
const SENT_KEY = 'sentStepThreeStep'

export function useSendAnswersOnStepChange(currentStep: number) {
    useEffect(() => {
        console.log("useSendAnswersOnStepChange, step:", currentStep)
        if (currentStep !== 4) return
        const sent = localStorage.getItem(SENT_KEY)
        console.log("SENT_KEY (should be null if not sent yet):", sent)
        if (sent === String(currentStep)) return

        const saved = localStorage.getItem(ANSWERS_KEY)
        console.log("ANSWERS_KEY (should be JSON):", saved)
        if (!saved) return

        const answers: StepOneAnswers = JSON.parse(saved)
        if (
            !answers['first-radio'] &&
            !answers['second-radio'] &&
            answers['first-check'].length === 0 &&
            answers['second-check'].length === 0
        ) {
            console.log("Answers are empty, aborting send.")
            return
        }

        (async () => {
            try {
                console.log("Fetching answers from GitHub...")
                const data = await fetchAnswers()
                if (answers['first-radio']) data.step3['first-radio'][answers['first-radio']]++
                if (answers['second-radio']) data.step3['second-radio'][answers['second-radio']]++
                answers['first-check'].forEach(ans => data.step3['first-check'][ans]++)
                answers['second-check'].forEach(ans => data.step3['second-check'][ans]++)
                await updateAnswers(data)
                console.log("Update success, setting SENT_KEY and removing ANSWERS_KEY")
                localStorage.setItem(SENT_KEY, String(currentStep))
                localStorage.removeItem(ANSWERS_KEY)
            } catch (e) {
                console.error("Invio risposte fallito:", e)
            }
        })()
    }, [currentStep])
}
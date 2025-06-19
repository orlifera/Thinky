import { useEffect } from "react"
import { fetchAnswers, updateAnswers } from "@/helper/gh"
import type { StepOneAnswers } from "@/app/lab/components/steps/StepThree"

const ANSWERS_KEY = 'stepOneAnswers'
const SENT_KEY = 'sentStepOneStep'

export function useSendAnswersOnStepChange(currentStep: number) {
    useEffect(() => {
        // Invia le risposte SOLO quando si passa dallo step 1 al 2
        if (currentStep !== 4) return
        // Previeni doppio invio
        const sent = localStorage.getItem(SENT_KEY)
        if (sent === String(currentStep)) return

        const saved = localStorage.getItem(ANSWERS_KEY)
        if (!saved) return

        const answers: StepOneAnswers = JSON.parse(saved)
        if (
            !answers['first-radio'] &&
            !answers['second-radio'] &&
            answers['first-check'].length === 0 &&
            answers['second-check'].length === 0
        ) return

                ; (async () => {
                    try {
                        const data = await fetchAnswers()
                        if (answers['first-radio']) data.step1['first-radio'][answers['first-radio']]++
                        if (answers['second-radio']) data.step1['second-radio'][answers['second-radio']]++
                        answers['first-check'].forEach(ans => data.step1['first-check'][ans]++)
                        answers['second-check'].forEach(ans => data.step1['second-check'][ans]++)
                        await updateAnswers(data)
                        localStorage.setItem(SENT_KEY, String(currentStep))
                        localStorage.removeItem(ANSWERS_KEY)
                    } catch (e) {
                        console.error("Invio risposte fallito:", e)
                    }
                })()
    }, [currentStep])
}
import { useEffect } from "react"
import { fetchAnswers, updateAnswers } from "@/helper/gh"
import type { StepFourAnswers } from "@/types"

const ANSWERS_KEY = 'stepFourAnswers'
const SENT_KEY = 'sentStepFourStep'

export function useSendStepFourAnswersOnStepChange(currentStep: number) {
    useEffect(() => {
        if (currentStep !== 5) {
            return
        }

        const sent = localStorage.getItem(SENT_KEY)
        if (sent === String(currentStep)) {
            return
        }

        const saved = localStorage.getItem(ANSWERS_KEY)
        if (!saved) {
            return
        }

        let answers: StepFourAnswers
        try {
            answers = JSON.parse(saved)
        } catch (e) {
            console.error("[HOOK step4] Errore nel parsing delle risposte:", e)
            return
        }

        if (Object.keys(answers).length === 0) {
            return
        }

        ; (async () => {
            try {
                const data = await fetchAnswers()
                data.step4 = data.step4 || {}
                Object.entries(answers).forEach(([questionId, value]) => {
                    data.step4[questionId] = data.step4[questionId] || {}
                    data.step4[questionId][value] = (data.step4[questionId][value] ?? 0) + 1
                })
                await updateAnswers(data)
                localStorage.setItem(SENT_KEY, String(currentStep))
                localStorage.removeItem(ANSWERS_KEY)
            } catch (e) {
                console.error("[HOOK step4] Invio risposte step 4 fallito:", e)
            }
        })()
    }, [currentStep])
}
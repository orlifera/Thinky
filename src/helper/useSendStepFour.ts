import { useEffect } from "react"
import { fetchAnswers, updateAnswers } from "@/helper/gh"
import type { StepFourAnswers } from "@/types"

const ANSWERS_KEY = 'stepFourAnswers'
const SENT_KEY = 'sentStepFourStep'

export function useSendStepFourAnswersOnStepChange(currentStep: number) {
    useEffect(() => {
        console.log("[HOOK step4] currentStep:", currentStep)
        if (currentStep !== 5) {
            console.log("[HOOK step4] Non è il momento di inviare (currentStep != 5)")
            return
        }

        const sent = localStorage.getItem(SENT_KEY)
        if (sent === String(currentStep)) {
            console.log("[HOOK step4] Risposte già inviate per questo step.")
            return
        }

        const saved = localStorage.getItem(ANSWERS_KEY)
        if (!saved) {
            console.log("[HOOK step4] Nessuna risposta salvata in localStorage.")
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
            console.log("[HOOK step4] Nessuna risposta data, non invio.")
            return
        }

        ; (async () => {
            try {
                console.log("[HOOK step4] Chiamo fetchAnswers...")
                const data = await fetchAnswers()
                console.log("[HOOK step4] Risposte correnti da GH:", data)
                data.step4 = data.step4 || {}
                Object.entries(answers).forEach(([questionId, value]) => {
                    data.step4[questionId] = data.step4[questionId] || {}
                    data.step4[questionId][value] = (data.step4[questionId][value] ?? 0) + 1
                })
                await updateAnswers(data)
                console.log("[HOOK step4] Risposte step 4 inviate e salvate con successo!")
                localStorage.setItem(SENT_KEY, String(currentStep))
                localStorage.removeItem(ANSWERS_KEY)
            } catch (e) {
                console.error("[HOOK step4] Invio risposte step 4 fallito:", e)
            }
        })()
    }, [currentStep])
}
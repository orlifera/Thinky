import { useEffect, useState } from "react"
import { db } from "@/helper/firebase"
import { doc, onSnapshot, setDoc } from "firebase/firestore"

export function useLiveStep(): [
    number | null,
    (newStep: number) => Promise<void>,
    Error | null
] {
    const [currentStep, setCurrentStep] = useState<number | null>(null)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, "lab", "step"),
            (snap) => {

                setCurrentStep(snap.data()?.currentStep ?? 0)
                setError(null)

            },
            (err) => {
                setError(err)
                setCurrentStep(null)
            }
        )
        return () => unsubscribe()
    }, [])

    const updateStep = async (newStep: number) => {
        await setDoc(doc(db, "lab", "step"), { currentStep: newStep })
    }

    return [currentStep, updateStep, error]
}
import { useEffect, useState } from "react"
import { db } from "@/helper/firebase"
import { doc, onSnapshot, setDoc } from "firebase/firestore"

export function useLiveStep(): [number | null, (newStep: number) => Promise<void>] {
    const [currentStep, setCurrentStep] = useState<number | null>(null)

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "lab", "step"), (snap) => {
            setCurrentStep(snap.data()?.currentStep ?? 0)
        })
        return () => unsubscribe()
    }, [])

    // Funzione per aggiornare lo step (es: quando la prof preme il bottone)
    const updateStep = async (newStep: number) => {
        await setDoc(doc(db, "lab", "step"), { currentStep: newStep })
    }

    return [currentStep, updateStep]
}
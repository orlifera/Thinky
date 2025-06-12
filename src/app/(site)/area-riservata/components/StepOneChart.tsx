'use client'

import { useEffect, useState } from "react"
import { fetchAnswers } from "@/helper/gh"
import Stats from "./Stats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { AnswerData, StepAnswer } from "@/types"

type OptionLabels = Record<string, string>

type Question = {
    id: keyof StepAnswer
    label: string
    optionsLabels: OptionLabels
}

const questions: Question[] = [
    {
        id: "first-radio",
        label: "1. Quale delle seguenti affermazioni riguardo ai lettori è corretta?",
        optionsLabels: {
            "first-option-one": "opzione 1",
            "first-option-two": "opzione 2",
            "first-option-three": "opzione 3",
            "first-option-four": "opzione 4"
        }
    },
    {
        id: "second-radio",
        label: "2. Quale è il rischio principale se più scrittori modificano una risorsa condivisa contemporaneamente?",
        optionsLabels: {
            "second-option-one": "opzione 1",
            "second-option-two": "opzione 2",
            "second-option-three": "opzione 3",
            "second-option-four": "opzione 4"
        }
    },
    {
        id: "first-check",
        label: "3. Quali delle seguenti situazioni sono sicure? (più di una risposta corretta)",
        optionsLabels: {
            "lettore-lettore": "opzione 1",
            "lettore-scrittore": "opzione 2",
            "scrittore-scrittore": "opzione 3",
            "lettore-scrittore-2": "opzione 4"
        }
    },
    {
        id: "second-check",
        label: "4. Perché è utile studiare il problema dei lettori e degli scrittori? (più di una risposta corretta)",
        optionsLabels: {
            "veloce": "opzione 1",
            "accessi": "opzione 2",
            "memoria": "opzione 3",
            "conflitti": "opzione 4"
        }
    }
]

export default function StepOneChart() {
    const [answers, setAnswers] = useState<StepAnswer | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchAnswers().then((data: AnswerData) => {
            setAnswers(data.step1)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) return <div className="p-4 text-center">Caricamento grafici...</div>
    if (!answers) return <div className="p-4 text-center">Nessun dato disponibile</div>

    return (
        <div className="flex flex-wrap gap-8 m-auto my-8 justify-center">
            {questions.map(q => (
                <Card key={q.id} className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle>{q.label}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Stats
                            question={q.label}
                            data={answers[q.id] ?? {}}
                            optionsLabels={q.optionsLabels}
                        />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
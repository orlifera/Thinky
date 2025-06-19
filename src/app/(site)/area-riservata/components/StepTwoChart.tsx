'use client'

import { useEffect, useState } from "react"
import { fetchAnswers } from "@/helper/gh"
import Stats from "./Stats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import questionsStep2 from '@/data/answer.json'
import { AnswerData } from "@/types"

export default function StepTwoChart() {
    const [answers, setAnswers] = useState<Record<string, Record<string, number>> | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchAnswers().then((data: AnswerData) => {
            setAnswers(data.step4)
        }).finally(() => setLoading(false))
    }, [])

    if (loading) return <div className="p-4 text-center">Caricamento grafici...</div>
    if (!answers) return <div className="p-4 text-center">Nessun dato disponibile</div>

    return (
        <div className="flex flex-wrap gap-8 m-auto my-8 justify-center">
            {questionsStep2.map(q => (
                <Card key={q.id} className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle>{q.content}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Stats
                            question={q.content}
                            data={answers[q.id] ?? {}}
                            optionsLabels={q.answer.reduce((acc, opt) => ({ ...acc, [opt]: opt }), {})}
                        />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
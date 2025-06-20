'use client'

import answers from '@/data/answer.json'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import Hint from '@/app/lab/components/steps/Hint'
import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { StepFourAnswers } from '@/types'

const STORAGE_KEY = 'stepFourAnswers'

export default function StepFour() {
    const [stepFourAnswers, setStepFourAnswers] = useState<StepFourAnswers>({})

    // Carica da localStorage
    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) setStepFourAnswers(JSON.parse(saved))
    }, [])

    // Salva su localStorage ogni volta che cambia
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stepFourAnswers))
    }, [stepFourAnswers])

    // Aggiorna la risposta selezionata per una domanda
    const handleSelect = (questionId: string, value: string) => {
        setStepFourAnswers(prev => ({
            ...prev,
            [questionId]: value
        }))
    }

    const firstSection = answers.filter(answer => Number(answer.id) <= 8)
    const secondSection = answers.filter(answer => Number(answer.id) > 8 && Number(answer.id) <= 13)
    const thirdSection = answers.filter(answer => Number(answer.id) > 13)

    return (
        <div className="flex flex-col items-center justify-center h-full ">
            <h1 className="text-2xl font-bold mb-2">Step 4: Completa l&apos;esercizio</h1>
            <p className="text-lg mb-4">Questo step si divide in 3 categorie:</p>
            <ol className='list-decimal'>
                <li>Associazione Ruolo -&gt; Comportamento</li>
                <li>Classificazione dei comportamenti (Sicuro, Pericoloso, Neutro)</li>
                <li>Completa la frase con la risposta corretta</li>
            </ol>
            <blockquote className="bg-gray-300 dark:bg-gray-800 p-4 rounded m-4">
                <p className="text-lg mb-4 text-center">Si consideri la seguente definizione di processo: </p>
                <p className="text-lg italic">Un processo è un insieme di attività correlate o interagenti che trasformano input in output.</p>
            </blockquote>
            <strong>Iniziamo</strong>
            <div className='w-full max-w-md mt-4 mb-16 ' aria-hidden>
                <hr className='border-t-2 border-primary mb-4' />
                <h3 className='text-lg font-semibold mb-4 gap-2 flex flex-row items-center justify-center'>Associazione Ruolo <ArrowRight /> Comportamento</h3>
                {firstSection.map((answer) => (
                    <div key={answer.id} className="mb-8 p-4 rounded bg-input">
                        <Label className="text-lg font-semibold mb-1" htmlFor={answer.id}>
                            {answer.content}
                        </Label>
                        <Select
                            value={stepFourAnswers[answer.id] ?? ""}
                            onValueChange={(value) => handleSelect(answer.id, value)}
                        >
                            <SelectTrigger className="w-full mt-2 text-black dark:text-white bg-white p-2 rounded" id="school-label" >
                                <SelectValue placeholder="Scegli la risposta" />
                            </SelectTrigger>
                            <SelectContent>
                                {answer.answer.map((option: string, id: number) => (
                                    <SelectItem
                                        key={id}
                                        value={option}
                                        className="bg-white text-black hover:text-white p-2 my-2 overflow-hidden rounded"
                                    >
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className='mt-2 w-full'>
                            <Hint id={answer.id} />
                        </div>
                    </div>
                ))}
                <hr className='border-t-2 border-primary mb-4' />
                <h3 className='text-lg font-semibold mb-4 text-center'>Classificazione dei comportamenti</h3>
                {secondSection.map((answer) => (
                    <div key={answer.id} className="mb-8 p-4 rounded bg-input">
                        <Label className="text-lg font-semibold mb-1" htmlFor={answer.id}>
                            {answer.content}
                        </Label>
                        <Select
                            value={stepFourAnswers[answer.id] ?? ""}
                            onValueChange={(value) => handleSelect(answer.id, value)}
                        >
                            <SelectTrigger className="w-full mt-2 text-black dark:text-white bg-white p-2 rounded" id="school-label" >
                                <SelectValue placeholder="Scegli la risposta" />
                            </SelectTrigger>
                            <SelectContent>
                                {answer.answer.map((option: string, id: number) => (
                                    <SelectItem
                                        key={id}
                                        value={option}
                                        className="bg-white text-black hover:text-white p-2 my-2 overflow-hidden rounded"
                                    >
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className='mt-2 w-full'>
                            <Hint id={answer.id} />
                        </div>
                    </div>
                ))}
                <hr className='border-t-2 border-primary mb-4' />
                <h3 className='text-lg font-semibold mb-4 text-center'>Completa la frase con la risposta corretta</h3>
                {thirdSection.map((answer) => (
                    <div key={answer.id} className="mb-8 p-4 rounded bg-input">
                        <Label className="text-lg font-semibold mb-1" htmlFor={answer.id}>
                            {answer.content}
                        </Label>
                        <Select
                            value={stepFourAnswers[answer.id] ?? ""}
                            onValueChange={(value) => handleSelect(answer.id, value)}
                        >
                            <SelectTrigger className="w-full mt-2 text-black dark:text-white bg-white p-2 rounded" id="school-label" >
                                <SelectValue placeholder="Scegli la risposta" />
                            </SelectTrigger>
                            <SelectContent>
                                {answer.answer.map((option: string, id: number) => (
                                    <SelectItem
                                        key={id}
                                        value={option}
                                        className="bg-white text-black hover:text-white p-2 my-2 overflow-hidden rounded"
                                    >
                                        {option}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className='mt-2 w-full'>
                            <Hint id={answer.id} />
                        </div>
                    </div>
                ))}
            </div>

            <select className='sr-only' aria-label="Select answer">
                <option defaultValue="" disabled >Seleziona una risposta</option>
                {firstSection.map((answer) => (
                    <option key={answer.id} value={answer.content} aria-label={answer.content}>
                        {answer.content}
                    </option>
                ))}
            </select>
            <select className='sr-only' aria-label="Select answer">
                <option defaultValue="" disabled >Seleziona una risposta</option>
                {secondSection.map((answer) => (
                    <option key={answer.id} value={answer.content} aria-label={answer.content}>
                        {answer.content}
                    </option>
                ))}
            </select>
            <select className='sr-only' aria-label="Select answer">
                <option defaultValue="" disabled >Seleziona una risposta</option>
                {thirdSection.map((answer) => (
                    <option key={answer.id} value={answer.content} aria-label={answer.content}>
                        {answer.content}
                    </option>
                ))}
            </select>

        </div >
    )
}
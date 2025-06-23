'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import React, { useEffect, useState } from 'react'
import Hint from './Hint'

export type StepOneAnswers = {
    'first-radio': string,
    'second-radio': string,
    'first-check': string[],
    'second-check': string[]
}

const STORAGE_KEY = 'stepThreeAnswers'

export default function StepThree() {
    const [firstRadio, setFirstRadio] = useState('first-option-one')
    const [secondRadio, setSecondRadio] = useState('second-option-one')
    const [firstCheck, setFirstCheck] = useState<string[]>([])
    const [secondCheck, setSecondCheck] = useState<string[]>([])

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
            const parsed: StepOneAnswers = JSON.parse(saved)
            setFirstRadio(parsed['first-radio'])
            setSecondRadio(parsed['second-radio'])
            setFirstCheck(parsed['first-check'])
            setSecondCheck(parsed['second-check'])
        }
    }, [])

    useEffect(() => {
        const answers: StepOneAnswers = {
            'first-radio': firstRadio,
            'second-radio': secondRadio,
            'first-check': firstCheck,
            'second-check': secondCheck,
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
    }, [firstRadio, secondRadio, firstCheck, secondCheck])

    const handleCheck = (
        checked: boolean | "indeterminate",
        value: string,
        setFn: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        setFn(prev => checked ? [...prev, value] : prev.filter(v => v !== value))
    }

    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <div className="w-full mb-24">
                <h1 className="text-2xl text-center font-bold m-8">Step 3: Rispondi alle domande</h1>
                <p className="text-center text-xl font-semibold mb-4">
                    Rispondi alle domande sul problema dei lettori-scrittori.
                </p>
            </div>
            <h3 className="text-xl font-semibold mb-2">Iniziamo:</h3>
            <ul className="m-auto p-8 space-y-4" aria-hidden>
                {/* Domanda 1 */}
                <li className='bg-muted-foreground text-white dark:text-black p-8 rounded-md'>
                    <p className='font-semibold'>
                        1. Quale delle seguenti affermazioni riguardo ai lettori è corretta?
                    </p>
                    <RadioGroup className='m-4' defaultValue={firstRadio} onValueChange={setFirstRadio}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="first-option-one" id="first-option-one" />
                            <Label htmlFor="first-option-one">
                                Possono accedere solo se non ci sono altri lettori o scrittori
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="first-option-two" id="first-option-two" />
                            <Label htmlFor="first-option-two">
                                Possono modificare i dati
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="first-option-three" id="first-option-three" />
                            <Label htmlFor="first-option-three">
                                Bloccano gli altri lettori o scrittori
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="first-option-four" id="first-option-four" />
                            <Label htmlFor="first-option-four">
                                Possono leggere contemporaneamente;
                            </Label>
                        </div>
                    </RadioGroup>
                    <Hint id={"first-radio"} />
                </li>
                {/* Domanda 2 */}
                <li className='bg-muted-foreground text-white dark:text-black p-8 rounded-md'>
                    <p className='font-semibold'>
                        2. Quale è il rischio principale se più scrittori modificano una risorsa condivisa contemporaneamente?
                    </p>
                    <RadioGroup className='m-4' defaultValue={secondRadio} onValueChange={setSecondRadio}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="second-option-one" id="second-option-one" />
                            <Label htmlFor="second-option-one">
                                Nessuno, è sicuro;
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="second-option-two" id="second-option-two" />
                            <Label htmlFor="second-option-two">
                                Il sistema diventa più veloce;
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="second-option-three" id="second-option-three" />
                            <Label htmlFor="second-option-three">
                                I dati possono essere incoerenti;
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="second-option-four" id="second-option-four" />
                            <Label htmlFor="second-option-four">
                                I lettori vengono bloccati;
                            </Label>
                        </div>
                    </RadioGroup>
                    <Hint id={"second-radio"} />
                </li>
                {/* Domanda 3 */}
                <li className='bg-muted-foreground text-white dark:text-black p-8 rounded-md'>
                    <p className='font-semibold'>
                        3. Quali delle seguenti situazioni sono sicure? (più di una risposta corretta)
                    </p>
                    <div className="flex flex-col items-start space-y-2 m-4 space-x-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="lettore-lettore"
                                checked={firstCheck.includes("lettore-lettore")}
                                onCheckedChange={checked => handleCheck(!!checked, "lettore-lettore", setFirstCheck)}
                            />
                            <Label htmlFor="lettore-lettore" className="font-semibold">
                                Due lettori leggono contemporaneamente;
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="lettore-scrittore"
                                checked={firstCheck.includes("lettore-scrittore")}
                                onCheckedChange={checked => handleCheck(!!checked, "lettore-scrittore", setFirstCheck)}
                            />
                            <Label htmlFor="lettore-scrittore" className="font-semibold">
                                Uno scrittore scrive mentre un lettore legge.
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="scrittore-scrittore"
                                checked={firstCheck.includes("scrittore-scrittore")}
                                onCheckedChange={checked => handleCheck(!!checked, "scrittore-scrittore", setFirstCheck)}
                            />
                            <Label htmlFor="scrittore-scrittore" className="font-semibold">
                                Due scrittori scrivono contemporaneamente.
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="lettore-scrittore-2"
                                checked={firstCheck.includes("lettore-scrittore-2")}
                                onCheckedChange={checked => handleCheck(!!checked, "lettore-scrittore-2", setFirstCheck)}
                            />
                            <Label htmlFor="lettore-scrittore-2" className="font-semibold">
                                Uno scrittore scrive da solo.
                            </Label>
                        </div>
                    </div>
                    <Hint id={"first-check"} />
                </li>
                {/* Domanda 4 */}
                <li className='bg-muted-foreground text-white dark:text-black p-8 rounded-md'>
                    <p className='font-semibold'>
                        4. Perché è utile studiare il problema dei lettori e degli scrittori? (più di una risposta corretta)
                    </p>
                    <div className="flex flex-col items-start space-y-2 m-4 space-x-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="veloce"
                                checked={secondCheck.includes("veloce")}
                                onCheckedChange={checked => handleCheck(!!checked, "veloce", setSecondCheck)}
                            />
                            <Label htmlFor="veloce" className="font-semibold">
                                Per rendere più veloce la scrittura
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="accessi"
                                checked={secondCheck.includes("accessi")}
                                onCheckedChange={checked => handleCheck(!!checked, "accessi", setSecondCheck)}
                            />
                            <Label htmlFor="accessi" className="font-semibold">
                                Per sincronizzare accessi a dati condivisi
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="memoria"
                                checked={secondCheck.includes("memoria")}
                                onCheckedChange={checked => handleCheck(!!checked, "memoria", setSecondCheck)}
                            />
                            <Label htmlFor="memoria" className="font-semibold">
                                Per risparmiare memoria
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="conflitti"
                                checked={secondCheck.includes("conflitti")}
                                onCheckedChange={checked => handleCheck(!!checked, "conflitti", setSecondCheck)}
                            />
                            <Label htmlFor="conflitti" className="font-semibold">
                                Per evitare conflitti tra lettori o scrittori
                            </Label>
                        </div>
                    </div>
                    <Hint id={"second-check"} />
                </li>
            </ul>
        </div>
    )
}
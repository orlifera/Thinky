
import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"



export default function StepZero() {
    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <h2 className="text-2xl font-bold m-4">Benvenuto nel Laboratorio!</h2>
            <p className="mb-4 w-[80%] text-center">
                Questa prima parte servirà a consolidare le tue conoscenze su ciò che ti è stato spiegato finora. Non preoccuparti di rispondere correttamente. Non ci sarà nessun punteggio. Quando tutti avranno finito, controllerete insieme alla professoressa le risposte e discuterete le soluzioni.
            </p>
            <h3 className="text-xl font-semibold mb-2">Iniziamo:</h3>

            <ol className="list-decimal pl-6 space-y-2">
                <li>
                    Quali dei seguenti processi possono convivere senza causare race condition?
                    <RadioGroup defaultValue="option-one">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-one" id="option-one" />
                            <Label htmlFor="option-one">Option One</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-two" id="option-two" />
                            <Label htmlFor="option-two">Option Two</Label>
                        </div>
                    </RadioGroup>

                </li>
                <li></li>
                <li></li>
                <li></li>
            </ol>
        </div>
    )
}
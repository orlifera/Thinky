import answers from '@/data/answer.json'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import Hint from '@/app/lab/components/steps/Hint'
import React from 'react'


export default function StepTwo() {
    return (
        <div className="flex flex-col items-center justify-center h-full ">
            <h1 className="text-2xl font-bold mb-2">Step 2</h1>
            <p className="text-lg mb-4">Adesso, per ogni comportamento elencato, dovrai indicarne il processo corrispondente.</p>
            <strong>Iniziamo</strong>
            <div className='w-full max-w-md mt-4 mb-16' aria-hidden>

                {answers.map((answer) => (
                    <div key={answer.id} className="mb-8 p-4 rounded bg-accent">
                        <Label className="text-lg font-semibold mb-1" htmlFor={answer.id}>
                            {answer.content}
                        </Label>
                        <Select defaultValue="">
                            <SelectTrigger className="w-full mt-2 text-black dark:text-white bg-white p-2 rounded" id="school-label" >
                                <SelectValue placeholder="Scegli la risposta" />
                            </SelectTrigger>
                            <SelectContent>
                                {answer.answer.map((option, id) => (
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
                {/* <Select defaultValue="">
                    <SelectTrigger className="w-full mt-2 text-black dark:text-white bg-white p-2 rounded" id="school-label" >
                        <SelectValue placeholder="Scegli la risposta" />
                    </SelectTrigger>
                    <SelectContent id="school">
                        {answers.map((answer) => (
                            <SelectItem
                                key={answer.id}
                                value={answer.content}
                                className="bg-white text-black hover:text-white p-2 rounded"
                            >
                                {answer.content}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select> */}
            </div>

            <select className='sr-only' aria-label="Select answer">
                <option defaultValue="" disabled >Seleziona una risposta</option>
                {answers.map((answer) => (
                    <option key={answer.id} value={answer.content} aria-label={answer.content}>
                        {answer.content}
                    </option>
                ))}
            </select>

        </div >
    )
}
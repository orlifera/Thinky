import answers from '@/data/answer.json'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import Hint from '@/app/lab/components/steps/Hint'
import React from 'react'


export default function StepTwo() {
    const firstSection = answers.filter(answer => Number(answer.id) <= 8)
    const secondSection = answers.filter(answer => Number(answer.id) > 8 && Number(answer.id) <= 13)
    const thirdSection = answers.filter(answer => Number(answer.id) > 13)

    return (
        <div className="flex flex-col items-center justify-center h-full ">
            <h1 className="text-2xl font-bold mb-2">Step 2</h1>
            <p className="text-lg mb-4">Questo step si divide in 3 categorie:</p>
            <ol className='list-decimal'>
                <li>
                    Associazione Ruolo -&gt; Comportamento
                </li>
                <li>
                    Classificazione dei comportamenti (Sicuro, Pericoloso, Neutro)
                </li>
                <li>
                    Completa la frase con la risposta corretta
                </li>
            </ol>
            <strong>Iniziamo</strong>
            <div className='w-full max-w-md mt-4 mb-16 ' aria-hidden>
                <hr className='border-t-2 border-primary mb-4' />
                <h3 className='text-lg font-semibold mb-4 text-center'>Associazione Ruolo -&gt; Comportamento</h3>
                {firstSection.map((answer) => (
                    <div key={answer.id} className="mb-8 p-4 rounded bg-input">
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
                <hr className='border-t-2 border-primary mb-4' />
                <h3 className='text-lg font-semibold mb-4 text-center'>Classificazione dei comportamenti</h3>
                {secondSection.map((answer) => (
                    <div key={answer.id} className="mb-8 p-4 rounded bg-input">
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
                <hr className='border-t-2 border-primary mb-4' />
                <h3 className='text-lg font-semibold mb-4 text-center'>Completa la frase con la risposta corretta</h3>
                {thirdSection.map((answer) => (
                    <div key={answer.id} className="mb-8 p-4 rounded bg-input">
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
import answers from '@/data/answer.json'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import React from 'react'


export default function StepTwo() {
    return (
        <div className="flex flex-col items-center justify-center h-full ">
            <h1 className="text-2xl font-bold mb-2">Step 2</h1>
            <p className="text-lg mb-4">Adesso, per ogni comportamento elencato, dovrai indicarne il processo corrispondente.</p>
            <strong>Iniziamo</strong>
            <div className='w-full max-w-md mt-4'>
                <Select defaultValue="" aria-labelledby="school-label">
                    <SelectTrigger className="w-full mt-2 text-black dark:text-white bg-white p-2 rounded" id="school-label" >
                        <SelectValue placeholder="La tua scuola" />
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
                </Select>
            </div>

        </div >
    )
}
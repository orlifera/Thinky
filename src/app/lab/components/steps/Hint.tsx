import { Button } from '@/components/ui/button';
import { useState } from 'react';
import type { Hint } from '@/types'
import React from 'react'
import Hints from '@/data/Hints.json'
import { XIcon } from 'lucide-react';


export default function Hint({ id }: Hint) {
    const [isVisible, setIsVisible] = useState(false);
    void id;
    console.log(Hints);
    if (isVisible) {
        return (
            <div className='w-full bg-chart-2 rounded p-8 flex flex-col items-center mt-16'>
                <h2 className='text-2xl font-bold mb-4'>Suggerimento</h2>
                <p>{Hints.map((hint) => {
                    if (hint.id === id) {
                        return (
                            <span key={hint.id} className='text-lg'>
                                {hint.content}
                            </span>
                        );
                    }
                    return null;
                })}</p>
                <Button className='mt-4 p-4' variant={"default"} onClick={() => setIsVisible(false)} ><XIcon /></Button>
            </div>
        );
    }


    return (
        <Button className='w-[50%] flex m-auto bg-primary text-white hover:bg-primary/80 ' onClick={() => {
            setIsVisible(true);
        }}>
            Clicca per visualizzare il suggerimento
        </Button>
    )
}
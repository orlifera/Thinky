import { Button } from '@/components/ui/button';
import { useState } from 'react';
import type { Hint } from '@/types'
import React from 'react'
import Hints from '@/data/Hints.json'
import { XIcon } from 'lucide-react';


export default function Hint({ id }: Hint) {
    const [isVisible, setIsVisible] = useState(false);
    if (isVisible) {
        return (
            <div className='max-w-[35em] m-auto bg-stone-400 dark:bg-stone-500 text-black dark:text-white rounded p-8 flex flex-col items-center mt-16'>
                <h2 className='text-2xl font-bold mb-4'>Suggerimento</h2>
                <div>{Hints.map((hint) => {
                    if (hint.id === id) {
                        return (
                            <p key={hint.id} className='text-lg'>
                                {hint.content}
                            </p>
                        );
                    }
                    return null;
                })}</div>
                <Button className='mt-4 p-4' variant={"default"} onClick={() => setIsVisible(false)} ><XIcon /></Button>
            </div>
        );
    }


    return (
        <Button className='w-[50%] flex m-auto bg-primary text-white hover:bg-primary/80 my-4' onClick={() => {
            setIsVisible(true);
        }}>
            Suggerimento
        </Button>
    )
}
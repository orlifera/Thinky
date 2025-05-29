import React from 'react'
import Confetti from '../Confetti'



export default function StepSeven() {
    return (
        <div className='h-[calc(100dvh-25em)] w-full flex flex-col items-center justify-centerp-4'>
            <h1 className='text-2xl font-bold text-center mb-4'>Congratulazioni!</h1>
            <p className='text-lg text-center mb-4'>Hai completato il laboratorio. </p>
            <Confetti />
        </div>
    )
}
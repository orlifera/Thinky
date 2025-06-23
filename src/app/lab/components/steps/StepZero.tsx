
import React from 'react'




export default function StepZero() {
    return (
        <div id='main-content' className='w-full h-[calc(100dvh-22rem)] flex flex-col items-center justify-center gap-4 p-4'>
            <h1 className='font-extrabold text-4xl'>Benvenuto nel Laboratorio!</h1>
            <p className='text-xl w-[80%] text-center'>Questo è lo spazio dedicato a trasformare in competenze le conoscenze ottenute finora.</p>
            <p className='text-xl w-[80%] text-center'>La barra qua sopra indica il progresso dell&apos;attività. Adesso, come tutti gli informatici sanno, sei all&apos;inizio e quindi al passo 0. Dovrai completare i 6 step per arrivare alla fine dell&apos;attività.</p>
            <p className='text-xl w-[80%] text-center'>
                Quando tutti saranno su questa pagina, la professoressa darà inizio all&apos;attività avanzando al passo 1. Non ci sono limiti di tempo e non è una verifica. Non ci sarà punteggio o valutazione, quindi non temere di sbagliare, anzi ragiona e buttati!
            </p>

            <p className='flex flex-col text-center text-xl'>
                Alla fine di ogni step, ne discuterete con la professoressa e con gli altri studenti. <strong>Buon Divertimento!</strong>
            </p>
        </div>
    )
}
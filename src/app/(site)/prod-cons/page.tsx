/**
 * 
 * @description Pagina del problema del produttore consumatore
 */



import React from 'react'
import MarkDown from '@/components/MarkDown'
import Banner from '@/components/Banner'
import Image from 'next/image'

const markdown = [
    `\`\`\`cpp
    ripeti {
        . . .

        // produce un elemento in appena_Prodotto;

        . . .

        semaforoRosso(vuoto); // attende che il buffer non sia vuoto
        semaforoRosso(scaffale); // attende che il buffer non sia pieno

        . . .

        // inserisce nel Buffer l'elemento;

        . . .


        semaforoVerde(vuoto); // segnala che il buffer non è vuoto
        semaforoVerde(scaffale); // segnala che il buffer non è pieno
};
    \`\`\``,

    `\`\`\`cpp

    ripeti {
        semaforoRosso(pieno); // attende che il buffer non sia vuoto
        semaforoRosso(scaffale); // attende che il buffer non sia vuoto

        . . .

        // rimuove un elemento dal buffer e lo inserisce in daConsumare;

        . . .

        semaforoVerde(scaffale); // segnala che il buffer non è vuoto
        semaforoVerde(vuoto); // segnala che il buffer non è vuoto
        
        . . .

        // consuma l'elemento contenuto in daConsumare;
        
        . . .

};
    \`\`\``,
];



function page() {
    return (
        <>
            <div className='flex md:mx-2 flex-col justify-center items-center'>
                <Banner
                    source='/prod.png'
                    title='Produttore e Consumatore'
                    text='Il problema di sincronizzazione del produttore e consumatore è un classico esempio di gestione della concorrenza nei sistemi operativi.'
                />
            </div>
            <div className='flex flex-col items-center justify-center w-full min-h-[calc(100dvh-19em)] h-full'>


                <article className='w-[90%] text-lg p-4 m-4'>
                    <p className='mx-2 my-4'>
                        Il problema del produttore e consumatore con memoria limitata è generalmente utilizzato per mostrare la potenza dlele primitive di sincronizzazione.
                    </p>
                    <p className='mx-2 my-4'>

                        Si supponga di disporre di una dsta quantità di memoria, rappresentata da un buffer (negli esercizi sarà lo <span className='italic'>scaffale</span>) con <span className="italic">n</span> posizioni disponibili. Il semaforo <span className='italic'>scaffale</span> garantisce la mutua esclusione degli accessi allo <span className="italic">scaffale</span>. Viene inizializzato con il valore 1. I semafori <span className="italic">vuoto</span> e <span className="italic">pieno</span> sono utilizzati per gestire la disponibilità di spazio nel buffer. Il semaforo <span className="italic">vuoto</span> viene inizializzato con il valore <span className="italic">n</span>, mentre il semaforo <span className="italic">pieno</span> viene inizializzato a 0.
                    </p>

                    <div className='mx-2 my-4 flex flex-col'>
                        Il processo del produttore produce un elemento e lo inserisce nel buffer, mentre il processo del consumatore rimuove un elemento dal buffer e lo consuma. Entrambi i processi devono rispettare le seguenti condizioni:
                        <ul className='list-disc  m-auto'>
                            <li> Il produttore non può inserire un elemento nel buffer se il buffer è pieno.</li>
                            <li>Il consumatore non può rimuovere un elemento dal buffer se il buffer è vuoto.</li>
                            <li>Entrambi i processi devono garantire la mutua esclusione nell&apos;accesso al buffer.</li>
                        </ul>
                    </div>

                </article>

                <div>
                    <Image
                        src='/prod.png'
                        alt='Filosofi'
                        width={500}
                        height={500}
                        className=' m-4 p-4'
                    />
                    <p className='text-sm text-gray-500'>Situazione di stallo in cui il buffer è pieno ma il consumatore non può consumare</p>
                </div>
                <div className='w-full flex m-4 p-4 '>
                    <div className=' flex items-center justify-center w-[50%] min-h-[10em] text-wrap'>
                        <p className='w-[80%] text-lg'>
                            Il codice indica una possibile implementazione del produttore. Il processo, produce subito un elemento e poi controlla, attraverso i semfari, se il buffer è pieno o vuoto. Se il buffer non è pieno, il produttore inserisce l&apos;elemento nel buffer e segnala che il buffer non è vuoto. Se il buffer è pieno, il produttore attende che ci sia spazio disponibile.
                        </p>
                    </div>
                    <div className='min-h-[10em] w-[50%] p-4'>
                        <MarkDown content={markdown[0]} />
                    </div>
                </div>
                <div className='w-full flex gap-4 m-4 p-4'>
                    <div className='min-h-[10em] w-[50%] p-4'>
                        <MarkDown content={markdown[1]} />
                    </div>
                    <div className='flex items-center justify-center w-[50%] min-h-[10em] text-wrap'>
                        <p className='w-[80%] text-lg'>
                            Il codice indica una possibile implementazione del consumatore. Il processo attende che ci sia un elemento da consumare e poi lo rimuove dal buffer. Se il buffer non è vuoto, il consumatore consuma l&apos;elemento e segnala che il buffer non è pieno. Se il buffer è vuoto, il consumatore attende che ci sia un elemento disponibile.
                        </p>
                    </div>

                </div>
            </div >
        </>
    )
}

export default page
/**
 *
 * @description Pagina del problema dei filosofi
 */



import React from 'react'
import MarkDown from '@/components/MarkDown'
import Banner from '@/components/Banner'
import Image from 'next/image'


const markdown = [`
\`\`\`
cpp
semaforo bacchetta[5];
\`\`\`
`,
    `
\`\`\`
cpp

do {
    wait(bacchetta[i]);
    wait(bacchetta[(i + 1) % 5]);

    // ...
    // mangia
    // ...

    signal(bacchetta[i]);
    signal(bacchetta[(i + 1) % 5]);

    // ...
    // pensa
    // ...

} while (true)
\`\`\`
`,
    `
\`\`\`
markdown
- Solo quattro filosofi possono stare contemporaneamente a tavola;

- Un filosofo può prendere una bacchetta solo se entrambe le bacchette sono libere;

- Soluzione asimmetrica: il filosofo dispari prende prima la bacchetta a sinistra e poi quella a destra, mentre il filosofo pari fa il contrario;
\`\`\`
`
];



function page() {
    return (
        <>
            <div className='flex md:mx-2 flex-col justify-center items-center'>
                <Banner
                    source='/filosofi.png'
                    title='Filosofi'
                    text='Il problema dei cinque filosofi è un altro classico problema di sincronizzazione. '
                />
            </div>
            <div className='flex flex-col items-center justify-center w-full min-h-[calc(100dvh-19em)] h-full'>

                <article className='w-[90%] p-4 m-4'>
                    <p className='mx-2 my-4'>
                        Si considerino cinque filosofi che trascorrono la loro esistenza alternando fasi in cui pensano e fasi in cui mangiano. I filosofi sono seduti attorno ad un tavolo circolare e hanno a disposizione cinque bacchette e al centro del tavolo vi è una ciotola colma di riso. Quando un filosofo pensa, non ha bisogno di mangiare. Quando invece mangia, non perde tempo a pensare.
                    </p>
                    <p className='mx-2 my-4'>
                        Per mangiare, un filosofo deve prendere le due bacchette più vicine, quella alla sua destra e quella alla sua sinistra. Può prenderne anche una alla volta, ma non può prendere una bacchetta che è in mano ad un altro filosofo, e non può mangiare con una bacchetta sola.
                    </p>
                    <p className='mx-2 my-4'>
                        Il problema dei filosofi è un classico esempio di problema di sincronizzazione, di sicuro non per la sua praticità (o perché agli informatici stanno antipatici i filosofi <span className='text-xl' aria-hidden>🤫</span>), ma perché è il problema che meglio rappresenta la vastissima classe di problemi di sincronizzazione, in cui si deve assegnare risorse senza creare stalli o starvation.
                    </p>
                </article>
                <div>
                    <Image
                        src='/tavolo.png'
                        alt='Filosofi'
                        width={500}
                        height={500}
                        className=' m-4 p-4'
                    />
                </div>
                <div className='w-full flex m-4 p-4 '>
                    <div className=' flex items-center justify-center w-[50%] min-h-[10em] text-wrap'>
                        <p className='w-[80%]'>
                            Una classica soluzione al problema dei filosofi è quella di utilizzare un semaforo per ogni bacchetta, in modo che un filosofo possa prendere una bacchetta solo se il semaforo corrispondente è libero. In questo modo, si evita che due filosofi prendano la stessa bacchetta e si crea un deadlock.
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
                        <p className='w-[80%]'>Questa soluzione garantisce che due vicini non mangino contemporaneamente, ma non garantisce assenza di stallo. Infatti, se tutti i filosofi prendono la bacchetta alla loro sinistra e aspettano di prendere quella alla loro destra, nessuno potrà mangiare. Per evitare questo problema, si può utilizzare un algoritmo di assegnazione delle risorse che garantisca che almeno un filosofo possa mangiare.
                        </p>
                    </div>

                </div>
                <div className='w-full flex gap-4 m-4 p-4'>

                    <div className='w-full flex gap-4 m-4 p-4'>

                        <div className='flex items-center justify-center w-[50%] min-h-[10em] text-wrap'>
                            <p className='w-[80%]'>
                                Alcune soluzioni per evitare problemi di stallo sono:
                            </p>
                        </div>
                        <div className='min-h-[10em] w-[60%] text-wrap p-4'>
                            <MarkDown content={markdown[2]} />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default page
/**
 * 
 * @description Pagina del problema di sincronizzazione dei processi
 */



import React from 'react'
import MarkDown from '@/components/MarkDown'
import Banner from '@/components/Banner'

const markdown = [`
\`\`\`
cpp
do {
    wait(scrittura);

    // ...
    // Operazioni di scrittura
    // ...

    signal(scrittura);
} while (true);
\`\`\`
`,
    `
\`\`\`
import React from 'react';
import { Copy, Check } from "lucide-react";
import { useState, useEffect } from 'react';

const MarkDown = ({ content }: { content: string }) => {
  return <div>{content}</div>;
};
\`\`\`
`,

    `
\`\`\`
cpp
do {
    wait(mutex);
    numLettori++;
    if (numLettori == 1) {
        wait(scrittora);
    }
    signal(mutex);

    // ...
    // Operazioni di lettura
    // ...

    wait(mutex);
    numLettori--;
    if (numLettori == 0) {
        signal(scrittore);
    }
    signal(mutex);
} while (true);
\`\`\`
`,
];



function page() {
    return (
        <>
            <div className='flex md:mx-2 flex-col justify-center items-center'>
                <Banner
                    source='/lettori.png'
                    title='Problemi di sincronizzazione'
                    text='I problemi di sincronizzazione avvengono quando più processi o thread devono accedere a risorse condivise'
                />
            </div>
            <div className='flex flex-col items-center justify-center w-full min-h-[calc(100dvh-19em)] h-full'>

                <article className='w-[90%] p-4 m-4 text-lg'>
                    Partiamo dal definire cosa è un processo:
                    <p className='text-justify mb-4'>Un processo è un programma in esecuzione, che può essere composto da più thread. Ogni processo ha il proprio spazio di memoria e le proprie risorse, ma può anche condividere risorse con altri processi. I processi possono essere in esecuzione in parallelo o in modo concorrente, a seconda del sistema operativo e dell&apos;architettura hardware.</p>
                    I problemi di sincronizzazione si verificano quando più processi o thread devono accedere a risorse condivise, come la memoria o i file. Se non vengono gestiti correttamente, questi problemi possono portare a <span className='italic'>race condition</span>, deadlock e altri comportamenti indesiderati.
                </article>
                <div className='w-full flex m-4 p-4 '>
                    <div className=' flex items-center justify-center w-[50%] min-h-[10em] text-wrap'>
                        <p className='w-[80%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores itaque quia adipisci alias mollitia corrupti perferendis quos cumque, laudantium quae consequuntur ipsam suscipit enim est veniam nobis ipsa repellendus deserunt!
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
                        <p className='w-[80%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores itaque quia adipisci alias mollitia corrupti perferendis quos cumque, laudantium quae consequuntur ipsam suscipit enim est veniam nobis ipsa repellendus deserunt!
                        </p>
                    </div>

                </div>
                <div className='w-full flex gap-4 m-4 p-4'>
                    <div className=' flex items-center justify-center w-[50%] min-h-[10em] text-wrap'>
                        <p className='w-[80%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores itaque quia adipisci alias mollitia corrupti perferendis quos cumque, laudantium quae consequuntur ipsam suscipit enim est veniam nobis ipsa repellendus deserunt!
                        </p>
                    </div>
                    <div className='min-h-[10em] w-[50%] p-4'>
                        <MarkDown content={markdown[2]} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
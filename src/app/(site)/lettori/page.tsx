/**
 * 
 * @description Pagina del problema dei lettori
 */



import React from 'react'
import MarkDown from '@/components/MarkDown'
import Banner from '@/components/Banner'

const markdown = [
    `
\`\`\`
cpp
// Semaforo binario
Semaforo scrittura, mutex;

// Contatore dei lettori inizializzato a 0
int numLettori = 0;
\`\`\`
`,
    `
\`\`\`
cpp
do {
    wait(mutex);
    numLettori++;
    if (numLettori == 1) {
        wait(scrittura);
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
    `
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
];



function page() {
    return (
        <>
            <div className='flex md:mx-2 flex-col justify-center items-center'>
                <Banner
                    source='/lettori.png'
                    title='Lettori'
                    text='Il problema di sincronizzazione dei lettori e degli scrittori è un classico problema di sincronizzazione'
                />
            </div>
            <div className='flex flex-col items-center justify-center w-full min-h-[calc(100dvh-19em)] h-full'>


                <article className='w-[90%] text-lg p-4 m-4'>
                    <p className='mx-2 my-4'>
                        Il problema dei lettori e degli scrittori è un classico problema di sincronizzazione dei processi, utilizzato per gestire l&apos;accesso concorrente a una risorsa condivisa.</p>
                    <p className='mx-2 my-4'>

                        Si consideri una base di dati da condividere tra processi concorrenti. Alcuni di questi sono lettori, quindi accedono alla risorsa senza modificarla, altri sono scrittori, quindi accedono a tale base modificando una certa risorsa.
                    </p>

                    <p className='mx-2 my-4'>

                        Se due lettori accedono contemporaneamente alla base di dati, non accade nulla. Al contrario, se un scrittore e un altro qualsivoglia processo accedono alla risorsa contemporaneamente, si ottiene un conflitto. Questo perché il lettore potrebbe leggere un valore non aggiornato mentre lo scrittore sta modificando la base di dati. Oppure, nel caso di due scrittori, uno dei due potrebbe sovrascrivere il lavoro dell&apos;altro.
                    </p>

                    <p className='mx-2 my-4'>

                        Per evitare questo problema, è necessario implementare un meccanismo di sincronizzazione che consenta agli scrittori di accedere alla base di dati in modo esclusivo, ma impedisca l&apos;accesso simultaneo a un lettore e a uno scrittore (o a due scrittori).
                    </p>
                </article>
                <div className='w-full flex m-4 p-4 '>
                    <div className=' flex items-center justify-center w-[50%] min-h-[10em] text-wrap'>
                        <p className='w-[80%] text-lg'>
                            Una prima variante di questo problema implica che consiste nel che nessun lettore attenda a meno che uno scrittore non abbia già ottenuto l&apos;accesso alla base di dati. Questa soluzione però non è immune alla starvation (attesa infinita), in quanto un lettore potrebbe essere bloccato indefinitamente da uno scrittore che non rilascia mai il suo accesso alla base di dati.

                            Una soluzione a questa variante prevede l&apos;utilizzo  di un semaforo binario e di un contatore.
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
                            Le operazioni di lettura avvengono in un ciclo (in questo caso, infinito per scopi dimostrativi), in cui il lettore attende di accedere alla base di dati (wait(mutex)). Quando un lettore entra nella sezione critica, incrementa il contatore dei lettori e, se è il primo lettore, attende il semaforo binario scrittura. Quando un lettore esce dalla sezione critica, decrementa il contatore e, se è l&apos;ultimo lettore, rilascia il semaforo binario scrittura, segnalando che la base di dati è libera.
                        </p>
                    </div>

                </div>
                <div className='w-full flex gap-4 m-4 p-4'>
                    <div className=' flex items-center justify-center w-[50%] min-h-[10em] text-wrap'>
                        <p className='w-[80%] text-lg'>
                            Il processo di scrittura è simile, ma in questo caso il semaforo binario scrittura viene atteso all&apos;inizio e rilasciato alla fine. In questo modo, un lettore non può accedere alla base di dati mentre uno scrittore è in esecuzione.
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
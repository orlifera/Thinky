
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import React from 'react'
import Hint from './Hint'


export default function StepOne() {
    return (
        <div className='h-full flex flex-col items-center justify-center'>
            <h2 className="text-2xl font-bold m-4">Questo è il primo di 4 step.</h2>
            <p className="mb-4 w-[80%] text-center">
                Questa parte servirà a consolidare le tue conoscenze su ciò che ti è stato spiegato finora.
            </p>
            <h3 className="text-xl font-semibold mb-2">Iniziamo:</h3>

            <ul className="m-auto p-8 space-y-4" aria-hidden>
                <li className='bg-muted-foreground text-white dark:text-black p-8 rounded-md'>
                    <p className='font-semibold'>
                        1. Quale delle seguenti affermazioni riguardo ai lettori è corretta?
                    </p>
                    <RadioGroup className='m-4' defaultValue="first-option-one">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="first-option-one" id="first-option-one" />
                            <Label htmlFor="first-option-one">
                                Possono accedere solo se non ci sono altri processi
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="first-option-two" id="first-option-two" />
                            <Label htmlFor="first-option-two">
                                Possono modificare i dati
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="first-option-three" id="first-option-three" />
                            <Label htmlFor="first-option-three">
                                Bloccano gli altri processi
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="first-option-four" id="first-option-four" />
                            <Label htmlFor="first-option-four">
                                Possono leggere contemporaneamente;
                            </Label>
                        </div>
                    </RadioGroup>
                    <Hint id={"first-radio"} />
                </li>
                <li className='bg-muted-foreground text-white dark:text-black p-8 rounded-md'>
                    <p className='font-semibold'>
                        2. Quale è il rischio principale se più scrittori modificano una risorsa condivisa contemporaneamente?
                    </p>
                    <RadioGroup className='m-4' defaultValue="second-option-one">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="second-option-one" id="second-option-one" />
                            <Label htmlFor="second-option-one">
                                Nessuno, è sicuro;
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="second-option-two" id="second-option-two" />
                            <Label htmlFor="second-option-two">
                                Il sistema diventa più veloce;
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="second-option-three" id="second-option-three" />
                            <Label htmlFor="second-option-three">
                                I dati possono essere incoerenti;
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="second-option-four" id="second-option-four" />
                            <Label htmlFor="second-option-four">
                                I lettori vengono bloccati;
                            </Label>
                        </div>
                    </RadioGroup>
                    <Hint id={"second-radio"} />

                </li>
                <li className='bg-muted-foreground text-white dark:text-black p-8 rounded-md'>
                    <p className='font-semibold'>
                        3. Quali delle seguenti situazioni sono sicure? (più di una risposta corretta)
                    </p>
                    <div className="flex flex-col items-start space-y-2 m-4 space-x-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="lettore-lettore" />
                            <Label htmlFor="lettore-lettore" className="font-semibold">
                                Due lettori leggono contemporaneamente;
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="lettore-scrittore" />
                            <Label htmlFor="lettore-scrittore" className="font-semibold">
                                Uno scrittore scrive mentre un lettore legge.
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="scrittore-scrittore" />
                            <Label htmlFor="scrittore-scrittore" className="font-semibold">
                                Due scrittori scrivono contemporaneamente.
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="lettore-scrittore-2" />
                            <Label htmlFor="scrittore-only" className="font-semibold">
                                Uno scrittore scrive da solo.
                            </Label>
                        </div>
                    </div>
                    <Hint id={"first-check"} />

                </li>
                <li className='bg-muted-foreground text-white dark:text-black p-8 rounded-md'>
                    <p className='font-semibold'>
                        4. Perché è utile studiare il problema dei lettori e degli scrittori? (più di una risposta corretta)
                    </p>
                    <div className="flex flex-col items-start space-y-2 m-4 space-x-2">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="veloce" />
                            <Label htmlFor="veloce" className="font-semibold">
                                Per rendere più veloce la scrittura
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="accessi" />
                            <Label htmlFor="accessi" className="font-semibold">
                                Per sincronizzare accessi a dati condivisi
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="memoria" />
                            <Label htmlFor="memoria" className="font-semibold">
                                Per risparmiare memoria
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="conflitti" />
                            <Label htmlFor="conflitti" className="font-semibold">
                                Per evitare conflitti tra processi
                            </Label>
                        </div>
                    </div>
                    <Hint id={"second-check"} />

                </li>
            </ul>

            {/* ------ SR ONLY ------- */}

            <form className='sr-only'>
                <fieldset className='flex flex-col m-4 gap-1'>
                    <legend className='font-semibold sr-only'>
                        Quale delle seguenti affermazioni riguardo ai lettori è corretta?
                    </legend>
                    <Label htmlFor="first-option-one" className="font-semibold">

                        <input type="radio" name="first-option-one" id="first-option-one" value="first-option-one" defaultChecked />    Nessuno, è sicuro;
                    </Label>
                    <Label htmlFor="first-option-two" className="font-semibold">

                        <input type="radio" name="lettori" id="first-option-two" value="first-option-two" />  Possono modificare i dati
                    </Label>
                    <Label htmlFor="first-option-three" className="font-semibold">

                        <input type="radio" name="lettori" id="first-option-three" value="first-option-three" />   Bloccano gli altri processi
                    </Label>
                    <Label htmlFor="first-option-four" className="font-semibold">

                        <input type="radio" name="lettori" id="first-option-four" value="first-option-four" />      Possono leggere contemporaneamente;
                    </Label>
                </fieldset>
                <fieldset className='flex flex-col m-4 gap-1'>
                    <legend className='font-semibold sr-only'>
                        Quale è il rischio principale se più scrittori modificano una risorsa condivisa contemporaneamente?
                    </legend>

                    <Label htmlFor="second-option-one" className="font-semibold">

                        <input type="radio" name="lettori" id="second-option-one" value="second-option-one" defaultChecked />   Possono accedere solo se non ci sono altri processi
                    </Label>
                    <Label htmlFor="second-option-2" className="font-semibold">

                        <input type="radio" name="lettori" id="second-option-2" value="second-option-2" />
                        Il sistema diventa più veloce;
                    </Label>
                    <Label htmlFor="second-option-three" className="font-semibold">

                        <input type="radio" name="lettori" id="second-option-three" value="second-option-three" />
                        I dati possono essere incoerenti;
                    </Label>
                    <Label htmlFor="second-option-four" className="font-semibold">

                        <input type="radio" name="lettori" id="second-option-four" value="second-option-four" />
                        I lettori vengono bloccati;
                    </Label>
                </fieldset>
                <fieldset className='flex flex-col m-4 gap-1'>
                    <legend className='font-semibold sr-only'>
                        Quali delle seguenti situazioni sono sicure? (più di una risposta corretta)
                    </legend>

                    <Label htmlFor="lettore-lettore" className="font-semibold">
                        <input type="checkbox" id="lettore-lettore" name="lettore-lettore" />
                        Due lettori leggono contemporaneamente;
                    </Label>
                    <Label htmlFor="lettore-scrittore" className="font-semibold">
                        <input type="checkbox" id="lettore-scrittore" name="lettore-scrittore" />
                        Uno scrittore scrive mentre un lettore legge.
                    </Label>
                    <Label htmlFor="scrittore-scrittore" className="font-semibold">
                        <input type="checkbox" id="scrittore-scrittore" name="scrittore-scrittore" />
                        Due scrittori scrivono contemporaneamente.
                    </Label>
                    <Label htmlFor="lettore-scrittore-2" className="font-semibold">
                        <input type="checkbox" id="scrittore-only" name="lettore-scrittore-2" />
                        Uno scrittore scrive da solo.
                    </Label>
                </fieldset>
                <fieldset className='flex flex-col m-4 gap-1'>
                    <legend className='font-semibold sr-only'>
                        Perché è utile studiare il problema dei lettori e degli scrittori?
                    </legend>

                    <Label htmlFor="veloce" className="font-semibold">
                        <input type="checkbox" id="veloce" name="veloce" />
                        Per rendere più veloce la scrittura
                    </Label>
                    <Label htmlFor="accessi" className="font-semibold">
                        <input type="checkbox" id="accessi" name="accessi" />
                        Per sincronizzare accessi a dati condivisi
                    </Label>
                    <Label htmlFor="memoria" className="font-semibold">
                        <input type="checkbox" id="memoria" name="memoria" />
                        Per risparmiare memoria
                    </Label>
                    <Label htmlFor="conflitti" className="font-semibold">
                        <input type="checkbox" id="conflitti" name="conflitti" />
                        Per evitare conflitti tra processi
                    </Label>
                </fieldset>

            </form>
        </div>
    )
}
import React, { useEffect, useRef, useState } from "react";
import { InfoIcon, OctagonX } from "lucide-react";
import { Button } from "./ui/button";
import { Filter } from 'bad-words';
import { randomUsername, schools, badWords } from "@/data/index";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { User } from "@/types";
/**
 * @description Componente del popup per la registrazione dell'utente.
 * 
 * @returns {JSX.Element} UserLog component
 */



export default function UserLog({ existingUsernames, onConfirm }: {
    existingUsernames: User[];
    onConfirm: (username: string, school: string, ISODate: string) => Promise<boolean>;
}) {

    const [username, setUsername] = useState("");
    const [school, setSchool] = useState("");
    const [error, setError] = useState("");
    const errorRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false); //setta lo stato di visibilità

    const filter = new Filter();
    filter.addWords(...badWords);

    useEffect(() => {
        if (error && errorRef.current) {
            errorRef.current.focus();
        }
    }, [error]);

    // Extract username strings from User array
    const existingUsernamesList = existingUsernames.map(user => user.username);

    //ritorna un nome casuale tra quelli della lista che non sia già in uso
    const getRandomUsername = () => {
        const available = randomUsername.filter(u => !existingUsernamesList.includes(u)); // compare strings
        return available[Math.floor(Math.random() * available.length)];
    };

    console.log("Existing usernames:", existingUsernames);

    const ISODate = new Date().toISOString()
    console.log("ISODate", ISODate)
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString(); // ora attuale - 1 ora
    console.log("oneHourAgo", oneHourAgo)

    const trimmed = username.trim();
    const lower = trimmed.toLowerCase();
    const isProfane =
        filter.isProfane(lower) ||
        lower.split(/\s+/).some(word => filter.isProfane(word));



    function checkUsers(): boolean {
        return existingUsernames.some(user => {
            return user.username === trimmed && user.date > oneHourAgo;
        });
    }



    const handleSubmit = async () => {
        if (!trimmed || !school) {
            setError("Compila tutti i campi.");
        } else if (checkUsers()) {
            setError("Questo nome è già stato preso.");
        } else if (isProfane) {
            setError("Il nome utente contiene parole non appropriate.");
        } else {
            try {
                const success = await onConfirm(trimmed, school, ISODate);

                if (!success) {
                    setError("Questo nome è già stato preso. Riprova con un altro nome.");
                }
            } catch (error) {
                console.error("Error during user confirmation:", error);
                setError("Errore durante la registrazione. Riprova.");
            }
        }
    };

    return (
        <div
            className="fixed w-full inset-0 z-50 bg-black/70 flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="userlog-title"
        >
            <div className="bg-primary/60 dark:bg-primary/50 p-6 rounded-xl w-[90%] max-w-md shadow-xl text-white">
                <h2 id="userlog-title" className="text-xl font-semibold mb-4">
                    Benvenuto!<span aria-hidden>🎉</span> Scegli il tuo nome
                </h2>
                <form>
                    <Label htmlFor="username-label" className="flex">
                        Nome utente
                        <div className="group touch-auto md:block hidden">
                            <InfoIcon className="inline ml-1 text-gray-400 touch-auto" size={16} />
                            <div className={`absolute hidden group-hover:block bottom-[42em] md:bottom-[56em] bg-gray-800 text-white text-xs text-wrap w-[20%] rounded p-2 mt-1`}>
                                <p>Il tuo nome utente può essere qualsiasi cosa tu voglia, non per forza devi inserire il tuo nome anagrafico. Ricorda di essere rispettoso, il tuo username sarà visibile agli organizzatori</p>
                            </div>
                        </div>
                        <button
                            className="group touch-auto block md:hidden"
                            onClick={() => setIsVisible(!isVisible)}
                            aria-hidden={!isVisible}
                            type="button"
                        >
                            <InfoIcon className="inline ml-1 text-gray-400 touch-auto" size={16} />
                            {isVisible && (
                                <div className="absolute bg-gray-800 text-white text-xs text-wrap w-[80%] left-[10%] rounded p-2 mt-1 z-50">
                                    <p>Il tuo nome utente può essere qualsiasi cosa tu voglia, non per forza devi inserire il tuo nome anagrafico. Ricorda di essere rispettoso, il tuo username sarà visibile agli organizzatori</p>
                                </div>
                            )}
                        </button>
                    </Label>

                    <Input
                        id="username-label"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="bg-white text-black dark:text-white  p-2 w-full mt-2 rounded"
                        placeholder="Es. Gatto Rosso"
                        aria-describedby="username-desc"
                    />

                    <Button
                        onClick={() => setUsername(getRandomUsername())}
                        className="text-sm text-blue-300 underline mb-2 p-0"
                        type="button"
                        id="username-desc"
                        variant="link"
                    >
                        Genera un nome casuale
                    </Button>

                    <Label htmlFor="school" className="block mb-2 sr-only">
                        Scuola di provenienza
                    </Label>

                    <select onChange={(e) => setSchool(e.target.value)} id="school" className="sr-only flex w-full bg-input/20 rounded border-[1px] border-white/85% text-white p-2">
                        <option value="">La tua scuola </option>
                        {schools.map((school, index) => (
                            <option key={index} value={school}>
                                {school}
                            </option>
                        ))}
                    </select>

                    <Label htmlFor="school-label" className="block mb-2">
                        Scuola di provenienza
                    </Label>

                    <Select onValueChange={setSchool} defaultValue="" aria-labelledby="school-label">
                        <SelectTrigger className="w-full mt-2 text-black dark:text-white bg-white p-2 rounded" id="school-label" >
                            <SelectValue placeholder="La tua scuola" />
                        </SelectTrigger>
                        <SelectContent id="school">
                            {schools.map((school, index) => (
                                <SelectItem
                                    key={index}
                                    value={school}
                                    className="bg-white text-black hover:text-white p-2 rounded"
                                >
                                    {school}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </form >

                {error && (
                    <div
                        ref={errorRef}
                        role="alert"
                        tabIndex={-1}
                        className="flex text-red-500 items-center justify-start mb-2 gap-2"
                        aria-live="assertive"
                    >
                        <OctagonX aria-hidden="true" />
                        <p className="text-sm flex items-baseline justify-center">{error} <span aria-hidden>😢</span></p>
                    </div>
                )
                }

                <Button
                    onClick={handleSubmit}
                    className="bg-white text-primary hover:text-white px-4 py-2 rounded w-full mt-4"
                    type="button"
                >
                    Inizia
                </Button>
            </div >
        </div >
    );
}
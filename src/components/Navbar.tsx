'use client'

import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import Toggle from '@/components/ui/Toggle'
import Link from 'next/link'
import { notFound, usePathname } from 'next/navigation'
import { SquareArrowOutUpRight } from 'lucide-react'
import Avatar from '@/components/Avatar'
import useUser from '@/context/UserContext'
import BC from '@/components/BC'



/**
 * Navbar component
 * 
 * @returns {JSX.Element} Navbar component
 */

function Navbar() {

    const [width, setWidth] = useState<number>(0); // Iniziamo con valore 0 (indefinito)
    const [isMounted, setIsMounted] = useState<boolean>(false); // Stato per verificare se il componente è montato
    const [isMobile, setIsMobile] = useState(false); //controlla se è mobile per l'avatar
    const [isVisible, setIsVisible] = useState(false); //setta lo stato di visibilità
    // const [scrolled, setScrolled] = useState(false); //controlla lo scroll

    const { user } = useUser() //passo il contesto per l'avatar e il login

    const pathname = usePathname() //per controllare dove sono 
    const currentPage: string = pathname.split('/')[1]; // Ottieni la pagina corrente

    console.log('Current page:', currentPage);

    const isActive = (path: string) => pathname === path

    useEffect(() => {
        // Funzione che aggiorna la larghezza
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        // Aggiungiamo un listener per il resize
        window.addEventListener("resize", handleResize);

        // Impostiamo la larghezza iniziale subito dopo il montaggio del componente
        handleResize();

        // Iniziamo la fase di montaggio
        setIsMounted(true);

        // Cleanup del listener
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);



    // useEffect(() => {
    //     const handleScroll = () => {
    //         setScrolled(window.scrollY > 10);
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);


    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(hover: none)").matches);
        };

        checkMobile(); // Check on mount
        window.addEventListener("resize", checkMobile); // Update on resize

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Se il componente non è ancora montato, non renderizzare nulla
    if (!isMounted) {
        return null; // O puoi mettere un caricamento
    }


    return (
        width > 768 ?
            (<>
                <nav className='bg-primary mt-2 mx-2 rounded-t-lg shadow-md shadow-primary/40 flex items-center justify-between p-2 top-2' role='menu navigazione' aria-label='navigazione'>
                    <div id="start" aria-hidden className='sr-only'>start</div>

                    <div aria-label="Logo UniPD" className='w-[10em] h-full flex items-start justify-center p-2'>
                        <Logo />
                    </div>
                    <div className='flex items-center m-4 gap-8'>
                        <ul className='flex items-center text-white gap-2'>
                            <li>
                                <Link
                                    href="/"
                                    className={`flex w-full h-full p-3 rounded-md transition ${isActive('/') ? 'bg-white text-primary font-bold' : ''
                                        }`}

                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/lettori"
                                    className={`flex w-full h-full p-3 rounded-md transition ${isActive('/lettori') ? 'bg-white text-primary font-bold' : ''
                                        }`}
                                >
                                    Problema dei lettori
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/filosofi"
                                    className={`flex w-full h-full p-3 rounded-md transition ${isActive('/filosofi') ? 'bg-white text-primary font-bold' : ''
                                        }`}
                                >
                                    Problema dei filosofi
                                </Link>
                            </li>
                            {user && (
                                <li className='group relative flex items-baseline'>
                                    {/* Avatar as a focusable button */}
                                    <button
                                        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
                                        onClick={() => setIsVisible(!isVisible)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                setIsVisible(!isVisible);
                                            }
                                        }}
                                        aria-haspopup="true"
                                        aria-expanded={isVisible}
                                        aria-label={`User menu for ${user.username}`}
                                    // No explicit tabIndex (uses natural order)
                                    >
                                        <Avatar username={user.username} />
                                    </button>

                                    {/* Dropdown menu */}
                                    <div
                                        className={`absolute ${isMobile
                                            ? (isVisible ? 'block' : 'hidden')
                                            : 'hidden group-hover:block group-focus-within:block'
                                            } right-0 ${width > 768 ? 'top-full mt-2' : 'bottom-full mb-2'
                                            } bg-ring p-4 min-w-[15em] rounded-md text-white z-50`}
                                        role="menu"
                                        aria-hidden={!isVisible}
                                    >
                                        <p>Ciao {user.username}, benvenuto! <span role="img" aria-hidden="true">🎉</span></p>
                                        <p>{user.school}</p>
                                        <Link
                                            href='https://www.unipd.it/offerta-didattica/corso-di-laurea/scienze?tipo=L&scuola=SC&ordinamento=2025&key=SC2987&cg=scienze'
                                            target='_blank'
                                            className="flex items-center justify-center text-center underline rounded-md visited:text-purple-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                            tabIndex={0}
                                        >
                                            Dai un sguardo al corso
                                            <SquareArrowOutUpRight className='ml-1 h-4 w-4' />
                                        </Link>
                                    </div>
                                </li>
                            )}
                        </ul>
                        <Toggle />
                    </div>
                </nav>

                <BC currentPage={currentPage} />
            </>) :
            (
                <nav aria-roledescription='navbar' aria-label='nav bar' className='text-white flex items-center justify-between p-4 z-50 fixed bottom-0 w-full bg-primary'>
                    <ul aria-label='nav list' className='w-full flex items-center justify-between text-center'>
                        <li aria-label='nav item'>
                            <Link href='/' className={`w-full h-full p-3 rounded-md transition ${isActive('/') ? 'bg-white text-primary font-bold' : ''
                                }`}>
                                Home
                            </Link>
                        </li>
                        <li aria-label='nav item'>
                            <Link href='/lettori' className={`w-full h-full p-3 rounded-md transition ${isActive('/lettori') ? 'bg-white text-primary font-bold' : ''
                                }`}>
                                Lettori
                            </Link>
                        </li>
                        <li aria-label='nav item' className='text-black'>
                            <Toggle />
                        </li>
                        <li aria-label='nav item' >
                            <Link href='/filosofi' className={`w-full h-full p-3 rounded-md transition ${isActive('/filosofi') ? 'bg-white text-primary font-bold' : ''
                                }`}>
                                Filosofi
                            </Link>
                        </li>
                        {user &&
                            <li className='group' onClick={() => isMobile && setIsVisible(!isVisible)}>
                                <Avatar username={user.username} />
                                <div className={`absolute text-center right-12 bottom-8 ${isMobile ? (isVisible ? 'block' : 'hidden') : `'hidden group-hover:block'`} bg-ring p-4 min-w-[10em] min-h-[5em] rounded-t-md rounded-bl-md text-white`}>
                                    <p>Ciao {user.username}, benvenuto! <span role="decoration">🎉</span></p>
                                    <p>{user.school}</p>
                                    <Link href='https://www.unipd.it/offerta-didattica/corso-di-laurea/scienze?tipo=L&scuola=SC&ordinamento=2025&key=SC2987&cg=scienze' target='_blank' className="flex items-center justify-center text-center underline rounded-md visited:text-purple-700 transition ">
                                        Dai un sguardo al corso
                                        <SquareArrowOutUpRight className='items-center justify-center h-4 w-4' />
                                    </Link>
                                </div>
                            </li>}
                    </ul>

                </nav >
            )
    )
}

export default Navbar


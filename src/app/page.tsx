"use client";
import { useEffect, useState } from "react";
import UserLog from "@/components/UserLog";
import { fetchUsers, updateUsersAuto } from "@/helper/gh";
import { User } from "@/types";
import Loader from "@/components/ui/loader";
import useUser from "@/context/UserContext";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Banner from "@/components/Banner";


export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useUser(); // Get user and setUser from context

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const firstVisit = !sessionStorage.getItem("hasVisited");

    fetchUsers()
      .then(async (data) => {
        setUsers(data);

        const saved = sessionStorage.getItem("user");
        if (saved) {
          const parsed = JSON.parse(saved) as User;
          const exists = data.some(
            (u) => u.username === parsed.username && u.school === parsed.school
          );
          if (exists) {
            setUser(parsed); // update context only
          } else {
            sessionStorage.removeItem("user");
          }
        }

        if (firstVisit) await sleep(500);

        sessionStorage.setItem("hasVisited", "true");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore nel caricamento utenti:", err);
        setLoading(false);
      });
  }, [setUser]);

  const handleConfirm = async (username: string, school: string, date: string) => {
    const newUser: User = { username, school, date };

    try {
      const latestUsers = await fetchUsers();

      const alreadyExists = latestUsers.some(
        (u) => u.username === username && u.school === school
      );

      if (!alreadyExists) {
        const updatedUsers = [...latestUsers, newUser];
        await updateUsersAuto(updatedUsers);
        setUsers(updatedUsers);
      }

      sessionStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser); // update context only
    } catch (error) {
      console.error("Errore nel salvataggio dell’utente:", error);
      alert("Errore nel salvataggio. Riprova.");
    }
  };

  return (
    <>
      {loading && <Loader />}
      {
        !user && !loading && (
          <div className="w-full h-screen flex items-center justify-center">
            <UserLog
              existingUsernames={users}
              onConfirm={handleConfirm}
            />
          </div>
        )
      }
      {
        user && !loading && (
          <div className="flex md:mx-2 flex-col justify-center items-center bg-gradient-to-tl from-primary/90 to-secondary/50 h-auto min-h-screen">
            <Banner
              source="/thinky.png"
              title="BENVENUTO IN THINKY"
              text=" La prima piattaforma interattiva per farti conoscere il mondo della programmazione interamente sviluppata da UniPD."
              username={user.username}
            />
            <div className="h-full w-full flex flex-col items-center justify-center gap-4">


              <div className="grid grid-rows-3 grid-flow-col gap-[3em] w-[90%] m-auto text-center text-wrap">
                <div className="bg-gradient-to-r w-[80%] m-auto h-full from-primary/50 to-secondary/50 rounded-lg shadow-lg p-4 md:min-h-[10em] flex items-center justify-center">
                  <p className="w-[60%] items-center mx-2 text-size-lg">
                    Hai mai desiderato capire come funziona il mondo dell&apos;informatica? Con il nostro percorso interattivo scoprirai i concetti fondamentali della programmazione concorrente in modo semplice, visivo e intuitivo. Non serve esperienza: basta curiosità!
                  </p>
                  <div className="flex w-[40%] h-full items-center justify-center">
                    <Image
                      src="/first.png"
                      alt="Il primo passo"
                      width={250}
                      height={100}
                    />
                  </div>
                </div>
                <div className="bg-gradient-to-r w-[80%] m-auto h-full from-primary/50 to-secondary/50 rounded-lg shadow-lg p-4 md:min-h-[10em] flex items-center justify-center">
                  <p className="w-[60%] items-center mx-2">
                    Metti alla prova le tue abilità con esercizi pratici: trascina blocchi, completa pseudocodice e risolvi sfide pensate per te. Ogni passo ti avvicina al mondo reale dello sviluppo software!
                  </p>
                  <div className="flex w-[40%] h-full items-center justify-center">
                    <Image
                      src="/second.png" // use your Thinky-style banner
                      alt="mettiti alla prova"
                      width={250}
                      height={100}
                    />
                  </div>

                </div>
                <div className="bg-gradient-to-r w-[80%] m-auto h-full from-primary/50 to-secondary/50 rounded-lg shadow-lg p-4 md:min-h-[10em] flex items-center justify-center">
                  <p className="w-[60%] items-center mx-2">
                    Thinky è la prima piattaforma interattiva per farti conoscere il mondo della programmazione completamente sviluppata dall&apos;ateneo. Scoprirai i concetti fondamentali della programmazione concorrente in modo semplice, visivo e intuitivo risolvendo problemi classici. Non serve esperienza: basta curiosità!
                  </p>
                  <div className="flex w-[40%] h-full items-center justify-center">
                    <Image
                      src="/third.png" // use your Thinky-style banner
                      alt="Thinky"
                      width={250}
                      height={100}
                    />
                  </div>

                </div>
              </div>

            </div>
            <div id="">
              <h2 className="text-2xl font-bold text-white mt-4">Inizia subito!</h2>
              <Link id="inizia" href="/lab" className="flex p-3 m-4 rounded bg-gradient-to-tl bg-primary hover:bg-gradient-to-br hover:from-white/50 hover:bg-white hover:text-primary hover:translate-1 hover:shadow-lg text-white items-center justify-center visited:text-white">
                <LinkIcon className="m-1" /> Inizia
              </Link>
            </div>


            <div id="faq" className="flex flex-col items-center justify-center gap-4 w-full max-w-2xl m-4 p-4">
              <Accordion type="single" collapsible className="w-full max-w-2xl p-4 text-lg bg-secondary/50 rounded-lg shadow-md m-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="w-full">È accessibile?</AccordionTrigger>
                  <AccordionContent>
                    Si! Thinky è completamente accessibile rispettndo gli standard WCAG 2.1 e le linee guida WAI-ARIA.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Funziona anche su telefono?</AccordionTrigger>
                  <AccordionContent>
                    Si! Thinky è completamente responsive e funziona su tutti i dispositivi.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Durante il login viene conservato qualche dato personale?</AccordionTrigger>
                  <AccordionContent>
                    Non proprio. Viene conservato il tuo nome utente e la tua scuola, ma non vengono divulgati a terze parti.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

            </div>

          </div>
        )
      }
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import UserLog from "@/components/UserLog";
import { fetchUsers, updateUsersAuto } from "@/helper/gh";
import { User } from "@/types";
import Loader from "@/components/ui/loader";
import useUser from "@/context/UserContext";
import { Button } from "@/components/ui/button";


export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const { setUser: setUserCtx } = useUser(); // prendi setUser dal contesto
  const [loading, setLoading] = useState(true);

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
            setUser(parsed);
            setUserCtx(parsed); // aggiorna il contesto
          } else {
            sessionStorage.removeItem("user");
          }
        }

        if (firstVisit) {
          await sleep(500);
        }

        sessionStorage.setItem("hasVisited", "true");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore nel caricamento utenti:", err);
        setLoading(false);
      });
  }, [setUserCtx]);


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
      setUser(newUser);
      setUserCtx(newUser); // aggiorna il contesto del nuovo utente
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
              existingUsernames={users.map((u) => u.username)}
              onConfirm={handleConfirm}
            />
          </div>
        )
      }
      {
        user && !loading && (
          <main className="flex md:mx-2 flex-col justify-center items-center bg-gradient-to-tl from-primary/90 to-secondary/50 h-[calc(100vh-4rem)]">
            <h1 className="flex pt-8 font-extrabold text-4xl text-center text-foreground"> Benvenuto in Thinky {user.username}!</h1>
            <div id="main-content" className="h-full w-full flex flex-col items-center justify-center gap-4">

              <Button
                variant="default"
                className="w-1/2 md:w-1/3 lg:w-1/4"
                onClick={() => {
                  window.location.href = "/lab";
                }}
              >
                Vai al laboratorio
              </Button>


            </div>
          </main >
        )
      }
    </>
  );
}

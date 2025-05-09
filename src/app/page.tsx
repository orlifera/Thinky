"use client";
import { useEffect, useState } from "react";
import UserLog from "@/components/UserLog";
import { fetchUsers, updateUsersAuto } from "@/helper/gh";
import { User } from "@/types";
import Loader from "@/components/ui/loader";
import useUser from "@/context/UserContext";
// import { motion } from "motion/react";
// import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";


export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const { setUser: setUserCtx } = useUser(); // prendi setUser dal context
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
            setUserCtx(parsed); // ✅ aggiorna il contesto
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
  }, [setUserCtx]); // dipendenza necessaria

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
      setUserCtx(newUser); // ✅ aggiorna il contesto
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
          <>
            {/* <BC currentPage={null} /> */}
            <div className="h-[150em] w-full rounded-lg">
            </div>
            <p id="main-content" className="mb-5">
              Questo è un placeholder per lo skip al maincontent
            </p>
          </>
        )
      }
    </>
  );
}

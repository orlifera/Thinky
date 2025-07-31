import { getFirestore, collection, doc, deleteDoc, runTransaction, getDocs } from "firebase/firestore"
import { User } from "@/types"
import { app } from "./firebase"

const db = getFirestore(app)
const usersCol = collection(db, "users")

function getUserDocId(username: string): string {
    // Lowercase and trim for uniqueness
    return username.trim().toLowerCase()
}

export const fetchUsers = async (): Promise<User[]> => {
    const snap = await getDocs(usersCol)
    return snap.docs.map(d => d.data() as User)
}

export const addUser = async (newUser: User): Promise<User> => {
    const docId = getUserDocId(newUser.username)
    const userDocRef = doc(usersCol, docId)
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000)

    return runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userDocRef)
        if (userDoc.exists()) {
            const data = userDoc.data() as User
            if (new Date(data.date) > twoHoursAgo) {
                // Username già esistente e recente
                throw new Error("Username already exists and was created recently")
            }
        }
        // Se non esiste o è vecchio, sovrascrivi
        transaction.set(userDocRef, newUser)
        return newUser
    })
}

export const resetAllUsers = async (): Promise<void> => {
    const snap = await getDocs(usersCol)
    await Promise.all(snap.docs.map(d => deleteDoc(d.ref)))
}
import { AnswerData, User } from '@/types';
import axios from 'axios';

/**
 * @file gh.ts
 * 
 * @description Funzioni per interagire con l'API di GitHub
 * @author [Orlando Ferazzani]
 */

const REPO: string = "data"; // Nome repo
const OWNER: string = "orlifera"; // Proprietario repo
const FILE_PATH: string = "data/users.json"; // Path del file users.json
const ANS_FILE_PATH = "data/chartAnswer.json"; // Path del file chartAnswer.json
const BRANCH: string = "master"; // Branch name
const MAX_RETRIES: number = 3; // numero massimo di tentativi in caso di conflitto

if (!process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
    throw new Error("GitHub token is missing. Make sure NEXT_PUBLIC_GITHUB_TOKEN is set.");
}

const githubApi = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
    },
});

/**
 * Fetch users dalla repo
 */
export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await githubApi.get(`/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        const content = JSON.parse(atob(response.data.content));
        return content.map((user: User) => ({
            ...user,
            date: user.date,
        }));
    } catch (error) {
        console.error("Failed to fetch users:", error);
        throw new Error("Could not fetch users");
    }
};

/**
 * aggiorna il file users.json con i nuovi dati degli utenti.
 *
 * @param users - Updated user data
 * @param sha - SHA del file da aggiornare
 */
export const updateUsers = async (users: User[], sha: string): Promise<{ newSha: string }> => {
    const content = btoa(JSON.stringify(users.map(user => ({
        ...user,
        date: user.date,
    }))));

    try {
        const response = await githubApi.put(`/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`, {
            message: "Update users.json",
            content,
            sha,
            branch: BRANCH,
        });
        return { newSha: response.data.content.sha };
    } catch (error) {
        console.error("Failed to update users:", error);
        throw error;
    }
};

// Lock per evitare richieste parallele
let isUpdating = false;

/**
 * Aggiunge un nuovo utente, gestendo conflitti e duplicati recenti.
 *
 * @param newUser - The new user to add to the list
 */
export const addUser = async (newUser: User): Promise<User> => {
    if (isUpdating) {
        console.warn("Update already in progress — rejecting duplicate addUser call.");
        return Promise.reject("Update already in progress");
    }

    isUpdating = true;
    let retryCount = 0;

    const attemptUpdate = async (): Promise<User> => {
        try {
            const fileResponse = await githubApi.get(
                `/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`,
                {
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                }
            );

            const currentSha = fileResponse.data.sha;
            const currentContent: User[] = JSON.parse(atob(fileResponse.data.content));

            const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
            const usernameExists = currentContent.some(
                (user: User) =>
                    user.username.trim().toLowerCase() === newUser.username.trim().toLowerCase() &&
                    user.school === newUser.school &&
                    new Date(user.date) > twoHoursAgo
            );

            if (usernameExists) {
                throw new Error("Username already exists and was created recently");
            }

            const updatedContent = [...currentContent, newUser];
            await updateUsers(updatedContent, currentSha);

            return newUser;
        } catch (error) {
            if (
                typeof error === "object" &&
                error !== null &&
                "response" in error &&
                typeof (error).response === "object" &&
                (error).response !== null &&
                "status" in (error).response &&
                (error).response.status === 409 &&
                retryCount < MAX_RETRIES
            ) {
                retryCount++;
                console.warn(`Conflict 409 on attempt ${retryCount}, retrying...`);
                await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
                return attemptUpdate();
            }

            console.error("Fatal error in addUser:", error);
            throw error;
        } finally {
            isUpdating = false;
        }
    };

    return attemptUpdate();
};

/**
 * Prende le risposte del file chartAnswer.json.
 * 
 * @returns Le risposte del file chartAnswer.json
 */

export const fetchAnswers = async (): Promise<AnswerData> => {
    try {
        const answerCount = await githubApi.get(`/repos/${OWNER}/${REPO}/contents/${ANS_FILE_PATH}`);
        const content = JSON.parse(atob(answerCount.data.content));
        return content as AnswerData;
    }
    catch (error) {
        console.error("Errore nel fetch delle risposte:", error);
        throw new Error("Non è stato possibile recuperare i dati delle risposte");
    }
};

/**
 * Aggirna il file chartAnswer.json con le risposte aggiornate.
 * 
 * @param updatedAnswers - Le risposte aggiornate da salvare nel file chartAnswer.json
 */
export const updateAnswers = async (updatedAnswers: AnswerData): Promise<void> => {
    try {
        const response = await githubApi.get(`/repos/${OWNER}/${REPO}/contents/${ANS_FILE_PATH}`);
        const sha = response.data.sha;

        const content = btoa(JSON.stringify(updatedAnswers));
        await githubApi.put(`/repos/${OWNER}/${REPO}/contents/${ANS_FILE_PATH}`, {
            message: "Update answers count",
            content,
            sha,
            branch: BRANCH,
        });
    }
    catch (error) {
        console.error("Errore durante l'aggiornamento delle risposte:", error);
        throw new Error("Impossibile aggiornare le risposte");
    }
}


/**
    Azzera i dati delle risposte impostando tutto a 0.
 */
function resetAnswerData(obj: AnswerData): AnswerData {
    const result: AnswerData = {} as AnswerData;
    for (const stepKey in obj) {
        const stepSection = obj[stepKey as keyof AnswerData];
        if (typeof stepSection === "object" && stepSection) {
            const sectionResult: Record<string, Record<string, number>> = {};
            for (const questionKey in stepSection) {
                const questionSection = stepSection[questionKey];
                // Se è un oggetto (es: { "Scrittore": 2, "Lettore": 1 })
                if (typeof questionSection === "object" && questionSection) {
                    const answerResult: Record<string, number> = {};
                    for (const answerKey in questionSection) {
                        answerResult[answerKey] = 0;
                    }
                    sectionResult[questionKey] = answerResult;
                }
            }
            result[stepKey as keyof AnswerData] = sectionResult;
        }
    }
    return result;
}

/**
 * Resetta tutte le statistiche delle risposte e cancella tutti gli utenti.
 */
export async function resetStats(): Promise<void> {
    const stats = await fetchAnswers();
    const resetStats = resetAnswerData(stats);
    await updateAnswers(resetStats);
}
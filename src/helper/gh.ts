import axios from 'axios';
import { User } from '@/types';

/**
 * @file gh.ts
 * 
 * @description Funzioni per interagire con l'API di GitHub
 * @author [Orlando Ferazzani]
 */

const REPO: string = "data"; // Repo name
const OWNER: string = "orlifera"; // Owner of the repo
const FILE_PATH: string = "data/users.json"; // Path to the JSON file
const STEP_FILE_PATH = "data/step.json";

const BRANCH: string = "master"; // Branch name
const MAX_RETRIES: number = 3; // Maximum number of retry attempts for handling conflicts

// controlla se la variabile d'ambiente è definita
if (!process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
    throw new Error("GitHub token is missing. Make sure NEXT_PUBLIC_GITHUB_TOKEN is set.");
}

// crea un'istanza di axios per l'API di GitHub
const githubApi = axios.create({
    baseURL: "https://api.github.com",
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
    },
});

/**
 * Fetches users.json from the GitHub repository.
 */
export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await githubApi.get(`/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`);
        const content = JSON.parse(atob(response.data.content)); // Decode Base64
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

/**
 * Helper function: prende automaticamente il file users.json e lo aggiorna con un nuovo utente.
 *
 * @param newUser - The new user to add to the list
 */
export const addUser = async (newUser: User): Promise<User> => {
    let retryCount = 0;

    const attemptUpdate = async (): Promise<User> => {
        try {
            // Get the latest file data and SHA
            const fileResponse = await githubApi.get(`/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`);
            const currentSha = fileResponse.data.sha;
            const currentContent = JSON.parse(atob(fileResponse.data.content));

            // Check if username already exists in the latest data
            const usernameExists = currentContent.some(
                (user: User) => user.username === newUser.username && user.school === newUser.school
            );

            if (usernameExists) {
                throw new Error("Username already exists and was created recently");
            }

            // Add the new user to the current list
            const updatedContent = [...currentContent, newUser];

            // Update the file with optimistic locking (SHA)
            await updateUsers(updatedContent, currentSha);

            return newUser;
        } catch (error) {
            // Handle conflict errors (HTTP 409)
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
                console.log(`Conflict detected, retrying... (Attempt ${retryCount} of ${MAX_RETRIES})`);
                // Wait a small random amount of time before retrying to reduce chance of another conflict
                await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
                return attemptUpdate();
            }

            // Rethrow any error so it propagates properly
            throw error;
        }
    };

    return attemptUpdate();
};

/**
 * Ottiene lo step corrente dal file step.json
 */
export const fetchStep = async (): Promise<number> => {
    try {
        const response = await githubApi.get(`/repos/${OWNER}/${REPO}/contents/${STEP_FILE_PATH}`);
        const content = JSON.parse(atob(response.data.content)); // Decode Base64
        return content.currentStep;
    } catch (error) {
        console.error("Errore nel fetch dello step:", error);
        throw new Error("Non è stato possibile recuperare lo step corrente");
    }
};

/**
 * Aggiorna lo step corrente nel file step.json
 *
 * @param newStep - Lo step da impostare
 */
export const updateStep = async (newStep: number): Promise<void> => {
    try {
        // Prende SHA attuale del file
        const fileResponse = await githubApi.get(`/repos/${OWNER}/${REPO}/contents/${STEP_FILE_PATH}`);
        const sha = fileResponse.data.sha;

        const content = btoa(JSON.stringify({ currentStep: newStep }));

        await githubApi.put(`/repos/${OWNER}/${REPO}/contents/${STEP_FILE_PATH}`, {
            message: `Update step to ${newStep}`,
            content,
            sha,
            branch: BRANCH,
        });
    } catch (error) {
        console.error("Errore durante l'aggiornamento dello step:", error);
        throw new Error("Impossibile aggiornare lo step");
    }
};


import axios from 'axios';
import { User } from '@/types';

/**
 * @file gh.ts
 * 
 * @description Funzioni per interagire con l'API di GitHub
 * @author [Orlando Ferazzani]
 */


const REPO: string = "data"; // Repo name
const OWNER: string = "StageUNIPD"; // Owner of the repo
const FILE_PATH: string = "data/users.json"; // Path to the JSON file
const BRANCH: string = "main"; // Branch name

// Check for required environment variable
if (!process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
    throw new Error("GitHub token is missing. Make sure NEXT_PUBLIC_GITHUB_TOKEN is set.");
}

// Axios instance configured for GitHub API
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
        console.log(response.data); // Log the full response data

        const content = JSON.parse(atob(response.data.content)); // Decode Base64
        // Trasformiamo 'date' in un oggetto Date se necessario
        return content.map((user: User) => ({
            ...user,
            date: new Date(user.date), // Converti la stringa ISO in un oggetto Date
        }));
    } catch (error) {
        console.error("Failed to fetch users:", error);
        throw new Error("Could not fetch users");
    }
};



/**
 * Updates users.json on the GitHub repository.
 *
 * @param users - Updated user data
 * @param sha - The current SHA of the file (required by GitHub API to update)
 */
export const updateUsers = async (users: User[], sha: string): Promise<{ newSha: string }> => {
    const content = btoa(JSON.stringify(users.map(user => ({
        ...user,
        date: user.date, // Converte Date in stringa ISO
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
        throw new Error("Could not update users");
    }
};


/**
 * Helper function: Automatically fetches the current SHA and updates users.json
 *
 * @param newUsers - The new user data to write
 */
export const updateUsersAuto = async (newUsers: User[]): Promise<void> => {
    try {
        const file = await githubApi.get(`/repos/${OWNER}/${REPO}/contents/${FILE_PATH}`);
        const sha = file.data.sha;
        await updateUsers(newUsers, sha);
    } catch (error) {
        console.error("Failed to update users automatically:", error);
        throw new Error("Automatic update failed");
    }
};
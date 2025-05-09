/**
 * @file types.d.ts
 * @description file per i tipi definiti da utente 
 * @author [Orlando Ferazzani]
 */

// tipo definito per gli user
export type User = {
    username: string;
    school: string;
    date: string;
}


export type BCProps = {
    currentPage: string | null;
};

export type AvatarProps = {
    username: string | null;

}

export type UserContextType = {
    user: User | null
    setUser: (user: User | null) => void
}

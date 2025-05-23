/**
 * @file types.d.ts
 * @description file per i tipi definiti da utente 
 * @author [Orlando Ferazzani]
 */

// export type TODO = any;

// tipo definito per gli user
export type User = {
    username: string;
    school: string;
    date: string;
}

export type Step = {
    currentStep: number;
}

export type BCProps = {
    currentPage: string | null;
};

export type AvatarProps = {
    username: string | null;

}

export type BannerProps = {
    source: string;
    title: string;
    text: string;
    username?: string;
}

export type UserContextType = {
    user: User | null
    setUser: (user: User | null) => void
}


export interface Item {
    id: string
    content: string
}

export interface Container {
    id: string
    items: Item[]
}
export interface Item {
    id: string
    content: string
}
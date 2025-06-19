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


export type Item = {
    id: string
    content: string
}

export type Container = {
    id: string
    items: Item[]
}
export type Item = {
    id: string
    content: string
}

export type Hint = {
    id: string
}

export type StepAnswer = Record<string, Record<string, number>>;


export interface AnswerData {
    step3: StepAnswer;
    step4: StepAnswer;
}

export type StepFourAnswers = {
    [questionId: string]: string // es: "1": "Lettore"
}
export interface User {
    id?: string;
    userName: string;
    password: string;
    chineseName: string;
    isAdmin: number;
}

export interface Record {
    id?: string;
    changeReason: string;
    changeValue: number;
    endBalance?: number;
    addTime?: string;
}
import {UUID} from "crypto";

export interface User {
    id: number;
    email: string;
    username: string;
    image_url?: string;
    firstName?: string;
    lastName?: string;
    companyId?: string;
    companyAddress?: string;
    companyName?: string;
    reviewCreationDate?: Date;
};

export type UpdateUserDto = Omit<User, 'image_url' | 'email' | 'username'> & {
    id: number
};

export type Company = {
    companyId?: string;
    companyAddress: string;
    companyName: string;
}

export interface Review {
    author: string;
    date: string;
    rating: number;
    image?: string;
    description: string;
    reviewId: string | UUID;
    id?: string | UUID;
    companyId: string | UUID;
}
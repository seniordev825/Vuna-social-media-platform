import { TAnswer } from './TAnswer';
export type TPostImageType = {
    url: string,
    type: "img" | "video"
}
export type TPost = {
    id?: string;
    title: string;
    content: string;
    category: string;
    createdAt: number;
    creatorId: string
    creatorEmail: string;
    creatorPhotoURL: string | null;
    answers?: TAnswer[];
    images: TPostImageType[];
}
// Модель наших запесей в дневнике
export interface IRecords {
    id: number;
    date: string;
    title: string;
    text: string;
    image?:string;
    author_id?:string;
}


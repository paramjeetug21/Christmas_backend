export interface CreateMassageDto {
    content: string;
    senderId: string;
}

export interface UpdateMassageDto {
    senderId: string;
    content: string;
}  
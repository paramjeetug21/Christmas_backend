import {Response,Request} from 'express';
import { CreateMassageDto } from './massage.dto';
import { createMassage, getMassageById ,deleteMassage,updateMassage,getAllMassages} from './massage.service';
export const createMessage = async (req: Request, res: Response) => {
    try {
        
        const senderId = (req as any).userId;
        const { content} = req.body as CreateMassageDto;
        const newMessage = await createMassage(content, senderId);
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error : "error creating message" });
    }
};
export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await getAllMassages();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: "error fetching messages" });
    }
}

export const getMessageById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const message = await getMassageById(id);
        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: "error fetching message" });
    }
}
export const updateMassageById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content } = req.body as { content: string };
        const updatedMessage = await updateMassage(id, content);
        if (!updatedMessage) {
            return res.status(404).json({ error: "Message not found" });
        }
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: "error updating message" });
    }
}
export const deleteMassageById = async (req: Request, res: Response) => {
    try {
        const id = (req as any).userId;
        const { senderId  } = req.params;
        await deleteMassage(senderId,id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "error deleting message" });
    }
}   
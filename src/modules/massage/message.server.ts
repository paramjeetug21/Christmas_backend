import { Router } from "express";
import { createMessage, deleteMassageById, getMessages, updateMassageById } from "./message.controller";
import { authenticateToken } from "../../middleware/jwt.middleware";

const router = Router();

router.get('/', getMessages);
router.put('/:id', updateMassageById);
router.delete('/:senderId', authenticateToken,deleteMassageById);

router.post('/', authenticateToken, createMessage);
export default router;
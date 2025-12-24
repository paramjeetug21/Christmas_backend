import { model, Schema, Document } from "mongoose";
export interface Massage extends Document {
    content :string;
    senderId :string;
}
const massageSchema = new Schema<Massage>({
    content: { type: String, required: true },
    senderId: { type: String, required: true },
},
{ timestamps: true }
);

export const massageModel = model<Massage>("Massage", massageSchema);

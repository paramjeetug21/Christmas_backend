import { massageModel } from "./massage.model";
export const createMassage = async (content: string, senderId: string) : Promise<string|null> => {

    const existingMassage = await massageModel.findOne({  senderId });
    if (existingMassage) {
        throw new Error("Massage with the same senderId already exists.");
    }
    const newMassage = new massageModel({ content, senderId });
    await newMassage.save();
    return content  ;
};

export const getAllMassages = async () :Promise<string[]|null> =>{
  
    return await massageModel.find();
}
export const getMassageById   = async (senderId: string) :Promise<string|null> => {
    return await massageModel.findOne({ senderId });
};

export const updateMassage = async (senderId: string, content: string) :Promise<string|null> => {
    const updatedMassage = await massageModel.findOneAndUpdate(
        { senderId },
        { content },
        { new: true }
    );
    return content;                                       
};

export const deleteMassage = async (senderId: string,id:string) => {
   if(id !== senderId){
    throw new Error("You are not authorized to delete this message.");
   }
   
    return  await massageModel.findOneAndDelete({ senderId });
};  


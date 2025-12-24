import {Request , Response} from 'express';
import { CreateUserDto } from './user.dto';

import { createUser, userLogin, findAllUsers } from './user.service';

//user signup controller
export const signup= async (req:Request,res:Response) =>{
    try {
        const userData:CreateUserDto=req.body;
        const newUser= await createUser(userData);
        res.status(201).json({message:'User created successfully',user:newUser});
    } catch (error) {
        res.status(500).json({message:'Error creating user'});
    }
} 

//user login controller
export const login= async (req:Request,res:Response) =>{
    try {
        const userData:CreateUserDto=req.body;
        const result= await userLogin(userData);
        res.status(200).json({message:'User logged in successfully',...result});
    } catch (error) {
        res.status(500).json({message:'Error logging in user'});
    }
} 

//get all users controller
export const getAllUsers= async (req:Request,res:Response) =>{
    try {
        const users= await findAllUsers();
        res.status(200).json({message:'Users retrieved successfully',users});
    } catch (error) {
        res.status(500).json({message:'Error retrieving users'});
    }
}

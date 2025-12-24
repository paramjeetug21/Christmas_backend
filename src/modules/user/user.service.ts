import { userModel } from './user.model';
import { CreateUserDto } from './user.dto';     
import bcrypt from  'bcrypt' ;    
import jwt from 'jsonwebtoken';                                     
//user signup         
export const createUser = async (data: CreateUserDto) => {                                    
  try {

    const {email,password} = data;

    const userExists = await userModel.findOne({ email });
    if (userExists) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword= await bcrypt.hash(password,10);
    const newUser = await userModel.create({email,password:hashedPassword});
    return newUser;
  } catch (error) {
    throw new Error('Error creating user: ');
  }
};

//user login
export const userLogin= async (data:CreateUserDto) =>{
    try {
        const {email,password} = data;
        const user = await userModel.findOne({ email });
        if (!user) {
         const hashedPassword= await bcrypt.hash(password,10);
    const newUser = await userModel.create({email,password:hashedPassword});
     const payload={id:newUser._id,email:newUser.email};
     const token = jwt.sign(payload,"asdf",{expiresIn:'1h'})
     return {acess_token:token};
        }

        const isPasswordValid= await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            throw new Error('Invalid password');
        }
        const payload={id:user._id,email:user.email};
       const token=jwt.sign(payload,process.env.JWT_SECRET || 'your_secret_key',{expiresIn:'1h'});
        return { access_token : token };
    } catch (error) {
        throw new Error('Error logging in user: ');
    }
}   

// export const findUserByEmail = async (email: string) => {
//   try {
//     const user = await userModel.findOne({ email });
//     return {
//         user:user,
//         status: user ? true : false
//     };
//   } catch (error) {
//     throw new Error('Error finding user by email: ');
//   }
// };  

// find all users
export const findAllUsers = async () => {
  try {
    const users = await userModel.find();
    return users;
  } catch (error) {
    throw new Error('Error finding all users: ');
  }
};  

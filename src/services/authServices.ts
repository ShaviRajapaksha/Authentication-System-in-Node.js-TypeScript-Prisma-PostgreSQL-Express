import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

class AuthService{
    static registerUser = async (username:string, email: string, password: string) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });
        return user;
    };
    static findUserById = async(id:number)=>{
        return await prisma.user.findUnique({
            where: { id: id }
        });
    };
    static findUserByEmail = async(email:string)=>{
        return await prisma.user.findUnique({
            where: { email: email }
        }); 
    }
}
export default AuthService;
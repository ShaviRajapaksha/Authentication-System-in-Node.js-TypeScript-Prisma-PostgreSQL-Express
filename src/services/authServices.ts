import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();
const JWT_Secret = process.env.JWT_SECRET;

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
    static loginUser = async (email: string, password: string) => {
        const user = await AuthService.findUserByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({userId:user.id, username:user.username}, JWT_Secret!, {
            expiresIn: '1h'
        });
        return token;
    }


}
export default AuthService;
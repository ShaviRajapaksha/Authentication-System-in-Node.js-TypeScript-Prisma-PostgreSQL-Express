import jwt from 'jsonwebtoken';
const JWT_Secret = process.env.JWT_SECRET;

export const verifyToken = (token:string) => {
    try{
        return jwt.verify(token, JWT_Secret!)
    } catch(error) {
        throw new Error('Invalid Token');
    }
} 
import { Response, Request, NextFunction } from 'express';
import { verifyToken } from './../utils/jwt';
import { AuthenticatedRequest } from '../utils/types';

class AuthMiddleware {
    static authentication = (req:AuthenticatedRequest, res:Response, next:NextFunction) =>{
        const token = req.header("Authorization")?.replace("Bearer", '')
        if(!token) return res.status(401).json({message: 'Unauthorized'})
            try{
                const decoded = verifyToken(token);
                req.user = decoded;
                next();
            } catch(error) {
                return res.status(401).json({message: 'Invalid token'})
            }
    }
}
export default AuthMiddleware;



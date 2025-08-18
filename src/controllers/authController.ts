import AuthService from "../services/authServices";
import type { Request, Response } from "express";
import { AuthenticatedRequest } from '../utils/types'

class AuthController {
    static registerUser = async (req: Request, res: Response) => {
        try{
            const {username, email, password} = req.body;
            const existingUser = await AuthService.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const newUser = await AuthService.registerUser(username, email, password);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({message:'Error registering user', error});
        }  
    }
    static loginUser = async (req: Request, res: Response) => {
        try {
            const {email, password} = req.body;
            const token = await AuthService.loginUser(email, password);
            return res.status(200).json({ token });
        } catch(error) {
            res.status(400).json({message:'Error logging in user', error});
        }
    }
    static getUserById = async (req: AuthenticatedRequest, res: Response) => {
        try{
            const user = req.user;
            const userId = parseInt(req.params.id);
            const foundUser = await AuthService.findUserById(userId);
            if (!foundUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json({ foundUser: foundUser, user: user });
        } catch(error) {
            res.status(500).json({message:'Error fetching user', error});
        }
    }
}
export default AuthController;

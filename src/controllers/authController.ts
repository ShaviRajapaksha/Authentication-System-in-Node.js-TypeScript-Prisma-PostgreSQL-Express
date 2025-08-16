import AuthService from "../services/authServices.js";
import type { Request, Response } from "express";

class AuthController {
    static registerUser = async (req: Request, res: Response) => {
        try{
            const {username, email, password} = req.body;
            const existingUser = await AuthService.findUserByEmail(email);
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
                const user = await AuthService.registerUser(username, email, password);
                return res.status(201).json(user);
            }
            const newUser = await AuthService.registerUser(username, email, password);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({message:'Error registering user', error});
        }  
    }
}
export default AuthController;

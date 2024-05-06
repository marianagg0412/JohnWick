import {Request, Response} from "express";
import {registerUser, loginUserService, getUsers} from "../services/user.service";
import {User} from "../interfaces/User";

export const registerUserController = async (req:Request, res:Response) =>{
    const authUser: User = req.body;
    const registeredUser = await registerUser(authUser);
    res.status(201).send(registeredUser);
}

export const loginUserController = async (req:Request, res:Response) =>{
    const auth: User = req.body;
    const registeredUser = await loginUserService(auth);
    res.status(201).send(registeredUser);
}

export const getUserController = async (req:Request, res:Response) =>{
    const users = await getUsers();
    return res.status(200).send(users);
}
import { Request, Response } from "express";
import {registerUser, loginUserService, getUsers, addSanction} from "../services/user.service";
import { User } from "../interfaces/User";

export const registerUserController = async (req: Request, res: Response) => {
    const authUser: User = req.body;
    try {
        const result = await registerUser(authUser);
        if (typeof result === 'string') {
            // Handle error case
            res.status(400).send({ message: result });
        } else {
            // Handle success case
            const { user, token } = result;
            res.status(201).send({ user, token });
        }
    } catch (error) {
        res.status(500).send({ message: 'Registration failed', error });
    }
};

export const loginUserController = async (req: Request, res: Response) => {
    const auth: User = req.body;
    try {
        const loginResult = await loginUserService(auth);
        if (typeof loginResult === 'string') { //Ask
            // Handle error case
            res.status(401).send({ message: loginResult });
        } else {
            // Handle success case
            const { username, message, token } = loginResult;
            res.status(201).send({ username, message, token });
        }
    } catch (error) {
        res.status(401).send({ message: 'Invalid credentials', error });
    }
};


export const getUserController = async (req: Request, res: Response) => {
    const users = await getUsers();
    return res.status(200).send(users);
}

export const addSanctionController = async (req: Request, res: Response) => {
    const { userId, sanctionId } = req.body;
    try {
        const user = await addSanction(userId, sanctionId);
        return res.status(200).send(user);
    } catch (error) {
        return res.status(500).send({ message: 'Error adding sanction', error });
    }
}

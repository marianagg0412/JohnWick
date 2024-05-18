import { Request, Response } from 'express';
import { Conflict } from "../interfaces/Conflict";
import {getConflictById, getConflicts, registerConflict, resolveConflict} from "../services/conflict.service";

export const registerConflictController = async (req: Request, res: Response) => {
    if (req.user && req.user.role === "AltaMesa") {
        const conflict: Conflict = req.body;
        try {
            const newConflict = await registerConflict(conflict);
            res.status(201).send(newConflict);
        } catch (error) {
            console.error('Error registering conflict:', error);
            res.status(500).json({ message: 'Error registering conflict', error });
        }
    } else {
        res.status(403).send({ message: 'Unauthorized: Only Alta Mesa members can register conflicts' });
    }
};

export const getConflictsController = async (req: Request, res: Response) => {
    try {
        const conflicts = await getConflicts();
        res.status(200).send(conflicts);
    } catch (error) {
        console.error('Error getting conflicts:', error);
        res.status(500).json({ message: 'Error getting conflicts', error });
    }
}

export const getConflictByIdController = async (req: Request, res: Response) => {
    const conflictId = req.params.id;
    try {
        const conflict = await getConflictById(conflictId);
        if (!conflict) {
            return res.status(404).send({ message: 'Conflict not found' });
        }
        res.status(200).send(conflict);
    } catch (error) {
        console.error('Error getting conflict by id:', error);
        res.status(500).json({ message: 'Error getting conflict by id', error });
    }
}

export const resolveConflictController = async (req: Request, res: Response) => {
    const conflictId = req.params.id;
    const solution = req.body.solution;
    if (req.user && req.user.role === "AltaMesa") {
        try {
            const resolvedConflict = await resolveConflict(conflictId, solution);
            if (!resolvedConflict) {
                return res.status(404).send({ message: 'Conflict not found' });
            }
            res.status(200).send(resolvedConflict);
        } catch (error) {
            console.error('Error resolving conflict:', error);
            res.status(500).json({ message: 'Error resolving conflict', error });
        }
    } else {
        res.status(403).send({ message: 'Unauthorized: Only Alta Mesa members can resolve conflicts' });
    }
};

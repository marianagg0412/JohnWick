import {Request, Response} from "express";
import {getSanctionById, getSanctions, registerSanction, updateSanction} from "../services/sanction.service";

export const registerSanctionController = async (req: Request, res: Response) => {
    if (req.user && req.user.role === "AltaMesa") {
        const sanction = req.body;
        try {
            const newSanction = await registerSanction(sanction);
            res.status(201).send(newSanction);
        } catch (error) {
            console.error('Error registering sanction:', error);
            res.status(500).json({ message: 'Error registering sanction', error });
        }
    }
}

export const getSanctionsController = async (req: Request, res: Response) => {
    try {
        const sanctions = await getSanctions();
        res.status(200).send(sanctions);
    } catch (error) {
        console.error('Error getting sanctions:', error);
        res.status(500).json({ message: 'Error getting sanctions', error });
    }
}

export const getSanctionByIdController = async (req: Request, res: Response) => {
    const sanctionId = req.params.id;
    try {
        const sanction = await getSanctionById(sanctionId);
        if (!sanction) {
            return res.status(404).send({ message: 'Sanction not found' });
        }
        res.status(200).send(sanction);
    } catch (error) {
        console.error('Error getting sanction by id:', error);
        res.status(500).json({ message: 'Error getting sanction by id', error });
    }
}

export const updateSanctionController = async (req: Request, res: Response) => {
    if (req.user && req.user.role === "AltaMesa") {
        const sanctionId = req.params.id;
        const sanction = req.body;
        try {
            const updatedSanction = await updateSanction(sanctionId, sanction);
            if (!updatedSanction) {
                return res.status(404).send({message: 'Sanction not found'});
            }
            res.status(200).send(updatedSanction);
        } catch (error) {
            console.error('Error updating sanction:', error);
            res.status(500).json({message: 'Error updating sanction', error});
        }
    }

}
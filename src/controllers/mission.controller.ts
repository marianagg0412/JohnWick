import {Request, Response} from "express";
import {executeMission, getMissionByExecutorId, getMissions, registerMission} from "../services/mission.service";

export const registerMissionController = async (req: Request, res: Response) => {
    if (req.user && req.user.role === "AltaMesa") {
        const mission = req.body;
        try{
            const newMission = await registerMission(mission);
            res.status(201).send(newMission);
        } catch (error) {
            console.error('Error registering mission:', error);
            res.status(500).json({ message: 'Error registering mission', error });
        }
    }
}

export const getMissionByExecutorIdController = async (req: Request, res: Response) => {
    const executorId = req.params.id;
    try {
        const missions = await getMissionByExecutorId(executorId);
        if (!missions) {
            return res.status(404).send({ message: 'Missions not found' });
        }
        res.status(200).send(missions);
    } catch (error) {
        console.error('Error getting missions by executor id:', error);
        res.status(500).json({ message: 'Error getting missions by executor id', error });
    }
}

export const getMissionsController = async (req: Request, res: Response) => {
    try {
        const missions = await getMissions();
        res.status(200).send(missions);
    } catch (error) {
        console.error('Error getting missions:', error);
        res.status(500).json({ message: 'Error getting missions', error });
    }
}

export const executeMissionController = async (req: Request, res: Response) => {
    const missionId = req.params.id;
    try {
        const mission = await executeMission(missionId);
        if (!mission) {
            return res.status(404).send({ message: 'Mission not found' });
        }
        res.status(200).send(mission);
    } catch (error) {
        console.error('Error executing mission:', error);
        res.status(500).json({message: 'Error executing mission', error});
    }
}
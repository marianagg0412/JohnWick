import {Request, Response} from "express";
import {
    executeMission,
    getMissionByExecutorUsername,
    getMissions,
    registerMission
} from "../services/mission.service";

export const registerMissionController = async (req: Request, res: Response) => {
    if (req.user && req.user.role === "AltaMesa") {
        const { executor, description } = req.body;
        try {
            const newMission = await registerMission({ executor, description });
            res.status(201).send(newMission);
        } catch (error) {
            console.error('Error registering mission:', error);
            res.status(500).json({ message: 'Error registering mission', error });
        }
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};

export const getMissionByExecutorUsernameController = async (req: Request, res: Response) => {
    const executorUsername = req.params.username;
    try {
        const missions = await getMissionByExecutorUsername(executorUsername);
        if (!missions || missions.length === 0) {
            return res.status(404).send({ message: 'Missions not found' });
        }
        res.status(200).send(missions);
    } catch (error) {
        console.error('Error getting missions by executor username:', error);
        res.status(500).json({ message: 'Error getting missions by executor username', error });
    }
};


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
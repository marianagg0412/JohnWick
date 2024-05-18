import {Mission} from "../interfaces/Mission";
import MissionModel from "../models/Mission.model";
import UserModel from "../models/User.model";

export const registerMission = async (mission: { executor: string, description: string }) => {
    const { executor, description } = mission;

    try {
        // Find the executor by username
        const executorUser = await UserModel.findOne({ username: executor });
        if (!executorUser) {
            throw new Error('Executor not found');
        }

        const newMission: Mission = {
            executor: executorUser, // Directly add the user object
            description,
            hasBeenExecuted: false
        };

        const missionModel = new MissionModel(newMission);
        return await missionModel.save();
    } catch (error) {
        console.error('Error registering mission:', error);
        throw error;
    }
};

export const getMissions = async () => {
    try {
        return await MissionModel.find();
    } catch (error) {
        console.error('Error getting missions:', error);
        throw error;
    }
}

export const getMissionByExecutorUsername = async (executorUsername: string) => {
    try {
        // Find the executor by username
        const executor = await UserModel.findOne({ username: executorUsername });
        if (!executor) {
            throw new Error('Executor not found');
        }

        return await MissionModel.find({ executor: executor._id }).populate('executor');
    } catch (error) {
        console.error('Error getting missions by executor username:', error);
        throw error;
    }
};

export const executeMission = async (missionId: string) => {
    try {
        return await MissionModel.findByIdAndUpdate(
            missionId,
            { hasBeenExecuted: true },
            { new: true, runValidators: true }
        );
    } catch (error) {
        console.error('Error executing mission:', error);
        throw error;
    }
}
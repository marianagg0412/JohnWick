import {Mission} from "../interfaces/Mission";
import MissionModel from "../models/Mission.model";

export const registerMission = async (mission: Mission) => {
    const {executor, description} = mission;
    const newMission = new MissionModel({
        executor,
        description,
        hasBeenExecuted: false
    });

    try {
        return await newMission.save();
    } catch (error) {
        console.error('Error registering mission:', error);
        throw error;
    }
}

export const getMissions = async () => {
    try {
        return await MissionModel.find();
    } catch (error) {
        console.error('Error getting missions:', error);
        throw error;
    }
}

export const getMissionByExecutorId = async (executorId: string) => {
    try {
        return await MissionModel.find({ executor: executorId }).populate('executor');
    } catch (error) {
        console.error('Error getting mission by executor id:', error);
        throw error;
    }
}
import { Conflict } from "../interfaces/Conflict";
import ConflictModel from "../models/Conflict.model";

export const registerConflict = async (conflict: Conflict) => {
    const { usersInvolved, solution } = conflict;
    const newConflict = new ConflictModel({
        usersInvolved,
        solution,
        status: 'unresolved'  // Assuming default status is 'unresolved'
    });

    try {
        return await newConflict.save();
    } catch (error) {
        console.error('Error registering conflict:', error);
        throw error;
    }
};

export const getConflicts = async () => {
    try {
        return await ConflictModel.find();
    } catch (error) {
        console.error('Error getting conflicts:', error);
        throw error;
    }
};

export const getConflictById = async (id: string) => {
    try {
        return await ConflictModel.findById(id);
    } catch (error) {
        console.error('Error getting conflict by id:', error);
        throw error;
    }
};

export const resolveConflict = async (conflictId: string, resolution: string) => {
    try {
        return await ConflictModel.findByIdAndUpdate(
            conflictId,
            { resolution, status: 'resolved' },  // Ensure consistent use of status value
            { new: true, runValidators: true }
        );
    } catch (error) {
        console.error('Error resolving conflict:', error);
        throw error;
    }
};

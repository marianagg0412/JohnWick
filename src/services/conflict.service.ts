import { Conflict } from "../interfaces/Conflict";
import ConflictModel from "../models/Conflict.model";
import UserModel from "../models/User.model";

export const registerConflict = async (conflict: Conflict) => {
    const { usersInvolved, solution } = conflict;

    try {
        // Fetch user details by usernames
        const users = await UserModel.find({ username: { $in: usersInvolved } });
        if (users.length !== usersInvolved.length) {
            throw new Error('One or more users not found');
        }

        // Replace usernames with user IDs
        const userIds = users.map(user => user._id);

        const newConflict = new ConflictModel({
            usersInvolved: userIds,
            solution,
            status: 'unresolved'
        });

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

export const resolveConflict = async (conflictId: string, solution: string) => {
    try {
        return await ConflictModel.findByIdAndUpdate(
            conflictId,
            { solution, status: 'resolved' },  // Ensure consistent use of status value
            { new: true, runValidators: true }
        );
    } catch (error) {
        console.error('Error resolving conflict:', error);
        throw error;
    }
};

import {Rule} from "../interfaces/Rule";
import RuleModel from "../models/Rule.model";
import {User} from "../interfaces/User";
import UserModel from "../models/User.model";

export const CreateRule = async (rule: { createdBy: User, description: string }) => {
    const { createdBy, description } = rule;
    const newRule = new RuleModel({
        createdBy,
        description,
    });

    try {
        return await newRule.save();
    } catch (error) {
        console.error('Error creating rule:', error);
        throw error;
    }
};

export const GetRules = async() => {
    try {
        return await RuleModel.find();
    } catch (error) {
        console.error('Error getting rules:', error);
        throw error;
    }
}

export const GetRuleById = async(id: string) => {
    try {
        return await RuleModel.findById(id);
    }catch(error){
        console.error('Error getting rule by id:', error);
        throw error;
    }
}

export const modifyRule = async (id: string, rule: Partial<Rule>) => {
    try {
        return await RuleModel.findByIdAndUpdate(
            id,
            { $set: rule },
            { new: true, runValidators: true }
        );
    } catch (error) {
        console.error('Error modifying rule:', error);
        throw error;
    }
}

// In your rule.service.ts

export const getRulesByCreatorUsername = async (username: string) => {
    try {
        // Populate the createdBy field with the user document
        return await RuleModel.find().populate('createdBy').where('createdBy.username', username);
    } catch (error) {
        console.error('Error getting rules by creator username:', error);
        throw error;
    }
};


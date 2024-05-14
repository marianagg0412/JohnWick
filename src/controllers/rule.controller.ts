import {Request,Response} from "express";
import RuleModel from "../models/Rule.model";
import {modifyRule} from "../services/rule.service";

export const CreateRule = async(req: Request, res: Response) => {
    if(req.user && req.user.role === "AltaMesa"){
        const { createdBy, description } = req.body;
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
    } else{
        return res.status(401).json({message: "Unauthorized, only Alta Mesa members can create rules"});
    }
}

export const GetRules = async(req: Request, res: Response) => {
    try {
        return await RuleModel.find();
    } catch (error) {
        console.error('Error getting rules:', error);
        throw error;
    }
}

export const GetRuleById = async(req: Request, res: Response) => {
    try {
        return await RuleModel.findById(req.params.id);
    }catch(error){
        console.error('Error getting rule by id:', error);
        throw error;
    }
}

export const getRulesByCreatorId = async(req: Request, res: Response) => {
    try {
        return await RuleModel.find({createdBy: req.params.creatorId});
    }catch(error){
        console.error('Error getting rules by creator id:', error);
        throw error;
    }
}

export const modifyRuleController = async (req: Request, res: Response) => {
    if (req.user && req.user.role === "AltaMesa") {
        const ruleId = req.params.id;
        const ruleUpdates = req.body;

        try {
            const updatedRule = await modifyRule(ruleId, ruleUpdates);
            if (!updatedRule) {
                return res.status(404).send({ message: 'Rule not found' });
            }
            res.status(200).send(updatedRule);
        } catch (error) {
            console.error('Error modifying rule:', error);
            res.status(500).json({ message: 'Error modifying rule', error });
        }
    } else {
        res.status(403).send({ message: 'Forbidden' });
    }
}

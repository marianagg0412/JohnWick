import {Request,Response} from "express";
import RuleModel from "../models/Rule.model";
import {CreateRule, GetRuleById, GetRules, getRulesByCreatorId, modifyRule} from "../services/rule.service";

export const CreateRuleController = async (req: Request, res: Response) => {
    if(req.user && req.user.role === "AltaMesa") {
        const rule = req.body;
        try {
            const newRule = await CreateRule(rule);
            res.status(201).send(newRule);
        } catch (error) {
            console.error('Error creating rule:', error);
            res.status(500).json({message: 'Error creating rule', error});
        }
    }
}

export const GetRulesController = async(req: Request, res: Response) => {
    try {
        return await GetRules();
    } catch (error) {
        console.error('Error getting rules:', error);
        throw error;
    }
}

export const GetRuleByIdController = async(req: Request, res: Response) => {
    try {
        return await GetRuleById(req.params.id);
    }catch(error){
        console.error('Error getting rule by id:', error);
        throw error;
    }
}

export const getRulesByCreatorIdController = async (req: Request, res: Response) => {
    try {
        return await getRulesByCreatorId(req.params.id);
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

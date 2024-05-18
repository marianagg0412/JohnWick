import {Request,Response} from "express";
import {
    CreateRule,
    GetRuleById,
    GetRules, getRulesByCreatorId,
    modifyRule
} from "../services/rule.service";

export const CreateRuleController = async (req: Request, res: Response) => {
    if (req.user && req.user.role === "AltaMesa") {
        const { description } = req.body;
        const createdBy = req.user; // Extract the authenticated user's ObjectId from the request

        try {
            const newRule = await CreateRule({ createdBy, description });
            res.status(201).send(newRule);
        } catch (error) {
            console.error('Error creating rule:', error);
            res.status(500).json({ message: 'Error creating rule', error });
        }
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};


export const GetRulesController = async (req: Request, res: Response) => {
    try {
        const rules = await GetRules();
        res.json(rules);
    } catch (error) {
        console.error('Error getting rules:', error);
        res.status(500).json({ message: 'Error getting rules', error: error });
    }
};


export const GetRuleByIdController = async(req: Request, res: Response) => {
    try {
        const rule =  await GetRuleById(req.params.id);
        res.json(rule);
    }catch(error){
        console.error('Error getting rule by id:', error);
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

export const getRulesByCreatorIdController = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const rules = await getRulesByCreatorId(id);
        res.json(rules);
    } catch (error) {
        console.error('Error fetching rules:', error);
        res.status(500).json({ message: 'Error fetching rules', error });
    }
};





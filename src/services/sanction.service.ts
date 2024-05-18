import {Sanction} from "../interfaces/Sanction";
import SanctionModel from "../models/Sanction.model";


export const registerSanction = async (sanction: Sanction) => {
    const {causes, typeSanction} = sanction;
    const newSanction = new SanctionModel({
        causes,
        typeSanction
    });
    try {
        return await newSanction.save();
    } catch (error) {
        console.error('Error registering sanction:', error);
        throw error;
    }
}

export const getSanctions = async () => {
    try {
        return await SanctionModel.find();
    } catch (error) {
        console.error('Error getting sanctions:', error);
        throw error;
    }
}

export const getSanctionById = async (sanctionId: string) => {
    try {
        return await SanctionModel.findById(sanctionId);
    } catch (error) {
        console.error('Error getting sanction by id:', error);
        throw error;
    }
}

export const updateSanction = async (sanctionId: string, sanction: Sanction) => {
    try{
        return await SanctionModel.findByIdAndUpdate(sanctionId, sanction, {new: true, runValidators: true});
    }catch(error){
        console.error('Error updating sanction:', error);
        throw error;
    }
}
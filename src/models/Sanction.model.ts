import {Sanctions} from "../interfaces/Sanctions";
import {model, Schema} from "mongoose";

const SanctionSchema = new Schema<Sanctions>({
    causes: [{ type: String, required: true }],
    typeSanction: { type: String, required: true },
})

const sanctionModel = model('Sanction', SanctionSchema);
export default sanctionModel;
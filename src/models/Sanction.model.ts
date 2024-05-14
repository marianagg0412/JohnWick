import {Sanction} from "../interfaces/Sanction";
import {model, Schema} from "mongoose";

const SanctionSchema = new Schema<Sanction>({
    causes: [{ type: String, required: true }],
    typeSanction: { type: String, required: true },
})

const sanctionModel = model('Sanction', SanctionSchema);
export default sanctionModel;
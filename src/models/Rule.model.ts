import {model, Schema} from "mongoose";
import {Rule} from "../interfaces/Rule";

const RuleSchema = new Schema<Rule>({
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true }
})
const RuleModel = model('Rule', RuleSchema);
export default RuleModel;
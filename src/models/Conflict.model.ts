import {Conflicts} from "../interfaces/Conflict";
import {model, Schema} from "mongoose";

const ConflictSchema = new Schema<Conflicts>({
    usersInvolved: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    solution: { type: String, required: true }
})

const conflictModel = model('Conflict', ConflictSchema);
export default conflictModel;
import {Conflict} from "../interfaces/Conflict";
import {model, Schema} from "mongoose";

const ConflictSchema = new Schema<Conflict>({
    usersInvolved: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    solution: { type: String, required: false },
    status: { type: String, enum: ['unresolved', 'resolved'], default: 'unresolved' }
})

const conflictModel = model('Conflict', ConflictSchema);
export default conflictModel;
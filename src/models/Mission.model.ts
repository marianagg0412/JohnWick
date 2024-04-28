import {Mission} from "../interfaces/Mission";
import {model, Schema} from "mongoose";

const MissionSchema = new Schema<Mission>({
    executor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    hasBeenExecuted: { type: Boolean, default: false },
    description: { type: String, required: true },
})

const missionSchema = model('Mission', MissionSchema);
export default missionSchema;
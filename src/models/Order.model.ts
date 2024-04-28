import {Order} from "../interfaces/Order";
import {model, Schema} from "mongoose";

const OrderSchema = new Schema<Order>({
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    adjudicador: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    order: { type: String, required: true },
    objective: { type: String, required: true },
    hasBeenExecuted: { type: Boolean, default: false },
})

const orderModel = model('Order', OrderSchema);
export default orderModel;
import {Order} from "../interfaces/Order";
import OrderModel from "../models/Order.model";

export const registerOrder = async (order: Order) => {
    const {createdBy, adjudicador, order: orderText, objective} = order;
    const newOrder = new OrderModel({
        createdBy,
        adjudicador,
        order: orderText,
        objective,
        hasBeenExecuted: false
    });

    try {
        return await newOrder.save();
    } catch (error) {
        console.error('Error registering order:', error);
        throw error;
    }
}

export const getOrders = async () => {
    try {
        return await OrderModel.find();
    } catch (error) {
        console.error('Error getting orders:', error);
        throw error;
    }
}

export const getOrderByAdjudicadorId = async (adjudicadorId: string) => {
    try {
        return await OrderModel.find({ adjudicador: adjudicadorId }).populate('adjudicador');
    } catch (error) {
        console.error('Error getting order by adjudicador id:', error);
        throw error;
    }
}

export const executeOrder = async (orderId: string) => {
    try {
        return await OrderModel.findByIdAndUpdate(
            orderId,
            { hasBeenExecuted: true },
            { new: true, runValidators: true }
        );
    } catch (error) {
        console.error('Error executing order:', error);
        throw error;
    }
}
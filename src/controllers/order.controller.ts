import {Response,Request} from "express";
import {executeOrder, getOrderByAdjudicadorId, getOrders, registerOrder} from "../services/order.service";

export const CreateOrder = async (req: Request, res: Response) => {
    if(req.user && req.user.role === "AltaMesa") {
        const order = req.body;
        try {
            const newOrder = await registerOrder(order);
            res.status(201).send(newOrder);
        } catch (error) {
            console.error('Error registering order:', error);
            res.status(500).json({message: 'Error registering order', error});
        }
    }
}

export const GetOrders = async (req: Request, res: Response) => {
    try {
        const orders = await getOrders();
        res.status(200).send(orders);
    } catch (error) {
        console.error('Error getting orders:', error);
        res.status(500).json({message: 'Error getting orders', error});
    }
}

export const GetOrderByAdjudicadorId = async (req: Request, res: Response) => {
    const adjudicadorId = req.params.id;
    try {
        const orders = await getOrderByAdjudicadorId(adjudicadorId);
        if (!orders) {
            return res.status(404).send({message: 'Order not found'});
        }
        res.status(200).send(orders);
    } catch (error) {
        console.error('Error getting order by adjudicador id:', error);
        res.status(500).json({message: 'Error getting order by adjudicador id', error});
    }
}

export const ExecuteOrder = async (req: Request, res: Response) => {
    const orderId = req.params.id;
    if (req.user && req.user.role === "Adjudicador") {
        try {
            const executedOrder = await executeOrder(orderId);
            if (!executedOrder) {
                return res.status(404).send({message: 'Order not found'});
            }
            res.status(200).send(executedOrder);
        } catch (error) {
            console.error('Error executing order:', error);
            res.status(500).json({message: 'Error executing order', error});
        }
    } else {
        res.status(403).send({message: 'Unauthorized: Only Adjudicadores can execute orders'});
    }
}
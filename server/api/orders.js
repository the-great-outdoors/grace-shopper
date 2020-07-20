const ordersRouter = require('express').Router();
const { createOrder, getUserOrdersByUserId, updateUserOrderByOrderId, getUserOrdersByUsername, createOrderItem } = require('../db');
const { requireUser } = require('./utils');

ordersRouter.use((req, res, next) => {
    console.log('A request is being made to /orders');
    next();
});

ordersRouter.get('/:userName', async(req, res, next)=>{
    const { userName } = req.params;

    try {
        const orders = await getUserOrdersByUsername(userName);

        if (orders) {
            res.send({
                message: 'Successfully retrieved orders',
                status: true,
                orders
            });
        }else{
            next({
                error: 'FailedToRetrieveOrdersByUserNameError',
                message:`Unable to retrieve orders by username:${userName}`
            });
        }
    } catch ({error, message}) {
        next({error, message})
    }
});

ordersRouter.post('/:orderId', async(req, res, next)=>{
    const { orderId } = req.params;
    const { merchId, quantity, price } = req.body;
    const orderItemData = { orderId, merchId, quantity, price }

    try {
        const orderItem = await createOrderItem(orderItemData);

        if (orderItem) {
            res.send({
                message: 'Successfully retrieved orderItems',
                status: true,
                orderItem
            });
        }else{
            next({
                error: 'FailedToRetrieveOrdersItems',
                message:`Unable to retrieve orderItems`
            });
        }
    } catch ({error, message}) {
        next({error, message})
    }
});

ordersRouter.get('/:userId', async(req, res, next)=>{
    const { userId } = req.params;

    try {
        const orders = await getUserOrdersByUserId(userId);

        if (orders) {
            res.send({
                message: 'Successfully retrieved orders',
                status: true,
                orders
            });
        }else{
            next({
                error: 'FailedToRetrieveOrdersByUserIdError',
                message:`Unable to retrieve orders by id:${userId}`
            });
        }
    } catch ({error, message}) {
        next({error, message})
    }
});

ordersRouter.post('/', async (req, res, next)=>{
    try {
        const { userId, status, price, merchId, quantity } = req.body;
        const orderData = { userId, status, price };
        let orderId = req.body.orderId;
        
        const order = await createOrder(orderData);
        orderId = order.orderId;
        console.log("This is the order:", order);
        console.log("orderId", orderId);
        console.log('Not in if statement!')
        const orderItemData = { merchId, quantity, price }
        const orderItem = await createOrderItem(orderId, orderItemData)
        console.log("order item:", orderItem);

        console.log("order", order);

        if(orderItem) {
            res.send({
                message: 'successfully created new order',
                status: true,
                orderItem
            });
        }else {
            next({
                error: 'FailedToCreateOrderError',
                message: 'Unable to create new order'
            });
        }
    } catch ({error, message}) {
        next({error, message});
    }
});

ordersRouter.patch('/:orderId', requireUser, async (req, res, next) => {
    const { orderId } = req.params;
    const { userId, orderItemId, status, price, } = req.body;
    const updateFields = {};

    if (userId) {
        updateFields.userId = userId;
    }

    if (status) {
        updateFields.status = status;
    }

    if (price) {
        updateFields.price = price;
    }

    try {
        const updatedOrder = await updateUserOrderByOrderId(orderId, updateFields);

        if(updatedOrder){
            res.send({
                message: 'Successfully updated order',
                status: true,
                payment: updatedOrder 
            });
        }else{
            next({
                error: 'FailedToUpdateOrderError',
                message: 'Unable to update order'
            });
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

module.exports = ordersRouter;
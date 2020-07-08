const ordersRouter = require('express').Router();
const { createOrder, getUserOrdersByUserId, updateUserOrderByOrderId, getUserOrdersByUsername } = require('../db');
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
        const { userId, orderItemId, status, price } = req.body;
        const orderData = { userId, orderItemId, status, price }
        
        const order = await createOrder(orderData);

        if(order){
            res.send({
                message: 'successfully created new order',
                status: true,
                order
            });
        }else{
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

    if (orderItemId) {
        updateFields.orderItemId = orderItemId;
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
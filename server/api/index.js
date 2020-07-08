const apiRouter = require('express').Router();

const jwt = require('jsonwebtoken');
const { getUserByUserId } = require('../db');
const { JWT_SECRET } = process.env;

apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const { user_id } = jwt.verify(token, JWT_SECRET);

            if (user_id) {
                req.user = await getUserByUserId(user_id);
                console.log(req.user);
                next();
            }
        } catch ({ name, message }) {
            next({ name, message })
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${ prefix }`
        });
    }
});

apiRouter.use((req, res, next) => {
    if (req.user) {
        console.log('User is set:', req.user);
    }
    next();
});

apiRouter.get('/', (req, res, next) => {
    res.send({ message: 'This is the base API route!'})
});

apiRouter.get('/health', (req, res, next) => {
    res.send({ message: 'Server is healthy!'});
});

apiRouter.use((error, req, res, next) => {
    res.send(error);
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const merchRouter = require('./merchandise');
apiRouter.use('/merchandise', merchRouter);

const ordersRouter = require('./orders');
apiRouter.use('/orders', ordersRouter);

const paymentsRouter = require('./payments');
apiRouter.use('/payments', paymentsRouter);

module.exports = apiRouter;
const apiRouter = require('express').Router();

const jwt = require('jsonwebtoken');
const { getUserByUserId } = require('../db');
const { JWT_SECRET } = process.env;

apiRouter.use(async (req, res, next) => {
    console.log('Inside api router, checking authorization!')
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const { id } = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.user = await getUserByUserId(id);
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

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const merchRouter = require('./merchandise');
apiRouter.use('/merchandise', merchRouter);

apiRouter.use((error, req, res, next) => {
    res.send(error);
});

module.exports = apiRouter;
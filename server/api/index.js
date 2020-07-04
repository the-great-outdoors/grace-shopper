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

apiRouter.use((error, req, res, next) => {
    res.send(error);
});

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
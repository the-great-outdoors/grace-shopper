const usersRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createUser, updateUser, getUserByUserId, getUserByUsername, getAllUsers, getAllMerchandise, getUserPreferencesByUserId, createUserPreferences } = require('../db');
const { requireUser, requireActiveUser } = require('./utils');
const { useLayoutEffect } = require('react');

usersRouter.use((req, res, next) => {
    console.log('A request is being made to /users');
    next();
});

usersRouter.get('/', async (req, res) => {
    const users = await getAllUsers();
    res.send({
        users
    });
});

usersRouter.get('/me', requireUser, async (req, res, next) => {
    const user = req.user;
    console.log('User Object: ', user);

    if (user && user.user_id) {
        try {
            res.send({
                message: 'Here is the fetched user!',
                user: await getUserByUserId(user.user_id),
                status: true
            })
        } catch ({ name, message }) {
            next({ name, message })
        };    
    }
});

usersRouter.post('/register', async (req, res, next) => {
    const {
        username,
        hashpassword,
        firstname,
        lastname,
        street,
        city,
        state,
        zip,
        save_pmt,
        shipping
    } = req.body;
    console.log('Req.body: ', req.body);
    const SALT_COUNT = 10;
    try {
        const _user = await getUserByUsername(username);
        if (_user) {
            next({
                name: 'UserExistsError',
                message: 'A user by that username already exists'
            });
        };
        if (hashpassword.length < 8) {
            next({
                name: 'PasswordTooShort',
                message: 'Password must be at least 8 characters'
            })
            return;
        };
        bcrypt.hash(hashpassword, SALT_COUNT, async function (err, hashedPassword) {
            const user = await createUser({
                username,
                hashpassword: hashedPassword,
                firstname,
                lastname,
            });
            const token = jwt.sign({
                id: user.user_id,
                username
            }, process.env.JWT_SECRET, {
                expiresIn: '1w'
            });
            console.log("TOKEN", token);
            console.log('Create user preferences values: ', { userId: user.user_id, street, city, state, zip, save_pmt, shipping })
            const userPreferences = await createUserPreferences({
                userId: user.user_id,
                street,
                city,
                state,
                zip,
                save_pmt,
                shipping
            });
            console.log('New User Preference: ', userPreferences);
            user.userPreferences = userPreferences;
            delete user.hashpassword
            console.log('New User: ', user);
            res.send({
                message: "Thank you for signing up!",
                user,
                token,
                status: true
            });
        });
    } catch ({ name, message }) {
        next({ name, message })
    }
});

usersRouter.post('/login', async (req, res, next) => {
    const { username, hashpassword } = req.body;

    if (!username || !hashpassword) {
        next({
            name: "MissingCredentialsError",
            message: "Please supply both a username and password"
        });
    };

    try {
        const user = await getUserByUsername(username);
        console.log('USER: ', user);
        const hashedPassword = user.hashpassword;
        console.log('HASHEDPASSWORD: ', hashedPassword);
        console.log('HASHPASSWORD', hashpassword);
        console.log('<><>', hashedPassword == hashedPassword);
        bcrypt.compare(hashpassword, hashedPassword, function (err, passwordsMatch) {
            if (passwordsMatch) {
                const token = jwt.sign({ id: user.user_id, username: user.username }, process.env.JWT_SECRET)
                delete user.hashpassword;
                res.send({
                    message: "you're logged in!",
                    user,
                    token: `${token}`
                });
                return token;
            } else {
                next({
                    name: 'IncorrectCredentialsError',
                    message: 'Username or password is incorrect'
                });
            };
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
});

usersRouter.post('/token', async (req, res, next) => {
    console.log('In users token.')
    try {
        const token = req.body.token;
        if (!token || !token.length) {
            console.log("IN IF STATEMENT")
            return next({
                name: 'InvalidTokenError',
                message: 'Invalid token, login or register.'
            })
        }
        console.log("Before decoding");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await getUserByUserId(decoded.id);
        console.log("DECODED", decoded);
        res.send(user);
    } catch (error) {
        console.log("ERROR", error)
        next(error);
    }
})

usersRouter.patch('/:userId', requireUser, async (req, res, next) => {
    console.log('Entered user patch route to update user...')
    const { userId } = req.params;
    const { firstname, lastname } = req.body
    const user = req.user;
    console.log("UserId: ", userId);
    console.log('Req.user: ', req.user);
    console.log("Req.user.id: ", req.user.user_id);

    try {
        if (user && user.user_id === Number(userId)) {
            const updatedUser = await updateUser(user.user_id, {
                firstname,
                lastname
            });
            res.send({ updatedUser });
            console.log("Updated User: ", updatedUser);
        } else {
            next({
                name: "UpdateUserError",
                message: "There was an error updating the user!"
            })
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

usersRouter.patch('/:userId/activate', requireUser, async (req, res, next) => {
    const { userId } = req.params;
    const user = req.user;
    console.log("UserId: ", userId)
    console.log('Req.user: ', req.user)
    console.log("Req.user.id: ", req.user.user_id)
    try {
        if (user && user.user_id === Number(userId)) {
            const activatedUser = await updateUser(user.user_id, {
                active: true
            });
            res.send({ activatedUser });
            console.log("Activated User: ", activatedUser);
        } else {
            next({
                name: "ActivateUserError",
                message: "You cannot activate a username that is not yours"
            })
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

usersRouter.delete('/:userId/deactivate', requireActiveUser, async (req, res, next) => {
    const { userId } = req.params;
    const user = req.user;
    try {
        if (user && user.user_id === Number(userId)) {
            const deactivatedUser = await updateUser(user.user_id, {
                active: false
            });
            res.send({ deactivatedUser });
            console.log("Deactivated User: ", deactivatedUser);
        } else {
            next({
                name: "DeleteUserError",
                message: "You cannot delete a username that is not yours"
            })
        };
    } catch ({ name, message }) {
        next({ name, message });
    };
});

usersRouter.use((error, req, res, next) => {
    res.send(error);
});

module.exports = usersRouter;
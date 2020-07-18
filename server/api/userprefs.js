const userPrefsRouter = require('express').Router();

const { updateUserPreferences, getUserPreferencesByUserId } = require('../db');
const { requireUser } = require('./utils');

userPrefsRouter.use((req, res, next) => {
    console.log('A request is being made to /userprefs');
    next();
});

userPrefsRouter.get('/:userId', async (req, res, next) => {
    console.log('Calling on route to get user preferences by userId...');
    const { userId } = req.params;

    try {
        const userPreferences = await getUserPreferencesByUserId(userId);
        console.log('Retrieved User Preferences: ', userPreferences);

        res.send( userPreferences );
    } catch ({ name, message }) {
        next({ name, message });
    };

});

userPrefsRouter.patch('/:userId', requireUser, async (req, res, next) => {
    const { userId } = req.params;
    const { street, city, state, zip, save_pmt, shipping } = req.body
    const user = req.user;
    console.log("UserId: ", userId);
    console.log('Req.user: ', req.user);
    console.log("Req.user.id: ", req.user.user_id);

    try {
        if (user && user.user_id === Number(userId)) {
            const updatedUserPreferences = await updateUserPreferences(user.user_id, {
                street,
                city,
                state,
                zip,
                save_pmt,
                shipping
            });

            res.send({ updatedUserPreferences });
            console.log("Updated UserPreferences: ", updatedUserPreferences);
        } else {
            next({
                name: "UpdateUserPreferenceError",
                message: "There was an error updating the user preferences!"
            })
        };
    } catch ({ name, message }) {
        next({ name, message });
    };

})

module.exports = userPrefsRouter;
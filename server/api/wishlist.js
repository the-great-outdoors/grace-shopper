const wishlistRouter = require('express').Router();

const {
updateWishListByUserId,
getWishListByUserId,
} = require('../db')

wishlistRouter.use((req, res, next) => {
    console.log('A request is being made to /wishlist');
    next();
});

wishlistRouter.get('/', async(req, res, next)=>{
    const { userId } = req.params;
    const user = req.user;
    console.log("UserId: ", userId)
    console.log('Req.user: ', req.user)
    console.log("Req.user.id: ", req.user.user_id)
    try {
        if (user && user.user_id === Number(userId)) {
            const activatedUser = await getWishListByUserId(user.user_id, {
                active: true
            });
            res.send({ 
                message: 'successfully retrieved user wishlist',
                activatedUser 
            });
            console.log("Activated User: ", activatedUser);
        } else {
            next({
                name: "ActivateUserError",
                message: "You cannot find a wishlist that is not yours"
            })
        };
    } catch ({ error, message }) {
        next({ error, message });
    };
});

wishlistRouter.patch('/', requireUser, async (req, res, next) => {
    const { userId } = req.params;
    const user = req.user;
    console.log("UserId: ", userId)
    console.log('Req.user: ', req.user)
    console.log("Req.user.id: ", req.user.user_id)
    try {
        if (user && user.user_id === Number(userId)) {
            const activatedUser = await updateWishListByUserId(user.user_id, {
                active: true
            });
            res.send({ 
                message: 'successfully updated user wishlist',
                activatedUser 
            });
            console.log("Activated User: ", activatedUser);
        } else {
            next({
                name: "ActivateUserError",
                message: "You cannot update a wishlist that is not yours"
            })
        };
    } catch ({ error, message }) {
        next({ error, message });
    };
});

module.exports = wishlistRouter;
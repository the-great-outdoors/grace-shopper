const { requireUser } = require('./utils');

const wishlistRouter = require('express').Router();

const {
createWishListByUserId,
updateWishListByUserId,
getWishListByUserId,
deleteWishListByUserId,
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

wishlistRouter.post('/:userId', requireUser, async (req, res, next) => {
    const { userId } = req.params;
    const user = req.user;
    console.log("UserId: ", userId)
    console.log('Req.user: ', req.user)
    console.log("Req.user.id: ", req.user.user_id)

    const { title, merchId } = req.body;
    const wishlistData = {
        title,
        merchID: req.merch.id,
        userId: req.user.id,
    }

    try {
        if (user && user.user_id === Number(userId)) {
            const activatedUser = await createWishListByUserId(user.user_id, {
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
                message: "Must be logged in to create wishlist"
            })
        };
    } catch ({ error, message }) {
        next({ error, message });
    };
});

wishlistRouter.delete('/', requireUser, async (req, res, next) => {
    try {
      const wishlist = await getWishListByUserId(req.params.wishId);
  
      if (wishlist && wishlist.userId === req.user.id) {
        const updatedWishlist = await deleteWishListByUserId(wishlist.id, { active: false });
  
        res.send({ post: deleteWishListByUserId });
      } else {
        // if there was a wishlist, throw UnauthorizedUserError, otherwise throw WishListNotFoundError
        next(post ? { 
          name: "UnauthorizedUserError",
          message: "You cannot delete a wishlist which is not yours"
        } : {
          name: "WishListNotFoundError",
          message: "That wishlist does not exist"
        });
      }
  
    } catch ({ name, message }) {
      next({ name, message })
    }
  });

module.exports = wishlistRouter;
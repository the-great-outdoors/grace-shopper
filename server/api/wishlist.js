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

wishlistRouter.get('/:userId', async(req, res, next)=>{
    const { userId } = req.params;
   console.log('welcome to wishlist route', userId);
    try {
       
        const wishlistitem = await getWishListByUserId(userId);
        console.log('wishlist item begin', wishlistitem)
            if (wishlistitem)     {
                console.log('begin res.send in wishlist');
        res.send({ 
                message: 'successfully retrieved user wishlist',
                wishlistitem
            });
        } else {
            next({
                name: "WishListRetrievalError",
                message: "You cannot find a wishlist"
            })
        };
    } catch ({ error, message }) {
        next({ error, message });
    };
});

wishlistRouter.patch('/:userId', requireUser, async (req, res, next) => {
    const { userId } = req.params;
    const user = req.user;
    const {title} = req.body;
    console.log("UserId: ", userId)
    console.log('Req.user: ', req.user)
    console.log("Req.user.id: ", req.user.user_id)
    try {
        if (user && user.user_id === Number(userId)) {
            const updatedwishlist = await updateWishListByUserId(user.user_id, {
                title
            });
            res.send({ 
                data: updatedwishlist,
                message: 'successfully updated user wishlist',
                status: true,
            });
            console.log("wishlist ", updatedwishlist);
        } else {
            next({
                name: "UpdateWishlistError",
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
        merchId,
        userId
    }

    try {
        if (user && user.user_id === Number(userId) && !merchId) {
            const wishlistitem= await createWishListByUserId(wishlistData);

            res.send({ 
                message: 'successfully updated user wishlist',
                wishlistitem 
            });
            console.log("wishlistitem log", wishlistitem);
        } else {
            next({
                name: "CreateWishListItemError",
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
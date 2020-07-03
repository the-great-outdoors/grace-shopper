# grace-shopper

Routes (API ROUTERS):


1. Users
    /api/users/login    POST getUserByUsername
    /api/users/register POST createUser
    /api/users/username/account PATCH updateUserByUserId
    /api/users/username/account/orderhistory POST getUserOrdersByUserId
    /api/users/username/account/currentcart POST getUserOrdersByUserId
    /api/users/:userId/blogs GET getBlogsByUserId


2. Merchandise
    /api/merchandise
    /api/merchandise/category GET getMerchandiseByCategory
    /api/merchandise/category/:merchid
    /api/merchandise/:merchid
    /api/merchandise/:merchId/blog
    api/merchandise/blog
    api/merchandise/:category/blog
    

5. API
    /api


7. Cart
    /api/cart
    /api/cart/:merchandiseId
    /api/cart/:userId
    
# grace-shopper


Team Availability:
Patricia: M-F 6:30 - 10PM  WKEND: 4AM-12PM
Levi: M-F 4:30 - 11PM WKEND: 2AM-1AM
Sean: M-F 2PM - 9PM WKEND: 10AM- All day
Garrett: M-F 6:30PM - 10PM (please confirm)


NEXT STEPS:
1. Sean is working on searchbar. Hoping to work by Saturday, July 11th.
2. Sean and Garrett will work on more front page gui stuff.  Figure out how to add products to cart!!!!
3. Patricia and Levi to wire up Modal. register a user and update user prefs.
4. Patricia finish writing update and delete blogs in DB. GUI!!!!

Routes (API ROUTERS):

1. 

Users
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
    

    Meaningless change here. 
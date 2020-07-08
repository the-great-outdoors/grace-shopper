const { db } = require('./database');

const chalk = require('chalk');

//table: blogs !!!!!!!!!

// --Patricia

    //getAllBlogs
    
    //getBlogsByUserId(userId)

    //getBlogByMerchId(merchId)

    //getBlogByCategoryId(categoryId)

    //creatBlog(userId)

    //updateBlog(blogId)

    //deleteBlog(blogId)

//table: merchandise !!!!!!!


//table: orders !!!!!!!!

// -- Garett
    //addMerchandiseToCart(merchId, userId)

    //getUserOrdersByUsername(username)

    //getUserOrdersByUserId(userId)

    //updateUserOrderByOrderId(orderId)

//table: wishList !!!!!!!!

// -- Patricia

    //updateWishlistByUserId(userId, fields={'merchIds'})

    //getWishlistByUserId(userId)

//table: userPreferences !!!!!!!!

//table: payments !!!!!!!!

//--Garett

    //getPaymentByUserId(userId)

    //updatePayment(userId)

    //deletePayment(userId)

    //createPayment(userId)

    module.exports={
        db,
        ...require('./users'),
        ...require('./userprefs'),
        ...require('./merch'),
        ...require('./payments')
    }










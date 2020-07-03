const { client } = require('pg');
const chalk = require('chalk');

const connectionString = process.env.DATABASE_URL ||"postgres://localhost:5432//great-outdoors";

const db = new client(connectionString);

//table: users !!!!!!!

    //createUser(userName, password)

    //updateUserByUserId(userId)

    //deleteAccount(userId)

    //getUserByUserId(userId)

    //getUserByUsername(userName)

//table: blogs !!!!!!!!!
    //getAllBlogs
    
    //getBlogsByUserId(userId)

    //getBlogByMerchId(merchId)

    //getBlogByCategoryId(categoryId)

    //creatBlog(userId)

    //updateBlog(blogId)

    //deleteBlog(blogId)

//table: merchandise !!!!!!!
    //gerMerchandiseByName(merchName)

    //getMerchandiseById(merchId)

    //getMerchandiseByCategory(catId)

    //getAllMerchandise

    //getAllMerchandiseReviews(merchId)

    //getMerchandiseReviewByUserId(userId)


    //updateMerchandiseReview(reviewId, fields={})

    //createMerchandise(name, desc, price)

    //updateMerchandise(merchId, fields={})

    //createMerchandiseReview(merchId, fields={})

    //deleteMerchandise(merchId)

    //deleteMerchandiseReview(reviewId)


//table: orders !!!!!!!!
    //addMerchandiseToCart(merchId, userId)

    //getUserOrdersByUsername(username)

    //getUserOrdersByUserId(userId)

    //updateUserOrderByOrderId(orderId)

//table: wishList !!!!!!!!

    //updateWishlistByUserId(userId, fields={'merchIds'})

    //getWishlistByUserId(userId)

//table: userPreferences !!!!!!!!

    //getPreferencesByUserId(userId)
    
    //updateUserPreferencesByUserId(userId)

    //createUserPreference(userId)

    //deleteUserPreferenceByUserId(userId)

//table: payments !!!!!!!!

    //getPaymentByUserId(userId)

    //updatePayment(userId)

    //deletePayment(userId)

    //createPayment(userId)











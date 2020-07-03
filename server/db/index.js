const { Client } = require('pg');
const chalk = require('chalk');

const connectionString = process.env.DATABASE_URL ||"postgres://localhost:5432/great-outdoors";

const db = new Client(connectionString);

//table: users !!!!!!!

// --- LEVI

    //createUser(userName, password)

    //updateUserByUserId(userId)

    //deleteAccount(userId)

    //getUserByUserId(userId)

    //getUserByUsername(userName)

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

// -- Sean 

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

// -- Levi

    //getPreferencesByUserId(userId)
    
    //updateUserPreferencesByUserId(userId)

    //createUserPreference(userId)

    //deleteUserPreferenceByUserId(userId)

//table: payments !!!!!!!!

//--Garett

    //getPaymentByUserId(userId)

    //updatePayment(userId)

    //deletePayment(userId)

    //createPayment(userId)

    module.exports={db}










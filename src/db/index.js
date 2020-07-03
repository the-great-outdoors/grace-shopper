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

    //getAllMerchandise
async function getAllMerchandise() {
    const { rows: [ merchIds ] } = await db.query(`
        SELECT merch_id FROM merchandise;
    `)

    const merchandise = await Promise.all(merchIds.map((merch)=>getMerchandiseById(merch.merch_id)))

    return merchandise;
}

    //gerMerchandiseByName(merchName)
async function getMerchandiseByName(merchName) {
    const { rows: [ merchandise ] } = await db.query(`
        SELECT * FROM merchandise
        WHERE name LIKE $1;
    `, [merchName]);

    return merchandise;
}  

    //getMerchandiseById(merchId)

    async function getMerchandiseById(merchId) {
        const { rows: [ merchandise ] } = await db.query(`
            SELECT * FROM merchandise
            WHERE merch_id = $1;
        `, [merchId]);

        const reviews = db.query(`
            SELECT * FROM reviews
            WHERE merchId = $1;
        `, [merchId])

        merchandise.reviews = reviews;
        return merchandise;

    }  
    //getMerchandiseByCategory(catId)

    async function getMerchandiseByCategory(catId) {
        const { rows: [merchandise] } = await db.query(`
            SELECT * FROM merchandise
            WHERE cats = $1;
        `, [catId]);

        return merchandise;
    }

    //getAllMerchandiseReviews(merchId)

    async function getAllMerchandiseReviews(merchId) {
        const { rows: [merchandise] } = await db.query(`
            SELECT * FROM merchandise
            JOIN reviews ON merchandise.merch_id=reviews."merchId"
            WHERE merchId = $1;
        `, [merchId]);

        return merchandise;
    }
    //getMerchandiseReviewByUserId(userId)

    //updateMerchandiseReview(reviewId, fields={})

    //createMerchandise(name, desc, price)

    //updateMerchandise(merchId, fields={})

    //createMerchandiseReview(merchId, fields={})

    async function createMerchandise({name, description, price, rating=null, cat}) {
        const { rows: [reviews] } = await db.query(`
        UPDATE reviews
        INSERT VALUES($1, $2, $3, $4, $5 )
        RETURNING *;
    `, [name, description, price, rating, cat]);

        return reviews;
    }



    //deleteMerchandise(merchId)
    async function deleteMerchandise(merchId) {
        try {
            const {rows: [merchandise]} = await db.query(`
            DELETE FROM merchandise
            WHERE merch_id=${merchId}
            RETURNING *;
            `)

        return merchandise;

        } catch (error) {
            throw error;
        }
    }

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

    module.exports={
        db,
        createMerchandise,
        getAllMerchandiseReviews,
        getMerchandiseByCategory,
        getMerchandiseById,
        getMerchandiseByName,

    }










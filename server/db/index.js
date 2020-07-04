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

// -- Sean 

    //getAllMerchandise
async function getAllMerchandise() {
    const { rows: [ merchIds ] } = await db.query(`
        SELECT merch_id FROM merchandise;
    `)

    const merchandise = await Promise.all(merchIds.map((item)=>getMerchandiseById(item.merch_id)))

    console.log('new merchandise added: ', merchandise);
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
    async function getMerchandiseReviewByUserId(userId) {
        const {rows: [reviews] } = await db.query(`
        SELECT * FROM reviews
        WHERE author = ${userId};
        `);
    }

    //updateMerchandiseReview(reviewId, fields={})

    //updateMerchandise(merchId, fields={})
    async function updateMerchandise(itemId, fields={}) {
        const queryString = Object.keys(fields).map((key, index)=>{
            return `"${key}"=$${index+1}`
        }).join(',');

        const { rows: [item] } = await db.query(`
        UPDATE merchandise
        SET ${queryString}
        WHERE merch_id = ${itemId}
        RETURNING *;
        `, Object.values(fields));
    }

    //createMerchandiseReview(merchId, userId, rating)
    async function createMerchandiseReview(merchId, userId, rating, description) {

        console.log('Entered bd CreateMerchandiseReview');

        const {rows: [ review ]} = db.query(`
        INSERT INTO reviews("author", "merchId", rating, description)
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `, [userId, merchId, rating, description]);

        console.log('Created new review: ', review);
        return review;
    }


    async function addCategory(name) {
        try {

            console.log('entered addCategory with cat: ', name);
            const { rows: [category] }= await db.query(`
            INSERT INTO categories(name)
            VALUES('${name}')
            RETURNING *;
            `);

            return category;

        } catch (error) {
            throw error;
        }
    }

    async function createMerchandise({name, description, 
    price, rating=5, cat}) {
    
        try {

            console.log('Entered db createMerchandise');
            const { rows: [merchandise] } = await db.query(`
            INSERT INTO merchandise(name, description, price, rating, cats)
            VALUES($1, $2, $3, $4, $5 )
            RETURNING *;
        `, [name, description, price, rating, cat]);
            console.log('Successfully created merchandise');
            return merchandise;
        } catch (error) {
            throw error;
        }

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
        addCategory,
        updateMerchandise,
        createMerchandiseReview

        // ...require('./users'),
        // ...require('./userprefs')
    }










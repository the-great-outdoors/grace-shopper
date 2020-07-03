
//each teammember please create seed method to test your

const { db, createMerchandise, addCategory } = require('./index');
const faker = require('faker')
const chalk = require('chalk');

// const db = new Client(connectString);

async function dropTables(){

   try {
       console.log('dropping all tables...');
    await db.query(`
    DROP TABLE IF EXISTS payments;
    DROP TABLE IF EXISTS blogs;
    DROP TABLE IF EXISTS wishlist;
    DROP TABLE IF EXISTS userPreferences;
    DROP TABLE IF EXISTS orderItem;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS images;
    DROP TABLE IF EXISTS reviews;
    DROP TABLE IF EXISTS merchandise;
    DROP TABLE IF EXISTS categories;
    DROP TABLE IF EXISTS users;
    `)

    console.log('successfully dropped all tables');
   } catch (error) {
       throw error;
   } 

}

async function createTables(){

    try {

        console.log('Building new tables...');

        console.log('buidling users...')
        await db.query(`
        CREATE TABLE IF NOT EXISTS users(
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            hashpassword VARCHAR(255) NOT NULL,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL
        );`)

        console.log('creating categories');
        await db.query(`
        CREATE TABLE IF NOT EXISTS categories(
                cat_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );`)

            console.log('creating merchandise')
            await db.query(`
            CREATE TABLE IF NOT EXISTS merchandise(
                merch_id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                price MONEY NOT NULL,
                rating INTEGER,
                cats INTEGER REFERENCES categories(cat_id)
                
            );`)

        console.log('creating reviews')
        await db.query(`
        CREATE TABLE IF NOT EXISTS reviews(
            review_id SERIAL PRIMARY KEY,
            author INTEGER REFERENCES users(user_id) NOT NULL,
            merchId INTEGER REFERENCES merchandise(merch_id)NOT NULL,
            rating INTEGER DEFAULT 5
        );`)
        
   
        
        console.log('creating images')
        await db.query(`CREATE TABLE IF NOT EXISTS images(
            imageId SERIAL PRIMARY KEY,
            merch_id SERIAL REFERENCES merchandise(merch_id)
            
        );`)
        
        console.log('creatings blogs');
        await db.query(` CREATE TABLE IF NOT EXISTS blogs(
            blog_id SERIAL PRIMARY KEY,
            merchId INTEGER REFERENCES merchandise(merch_id),
            title VARCHAR(255) UNIQUE NOT NULL,
            "blogText" TEXT NOT NULL,
            "authorId" INTEGER REFERENCES users(user_id)
        );`)
       
        console.log('creating wishlist')
        await db.query(`CREATE TABLE IF NOT EXISTS wishlist(
            wish_id SERIAL PRIMARY KEY,
            "merchId" INTEGER REFERENCES merchandise(merch_id),
            title VARCHAR(255) UNIQUE NOT NULL,
            "userId" INTEGER REFERENCES users(user_id)
        );`)
        
        console.log('creating orderItem')
        await db.query(`CREATE TABLE IF NOT EXISTS orderItem(
            item_id SERIAL PRIMARY KEY,
             "merchId" INTEGER REFERENCES merchandise(merch_id),
             quantity INTEGER DEFAULT 1
         );`)
        
         console.log('creating orders')
        await db.query(`CREATE TABLE IF NOT EXISTS orders(
            userId INTEGER REFERENCES users(user_id)
        );`)
        
            console.log('creating userPreferences')
            await db.query(`CREATE TABLE IF NOT EXISTS userPreferences(
                preference_id SERIAL PRIMARY KEY,
                userId INTEGER REFERENCES users(user_id),
                street VARCHAR(255) NOT NULL,
                city TEXT NOT NULL,
                state TEXT NOT NULL,
                zip INTEGER NOT NULL,
                save_pmt BOOLEAN DEFAULT FALSE,
                shipping VARCHAR(255)
        
            );`)
        
            console.log('creating payemnts')
        await db.query(` CREATE TABLE IF NOT EXISTS payments(
            userId INTEGER REFERENCES users(user_id),
            name VARCHAR(255) NOT NULL,
            number INTEGER UNIQUE NOT NULL,
            CID INTEGER NOT NULL,
            expiration DATE NOT NULL
        );`)
       

        console.log('tables successfully built!');
    } catch (error) {
        throw error;
    }


}

async function testDB(){
    

}

async function startDb(){
    try {
        db.connect()
        .then(()=>
            dropTables()
        )
        .then(()=>
            createTables(),
        )
        .then(()=>testDB())
        .finally(()=>db.end()
        )

    } catch (error) {
        console.log(chalk.red("Error during buildDB"));
        throw error;
    }

}

startDb();


//Tables:

/*
    merchandise
    users
    blogs
    wishlist
    orders
    userPreferences
    payments


*/
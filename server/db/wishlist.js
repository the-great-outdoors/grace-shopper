const db = require('./database');

const { getUserByUserId } = require('./users');

async function createWishListByUserId(fields = {}){
    
    const id = fields.id
    delete fields.id
    
    const user = await getUserByUserId(userId)

        const setString = Object.keys(fields).map(
            (key, index) => `"${ key }"$${ index + 2}`
        ).join(', ');
        console.log(fields)
    try{
        const {rows: result} = await db.query(`
        INSERT INTO wishlist
        VALUES ${ setString }
        WHERE id= $1
        RETURNING *;
        `, [id, ...Object.values(fields)]);

        return result;

    }  catch(e) {
        console.log("User must be logged in to create wishlist", e);
    }
}

  //updateWishlistByUserId(userId, fields={'merchIds'})
async function updateWishListByUserId(fields = {}){
    
    const id = fields.id
    delete fields.id
    
    const user = await getUserByUserId(userId)

        const setString = Object.keys(fields).map(
            (key, index) => `"${ key }"$${ index + 1}`
        ).join(', ');
        console.log(fields)
    try{
        const {rows: result} = await db.query(`
        UPDATE wishlist
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;
        `,Object.values(fields));

        return result;

    }  catch(e) {
        console.error(e);
    }
}

    //getWishlistByUserId(userId)
async function getWishListByUserId(userId) {

    try {
        const user = await getUserByUserId(userId)

        const { rows } = await db.query(`
        SELECT *
        FROM wishlist
        WHERE wishlist."userId" = $1;
        `, [user.id]);

        for(let wish of rows) {

            const {rows: merch} = await db.query(`
            SELECT *
            FROM merchandise
            JOIN merchandise ON merchandise."merch_id" = merch.id
            WHERE "wish_id" = $1
            `, [wish.id])
            wish.merchandise = merch
        }

        return rows;
    }   catch(e) {
        console.error(e);
    }
}

async function deleteWishListByUserId(userId, wishId){
    
    const user = await getUserByUserId(userId)

    try{
        const {rows: result} = await db.query(`
        DELETE FROM wishlist
        WHERE "wish_id" = ${ wishId }
        RETURNING *;
        `);

        return result;

    }  catch(e) {
        console.error("must be logged in to remove wishlist", e);
    }
}

module.exports = {
    createWishListByUserId,
    updateWishListByUserId,
    getWishListByUserId,
    deleteWishListByUserId,
}
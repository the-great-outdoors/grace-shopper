const db = require('./database');

const { getUserByUserId } = require('./users');

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

module.exports = {
    updateWishListByUserId,
    getWishListByUserId,
}
const db = require('./database');

//getUserOrdersByUsername(username)

async function getUserOrdersByUsername(userName) {
    try {
        const { rows: [ orders ] } = await db.query(`
        SELECT * FROM orders
        WHERE username=$1;
    `, [userName]);

        return orders; 
    } catch (error) {
        throw error;
    }
};

//getUserOrdersByUserId(userId)

async function getUserOrdersByUserId(userId) {
    try {
        const { rows: [ orders ] } = await db.query(`
        SELECT * FROM orders
        WHERE id=$1;
    `, [userId]);

        return orders;  
    } catch (error) {
        throw error; 
    }
};

//updateUserOrderByOrderId(orderId)

async function updateUserOrderByOrderId(orderId, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if (setString.length === 0) {
        return;
    };

    try {
        const { rows: [ order ] } = await client.query(`
            UPDATE orders
            SET ${ setString }
            WHERE id=${ orderId }
            RETURNING *;
        `, Object.values(fields));

        return order;
    } catch (error) {
        throw error;
    };
};


module.exports = {
    getUserOrdersByUsername,
    getUserOrdersByUserId,
    updateUserOrderByOrderId
}
const db = require('./database');

//createPayment(userId)

async function createPayment({userId, name, number, cid, expiration}) {
    try {
        const { rows: [payment] } = await db.query(`
        INSERT INTO payments("userId", name, number, cid, expiration)
        VALUES($1, $2, $3, $4, $5)
        RETURNING *;
    `, [userId, name, number, cid, expiration]);

        return payment;
    } catch (error) {
        throw error;
    }     
}

//getPaymentByUserId(userId)

async function getPaymentsByUserId(userId) {
    try {
        const { rows: [ payments ] } = await db.query(`
        SELECT * FROM payments
        WHERE id=$1;
    `, [userId]);

        return payments;  
    } catch (error) {
        throw error;
    }
};

//deletePayment(userId)

async function deletePayment(userId) {
    try {
        const {rows: [paymnets]} = await db.query(`
        DELETE FROM payments
        WHERE user_id=$1
        RETURNING *;
        `, [userId]);

        return paymnets;

    } catch (error) {
        throw error;
    }
}

//updatePayments

async function updatePayments(userId, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if (setString.length === 0) {
        return;
    };

    try {
        const { rows: [ payment ] } = await client.query(`
            UPDATE payments
            SET ${ setString }
            WHERE id=${ userId }
            RETURNING *;
        `, Object.values(fields));

        return payment;
    } catch (error) {
        throw error;
    };
};

module.exports = {
    createPayment,
    getPaymentsByUserId,
    deletePayment,
    updatePayments
}
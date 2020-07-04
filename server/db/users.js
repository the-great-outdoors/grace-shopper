const db = require('./database');

//table: users !!!!!!!

// --- LEVI

//createUser(userName, password)
async function createUser({ username, hashpassword, firstname, lastname }) {

    try {
        const { rows: [user] } = await db.query(`
                INSERT INTO users(username, hashpassword, firstname, lastname) 
                VALUES($1, $2, $3, $4) 
                ON CONFLICT (username) DO NOTHING 
                RETURNING *;
            `, [username, hashpassword, firstname, lastname]);

        return user;
    } catch (error) {
        throw error;
    };

};

//updateUserByUserId(userId)
async function updateUser(userId, fields = {}) {

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if (setString.length === 0) {
        return;
    };

    try {
        const { rows: [ user ] } = await db.query(`
            UPDATE users
            SET ${ setString }
            WHERE id=${ userId }
            RETURNING *;
        `, Object.values(fields));

        return user;
    } catch (error) {
        throw error;
    };

};

//deleteAccount(userId)
// async function deleteUser(userId) {
//     try {
//         await db.query(`
//             DELETE *
//             FROM users
//             WHERE user_id=${ userId };
//         `);

//     } catch (error) {
//         throw error;
//     };
// };

//getUserByUserId(userId)
async function getUserByUserId(userId) {

    try {
        const { rows: [ user ] } = await db.query(`
            SELECT id, username, firstname, lastname, active
            FROM users
            WHERE user_id=${ userId }
        `);

        return user;
    } catch (error) {
        throw error;
    };

};

//getUserByUsername(userName)
async function getUserByUsername(username) {

    try {
        const { rows: [ user ] } = await db.query(`
            SELECT id, username, firstname, lastname, active
            FROM users
            WHERE username=${ username }
        `);

        return user;
    } catch (error) {
        throw error;
    };

};

async function getAllUsers() {

    try {
        const { rows } = await db.query(`
            SELECT user_id, username, firstname, lastname, active
            FROM users
    `);

        return rows;
    } catch (error) {
        throw error;
    };

};

module.exports = {
    createUser,
    updateUser,
    getUserByUserId,
    getUserByUsername,
    getAllUsers,
};
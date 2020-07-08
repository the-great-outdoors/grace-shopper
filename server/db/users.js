const db = require('./database');
const { getPreferencesByUserId } = require('./userprefs');

//table: users !!!!!!!

// --- LEVI

//createUser(userName, password)
async function createUser({ username, hashpassword, firstname, lastname }) {

    try {
        const { rows: [ user ] } = await db.query(`
                INSERT INTO users(username, hashpassword, firstname, lastname) 
                VALUES($1, $2, $3, $4) 
                ON CONFLICT (username) DO NOTHING 
                RETURNING *;
            `, [ username, hashpassword, firstname, lastname ]);

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
            WHERE user_id=${ userId }
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
//             WHERE user_id=$1;
//         `, [ userId ]);

//     } catch (error) {
//         throw error;
//     };
// };

//getUserByUserId(userId)
async function getUserByUserId(userId) {

    try {
        const { rows: [ user ] } = await db.query(`
            SELECT user_id, username, firstname, lastname, active
            FROM users
            WHERE user_id=$1;
        `, [ userId ]);

        const { rows: [ userPreferences ] } = await db.query(`
            SELECT *
            FROM userPreferences
            WHERE "userId"=$1;
        `, [ userId ]);

        user.userPreferences = userPreferences
        
        return user;
    } catch (error) {
        throw error;
    };

};

//getUserByUsername(userName)
async function getUserByUsername(username) {

    try {
        const { rows: [ user ] } = await db.query(`
            SELECT *
            FROM users
            WHERE username=$1
        `, [ username ]);

        return user;
    } catch (error) {
        throw error;
    };

};

async function getAllUsers() {

    console.log("IN GETALLUSERS")
    try {
        const { rows: userIds } = await db.query(`
            SELECT user_id, username, firstname, lastname, active
            FROM users;
    `);

    console.log(">>>USERIDS<<<", userIds);

    const users = await Promise.all(userIds.map(
        user => getUserByUserId(user.user_id)
    ));

    console.log(">>>USERS<<<", users);

        return users;
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
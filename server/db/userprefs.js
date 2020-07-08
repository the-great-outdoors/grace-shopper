const db = require('./database');

// CREATE TABLE IF NOT EXISTS userPreferences(
//     preference_id SERIAL PRIMARY KEY,
//     userId INTEGER REFERENCES users(user_id),
//     street VARCHAR(255) NOT NULL,
//     city TEXT NOT NULL,
//     state TEXT NOT NULL,
//     zip INTEGER NOT NULL,
//     save_pmt BOOLEAN DEFAULT FALSE,
//     shipping VARCHAR(255)

//createUserPreference(userId)
async function createUserPreferences({ userId, street, city, state, zip, save_pmt, shipping }) {

    try {

        console.log('Creating user preferences...');
        console.log(userId, street, city, state, zip, save_pmt, shipping)
        const { rows: [ userPreferences ] } = await db.query (`
            INSERT INTO userPreferences("userId", street, city, state, zip, save_pmt, shipping)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `, [ userId ,street, city, state, zip, save_pmt, shipping ]);

        console.log('UP!!', userPreferences);
        return userPreferences;
    } catch (error) {
        throw error;
    };

};

//updateUserPreferencesByUserId(userId)
async function updateUserPreferences(userId) {

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if (setString.length === 0) {
        return;
    };

    try {
        const { rows: [ userPreferenes ] } = await db.query(`
            UPDATE usersPreferences
            SET ${ setString }
            WHERE id=${ userId }
            RETURNING *;
        `, Object.values(fields));

        return userPreferenes;
    } catch (error) {
        throw error;
    };

};

//getPreferencesByUserId(userId)
async function getUserPreferencesByUserId(userId) {

    try {
        const { rows: [ userPreferences ] } = await db.query(`
            SELECT * FROM userPreferences
            JOIN userPreferences ON users.user_id=userPreferences="userId"
            WHERE userId = $1;
        `, [ userId ]);

        return userPreferences;
    } catch (error) {
        throw error;
    };

};

//deleteUserPreferenceByUserId(userId)
async function deleteUserPreferences(userId) {

    try {
        await db.query(`
            DELETE *
            FROM userPreferences
            WHERE userId=$1;
    `, [ userId ]);

    } catch (error) {
        throw error;
    };

};

module.exports = {
    createUserPreferences,
    updateUserPreferences,
    getUserPreferencesByUserId,
    deleteUserPreferences
};
const db = require('./database');
const { getUserByUserId, } = require('./users')
const { getMerchandiseById, getMerchandiseByCategory } = require('./merch')

//getAllBlogs
async function getAllBlogs() {

    try {
        const { rows } = await db.query(`
            SELECT *
            FROM blogs;
    `);

        return rows;
    } catch (e) {
        console.error(e)
    };
};

//getBlogsByUserId(userId)
async function getBlogByUserId(userId) {
    try {

        const { rows: [blog] } = await db.query(`
            SELECT *
            FROM blogs
            WHERE "authorID"=$1;
        `, [userId]);

        return blog;
    } catch (e) {
        console.error(e)
    };
};

//getBlogByMerchId(merchId)
async function getBlogByMerchId(merchId) {
    try {
        const { rows } = await db.query(`
            SELECT *
            FROM blogs
            WHERE "merchID"=$1;
        `, [merchId]);

        return rows;
    } catch (e) {
        console.error(e)
    };
};

//getBlogByCategoryId(categoryId)
// async function getBlogByCategoryId(catId) {
//     try {
//         const user = await getMerchandiseByCategory(catId)

//         const { rows } = await db.query(`
//         SELECT *
//         FROM blogs
//         WHERE blogs."merchID" = $1 AND cat_id = $1;
//         `, [catId]);

//         return rows;
//     } catch (e) {
//         console.error(e)
//     };
// };

//creatBlog(userId)
async function createBlog({
    merchId,
    title,
    blogText,
    authorId
}) {
    try {
        const { rows } = await db.query(`
            INSERT INTO blogs ("merchId", title, "blogText", "authorId")
            VALUES($1, $2, $3, $4)
            RETURNING *;
        `, [merchId, title, blogText, authorId]);

        return rows;
    } catch (e) {
        console.error(e);
    };
};

//updateBlog(blogId)
async function updateBlog(blogId, fields = {}) {

    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');
    console.log(fields)

    console.log(setString)
    //return early if this is called wihtout fields
    if (setString.length === 0) {
        return;
    };

    try {
        const { rows: [result] } = await db.query(`
            UPDATE blogs
            SET ${ setString} 
            WHERE blog_id=${blogId }
            RETURNING *;
        `, Object.values(fields));

        return result;
    } catch (e) {
        console.error(e);
    };
};

//deleteBlog(blogId)
async function deleteBlog(blogId) {
    try {
        await db.query(`
            DELETE FROM blogs
            WHERE blog_id= ${blogId}
        `, [blogId]);
    } catch (e) {
        console.error(e);
    };
};


module.exports = {
    getAllBlogs,
    getBlogByUserId,
    getBlogByMerchId,
    // getBlogByCategoryId,
    createBlog,
    updateBlog,
    deleteBlog,
};
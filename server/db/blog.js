const db = require('./database');
const { getUserByUserId, } = require('./users')
const { getMerchandiseById, getMerchandiseByCategory } = require('./merch')

    //getAllBlogs
async function getAllBlogs() {
    const { rows } = await db.query(`
    SELECT *
    FROM blogs;
    `);

    return rows;
}

  //getBlogsByUserId(userId)
async function getBlogByUserID(userId) {
    try {
        const user = await getUserByUserId(userId)

        const { rows } = await db.query(`
        SELECT *
        FROM blogs
        WHERE blogs."authorID" = $1;
        `, [user.id]);

        return rows;
    } catch (e) {
        console.error(e)
    }
}

    //getBlogByMerchId(merchId)
async function getBlogByMerchID(MerchId) {
    try {
        const user = await getMerchandiseById(MerchId)

        const { rows } = await db.query(`
        SELECT *
        FROM blogs
        WHERE blogs."merchID" = $1;
        `, [merch.id]);

        return rows;
    } catch (e) {
        console.error(e)
    }
}

    //getBlogByCategoryId(categoryId)
async function getBlogByCategoryId(cat_id) {
    try {
        const user= await getMerchandiseByCategory(cat_id)

        const { rows } = await db.query(`
        SELECT *
        FROM blogs
        WHERE blogs."merchID" = $1 AND cat_id = $1;
        `, [cat.id]);

        return rows;
    } catch (e) {
        console.error(e)
    }
}

    //creatBlog(userId)
async function createBlog({
    merchId,
    title,
    blogText,
    authorId
})  

    {
    try {
        const { rows } = await db.query(`
        INSERT INTO blogs ( "merchId", title, "blogText", "authorId")
        VALUES($1, $2, $3, $4)
        
        RETURNING "merchId", title, "blogText", "authorId";
        `, [ merchId, title, blogText, authorId ]);

        return rows;
    }   catch (e) {
        console.error(e);
    }
}

    //updateBlog(blogId)
async function updateBlog(fields = {}) {
    const id = fields.id
    delete fields.id

    const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1}`
    ).join(', ');
    console.log(fields)

    console.log(setString)
    //return early if this is called wihtout fields
    if (setString.length === 0) {
        return:
    }

    try {
        const {rows: result} = await db.query(`
        UPDATE blogs
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;
        `, Object.values(fields));

        return result;
    }   catch (e) {
        console.error(e);
    }
}

    //deleteBlog(blogId)
async function deleteBlog(blogId) {
    try {
        const { rows: [blog] } = await db.query(`
            DELETE FROM blogs
            WHERE "blog_id" = ${ BlogId }
            RETURNING *;
        `);
        console.log('Blog deleted:', blog);

        return blog;
    } catch(e) {
        console.error(e);
    }
}


module.exports = {
    getAllBlogs,
    getBlogByUserID,
    getBlogByMerchID,
    getBlogByCategoryId,
    createBlog,
    updateBlog,
    deleteBlog,
}
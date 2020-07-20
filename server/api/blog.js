const blogRouter = require('express').Router();
const { requireUser } = require('./utils');

const {
    getAllBlogs,
    getBlogByUserId,
    getBlogByMerchId,
    getBlogByCategoryId,
    createBlog,
    updateBlog,
    deleteBlog,
} = require('../db');

blogRouter.use((req, res, next) => {
    console.log('A request is being made to /blog');
    next();
});


blogRouter.get('/', async (req, res, next) => {
    console.log('Entered get all blogs route...');

    const blogs = await getAllBlogs();

    res.send({
        message: 'Successfully retrieved all blogs.',
        blogs
    })
});

blogRouter.get('/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const user = req.user;
    console.log("UserId: ", userId);
    console.log('Req.user: ', req.user);
    console.log("Req.user.id: ", req.user.user_id);

    try {
        const userBlogs = await getBlogByUserId(user.user_id);

        if (userBlogs) {
            res.send({
                message: 'Successfully retrieved user blogs.',
                userBlogs
            });
            console.log("User Blogs: ", userBlogs);
        } else {
            next({
                name: "BlogRetrievalError",
                message: "Error retrieving user blogs."
            })
        };
    } catch ({ error, message }) {
        next({ error, message });
    };
});

blogRouter.get('/:merchId', async (req, res, next) => {
    const { merchId } = req.params;

    try {
        const blog = await getBlogByMerchId(merchId);

        if (blog) {
            res.send({
                message: 'Successfully retrieved blog',
                blog
            })
        } else {
            next({
                error: 'FailedToRetrieveBlogError',
                message: `Unable to retrieve blog by id:${merchId} `
            })
        }
    } catch ({ error, message }) {
        next({ error, message })
    }
});

blogRouter.get('/', async (req, res, next) => {
    const { blogId } = req.params;

    try {
        const blog = await getBlogByCategoryId(catId);

        if (blog) {
            res.send({
                message: 'Successfully retrieved blog',
                blog
            })
        } else {
            next({
                error: 'FailedToRetrieveBlogError',
                message: `Unable to retrieve blog by id:${catId} `
            })
        }
    } catch ({ error, message }) {
        next({ error, message })
    }
});

blogRouter.patch('/', requireUser, async (req, res, next) => {
    const { userId } = req.params;
    const user = req.user;
    console.log("UserId: ", userId)
    console.log('Req.user: ', req.user)
    console.log("Req.user.id: ", req.user.user_id)
    try {
        if (user && user.user_id === Number(userId)) {
            const activatedUser = await updateBlog(user.user_id, {
                active: true
            });
            res.send({ activatedUser });
            console.log("Activated User: ", activatedUser);
        } else {
            next({
                name: "ActivateUserError",
                message: "You cannot update a blog that is not yours"
            })
        };
    } catch ({ error, message }) {
        next({ error, message });
    };
});

blogRouter.post('/', async (req, res, next) => {
    const {
        merchId,
        title,
        blogText,
        authorId } = req.body;

    try {
        const blog = await createBlog({
            merchId,
            title,
            blogText,
            authorId
        });

        if (blog) {
            res.send({
                message: 'successfully created new blog',
                blog
            });

        } else {
            next({
                error: 'FailedToCreateBlog',
                message: 'Unable to create new blog'
            });
        }

    } catch ({ error, message }) {
        next({ error, message });
    }
});

blogRouter.delete('/', async (req, res, next) => {
    const { blogId } = req.params;

    try {
        const blog = await deleteBlog(blogId);
        if (blog) {
            res.send({
                message: `Successfully deleted blog: ${blogId}`,
                blog
            })
        } else {
            next({
                error: 'FailedToDeleteBlogError',
                message: 'Unable to delete blog'
            })
        }

    } catch ({ error, message }) {
        next({ error, message });
    }
});

module.exports = blogRouter;
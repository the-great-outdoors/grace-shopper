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


blogRouter.get('/', async (req, res, next)=>{
    console.log('Entered GET /blog');

    const blog = await getAllBlogs();

    res.send({
        message: 'successfully retrieved all blogs',
        blog

    })
});

blogRouter.get('/', async(req, res, next)=>{
    const { userId } = req.params;
    const user = req.user;
    console.log("UserId: ", userId)
    console.log('Req.user: ', req.user)
    console.log("Req.user.id: ", req.user.user_id)
    try {
        if (user && user.user_id === Number(userId)) {
            const activatedUser = await getBlogByUserId(user.user_id, {
                active: true
            });
            res.send({ 
                message: 'successfully retrieved user blogs',
                activatedUser 
            });
            console.log("Activated User: ", activatedUser);
        } else {
            next({
                name: "ActivateUserError",
                message: "You cannot find a blog that is not yours"
            })
        };
    } catch ({ error, message }) {
        next({ error, message });
    };
});

blogRouter.get('/', async(req, res, next)=>{
    const { blogId } = req.params;

    try {
        const blog = await getBlogByMerchId(merchId);

        if (blog) {
            res.send({
                message: 'Successfully retrieved blog',
                blog
            })
        }else{
            next({
                error: 'FailedToRetrieveBlogError',
                message:`Unable to retrieve blog by id:${merchId} `
            })
        }
    } catch ({error, message}) {
        next({error, message})
    }
});

blogRouter.get('/', async(req, res, next)=>{
    const { blogId } = req.params;

    try {
        const blog = await getBlogByCategoryId(catId);

        if (blog) {
            res.send({
                message: 'Successfully retrieved blog',
                blog
            })
        }else{
            next({
                error: 'FailedToRetrieveBlogError',
                message:`Unable to retrieve blog by id:${catId} `
            })
        }
    } catch ({error, message}) {
        next({error, message})
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

blogRouter.post('/', async(req, res, next)=>{
    const {
    merchId,
    title,
    blogText,
    authorId} = req.body;

    try {
        const blog = await createBlog({
            merchId,
            title,
            blogText,
            authorId});

    if(blog){
        res.send({
            message: 'successfully created new blog',
            blog
            });

    }else{
        next({
            error: 'FailedToCreateBlog',
            message: 'Unable to create new blog'
        });
    }
        
    } catch ({error, message}) {
        next({error, message});
    }
});

blogRouter.delete('/', async(req, res, next)=>{
    const { blogId } = req. params;

    try {
        const blog = await deleteBlog(blogId);
        if (blog) {
            res.send({
                message: `Successfully deleted blog: ${blogId}`,
                blog
            })
        }else{
            next({
                error: 'FailedToDeleteBlogError',
                message: 'Unable to delete blog'
            })
        }

    } catch ({error, message}) {
        next({error, message});
    }
});

module.exports = blogRouter;
const merchRouter = require('express').Router();

const { getAllMerchandise, getMerchandiseByCategory, getMerchandiseById, getMerchandiseByName, getMerchandiseReviewByUserId, createMerchandise, deleteMerchandise, deleteMerchandiseReview, addCategory, updateMerchandise, createMerchandiseReview, searchMerchandise } = require('../db')

merchRouter.get('/', async (req, res, next)=>{

    const merch = await getAllMerchandise();

    res.send({
        message: 'successfully retrieved all merchandise',
        status: true,
        merch

    })

})

merchRouter.post('/', async(req, res, next)=>{
    const {name, description, price, rating, cat} = req.body;
    try {
        const merch = await createMerchandise({name, description, price, rating, cat});
        if(merch){
            res.send({
                message: 'successfully created new item',
                status: true,
                merch
            })
        }else{
            next({
                error: 'FailedToCreateItemError',
                message: 'Unable to create new item'
            })
        }
        
    } catch ({error, message}) {
        next({error, message});
    }

})

merchRouter.delete('/review/:reviewId', async(req, res, next)=>{
    const {reviewId} = req.params;
    try {
        const review = await deleteMerchandiseReview(reviewId);

        if (review) {
            res.send({
                message: 'Successfully deleted review',
                status: true,
                review
            })
        }else{
            next({
                error: 'FailedToDeleteReviewError',
                message: `Unable to delete review: ${reviewId}`
            })
        }
    } catch ({error, message}) {
        next({error, message});
    }
})

merchRouter.post('/review/:merchId', async(req, res, next)=>{
    const { merchId} = req.params;
    const { userId, rating, description } = req.body;

    try {
        const review = await createMerchandiseReview(merchId,userId, rating, description);
        
        if (review) {
            res.send({
                message: `Successfully created new review for product id: ${merchId}`,
                status: true,
                data: review
            })
        }else{
            next({
                error: 'FailedToCreateNewReviewError',
                message: 'Unable to create new review'
            })
        }
    } catch ({error, message}) {
        next({error, message});
    }

})

merchRouter.post('/search', async(req, res, next)=>{
    console.log('Entered GET /search');
    const {name, description, price, rating, category} = req.body;

    console.log('req.body:', req.body);

    let params={};
    if(name){
        params.name=name;
    }
    if(description){
        params.description;
    }
    if (price) {
        params.price
    }
    if (rating) {
        params.rating
    }

    
    try {
        let resp;
        category? resp = await searchMerchandise(params,category):

        resp=await searchMerchandise(params);

        if (resp) {
            res.send({
                message:'Successfull search',
                status:true,
                data: resp
            })
        }else{
            next({error:'UnableToRetrieveSearchResultsError', message: 'Unable to retrieve search results. Please refine your search'})
        }

    } catch ({error, message}) {
        next({error, message})
    }

})

merchRouter.get('/search/:merchId', async(req, res, next)=>{
    const { merchId } = req.params;

    try {
        const merch = await getMerchandiseById(merchId);

        if (merch) {
            res.send({
                message: 'Successfully retrieved item',
                status: true,
                merch
            })
        }else{
            next({
                error: 'FailedToRetrieveItemByIdError',
                message:`Unable to retrieve item by id:${merchId} `
            })
        }
    } catch ({error, message}) {
        next({error, message})
    }
})

merchRouter.post('/:merchId', async(req, res, next)=>{
    const {name, description, price, rating, cat} = req.body;

    const { merchId } = req.params;

    let fields={};

    try {
        if(name){
            fields.name=name;
        }
    
        if (description) {
            fields.description=description;
        }
    
        if (price) {
            fields.price=price;
        }
    
        if (rating) {
            fields.rating=rating;
        }
        if (cat) {
            fields.cat=cat; 
        }
    
        const merch = await updateMerchandise(merchId, fields);
    
        if (merch) {
            res.send({
                message:'Successfully updated item',
                status: true,
                merch
        
            })
        }else{
            next({
                error: 'FailedToUpdateItemError',
                message: 'Unable to update item'
            })
        }
        
    } catch ({error, message}) {
        next({error, message});
    }

})

merchRouter.delete('/:merchId', async(req, res, next)=>{
    const { merchId} = req. params;

    try {
        const merch = await deleteMerchandise(merchId);
        if (merch) {
            res.send({
                message: `Successfully deleted item: ${merchId}`,
                status: true,
                merch
            })
        }else{
            next({
                error: 'FailedToDeleteItemError',
                message: 'Unable to delete item'
            })
        }

    } catch ({error, message}) {
        next({error, message});
    }
})




merchRouter.use((error, req, res, next) => {
    res.send(error);
});

module.exports = merchRouter
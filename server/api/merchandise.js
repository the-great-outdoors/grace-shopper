const merchRouter = require('express').Router();

const { getAllMerchandise, getMerchandiseByCategory, getMerchandiseById, getMerchandiseByName, getMerchandiseReviewByUserId, createMerchandise, deleteMerchandise, deleteMerchandiseReview, addCategory, updateMerchandise } = require('../db')

merchRouter.get('/', async (req, res, next)=>{
    console.log('Entered GET /merchandise');

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
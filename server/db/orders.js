const db = require('./database');

async function createOrder({userId, status=true, price}) {
    try {
        const { rows: [order] } = await db.query(`
        INSERT INTO orders("userId", status, price)
        VALUES($1, $2, $3)
        RETURNING *;
    `, [userId, status, price]);

        return order;
    } catch (error) {
        throw error;
    }     
}

async function createOrderItem(orderId, {merchId, quantity, price}) {
    console.log('in Db createOrderItem with order ID:', orderId,'with items: ',merchId, quantity, price);
    try {
       const { rows: [orderItem] } = await db.query(`
        INSERT INTO orderItem("merchId", quantity, price, "orderId")
        VALUES($1, $2, $3, $4)
        RETURNING *;
       `, [merchId, quantity, price, orderId]);
       
       console.log('New Item created for order: ', orderId, ':',orderItem);
       return orderItem
    } catch (error) {
        throw error;
    }
}

//getUserOrdersByUsername(username)

async function getUserOrdersByUsername(userName) {
    try {
        const { rows: [ orders ] } = await db.query(`
        SELECT * FROM orders
        WHERE username=$1;
    `, [userName]);

        return orders; 
    } catch (error) {
        throw error;
    }
};

//getUserOrdersByUserId(userId)

async function getUserOrdersByUserId(userId) {
    try {
        const { rows: [ orders ] } = await db.query(`
        SELECT * FROM orders
        WHERE id=$1;
    `, [userId]);

        return orders;  
    } catch (error) {
        throw error; 
    }
};

//updateUserOrderByOrderId(orderId)

async function updateUserOrderByOrderId(orderId, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if (setString.length === 0) {
        return;
    };

    try {
        const { rows: [ order ] } = await client.query(`
            UPDATE orders
            SET ${ setString }
            WHERE id=${ orderId }
            RETURNING *;
        `, Object.values(fields));

        return order;
    } catch (error) {
        throw error;
    };
};

async function deleteOrderByOrderId(orderId) {
   try {
    const {rows: [orderItems]} = await db.query(`
    DELETE FROM orderItem
    WHERE "orderId"=${orderId}
    RETURNING *;
    `);


    const {rows: [order]} = await db.query(`
    DELETE FROM orders
    WHERE id=${orderId}
    RETURNING *;
    `);

    order.items = orderItems;
    return order;
   } catch (error) {
       throw error; 
   }
 
}

async function deleteItemByOrderId(item_Id, orderId){
        console.log('Entered db deleteItemByOrderId');
        console.log('OrderId:',orderId, ' itemId:',item_Id  )
    try {
        const {rows:[item]} = await db.query(`
        DELETE from orderItem
        WHERE "orderId" = $1 AND
        item_id = $2
        RETURNING *;
        `, [orderId, item_Id]);
    
        console.log('Successfully deleted item: ', item);
        return item;

    } catch (error) {
        throw error; 
    }
   
}

module.exports = {
    getUserOrdersByUsername,
    getUserOrdersByUserId,
    updateUserOrderByOrderId,
    createOrder,
    createOrderItem,
    deleteItemByOrderId,
    deleteOrderByOrderId
}
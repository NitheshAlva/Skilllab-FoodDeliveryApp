const express = require('express');
const {
    addMenuItem,
    getMenuItems,
    placeOrder,
    getOrderDetails
} = require('./Controllers.js');
const router = express.Router();

// Menu Routes
router.post('/menu', addMenuItem);
router.get('/menu', getMenuItems);

// Order Routes
router.post('/orders', placeOrder);
router.get('/orders/:id', getOrderDetails);

module.exports = router;

const express = require("express");

const {
    placeOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
} = require("../controllers/orderController");

const router = express.Router();


// Place new order
router.post("/", placeOrder);


// Get all orders
router.get("/", getOrders);


// Get one order
router.get("/:id", getOrderById);


// Update order status
router.put("/:id/status", updateOrderStatus);


module.exports = router;
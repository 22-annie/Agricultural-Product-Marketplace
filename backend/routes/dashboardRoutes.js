const express = require("express");

const {
    getDashboardStats,
    getRecentOrders
} = require("../controllers/dashboardController");

const router = express.Router();


// Dashboard statistics
router.get("/stats", getDashboardStats);


// Recent orders
router.get("/recent-orders", getRecentOrders);


module.exports = router;
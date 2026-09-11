const db = require("../db");


// ================= DASHBOARD STATISTICS =================

const getDashboardStats = async (req, res) => {

    try {

        // Total products

        const [productResult] = await db.query(
            "SELECT COUNT(*) AS totalProducts FROM products"
        );


        // Total orders

        const [orderResult] = await db.query(
            "SELECT COUNT(*) AS totalOrders FROM orders"
        );


        // Total sales

        const [salesResult] = await db.query(
            `SELECT COALESCE(SUM(total), 0) AS totalSales
             FROM orders
             WHERE status != 'Cancelled'`
        );


        // Pending orders

        const [pendingResult] = await db.query(
            `SELECT COUNT(*) AS pendingOrders
             FROM orders
             WHERE status = 'Pending'`
        );


        // Completed orders

        const [completedResult] = await db.query(
            `SELECT COUNT(*) AS completedOrders
             FROM orders
             WHERE status = 'Completed'`
        );


        res.status(200).json({

            totalProducts: productResult[0].totalProducts,

            totalOrders: orderResult[0].totalOrders,

            totalSales: salesResult[0].totalSales,

            pendingOrders: pendingResult[0].pendingOrders,

            completedOrders: completedResult[0].completedOrders

        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to load dashboard"
        });
    }
};


// ================= RECENT ORDERS =================

const getRecentOrders = async (req, res) => {

    try {

        const [orders] = await db.query(
            `SELECT *
             FROM orders
             ORDER BY created_at DESC
             LIMIT 10`
        );


        res.status(200).json(orders);


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to load recent orders"
        });
    }
};


module.exports = {
    getDashboardStats,
    getRecentOrders
};
const db = require("../db");


// ================= PLACE ORDER =================

const placeOrder = async (req, res) => {

    const connection = await db.getConnection();

    try {

        const {
            customerName,
            phone,
            address,
            city,
            paymentMethod,
            items,
            total
        } = req.body;


        if (
            !customerName ||
            !phone ||
            !address ||
            !city ||
            !paymentMethod ||
            !items ||
            items.length === 0
        ) {
            return res.status(400).json({
                message: "All order information is required"
            });
        }


        await connection.beginTransaction();


        // Insert order

        const [orderResult] = await connection.query(
            `INSERT INTO orders
            (customer_name, phone, address, city, payment_method, total, status)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                customerName,
                phone,
                address,
                city,
                paymentMethod,
                total,
                "Pending"
            ]
        );


        const orderId = orderResult.insertId;


        // Insert order items

        for (let i = 0; i < items.length; i++) {

            const item = items[i];

            await connection.query(
                `INSERT INTO order_items
                (order_id, product_id, product_name, quantity, price)
                VALUES (?, ?, ?, ?, ?)`,
                [
                    orderId,
                    item.id,
                    item.name,
                    item.quantity,
                    item.price
                ]
            );
        }


        await connection.commit();


        res.status(201).json({
            message: "Order placed successfully",
            orderId: orderId
        });


    } catch (error) {

        await connection.rollback();

        console.error(error);

        res.status(500).json({
            message: "Failed to place order"
        });

    } finally {

        connection.release();
    }
};


// ================= GET ALL ORDERS =================

const getOrders = async (req, res) => {

    try {

        const [orders] = await db.query(
            `SELECT *
             FROM orders
             ORDER BY created_at DESC`
        );

        res.status(200).json(orders);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch orders"
        });
    }
};


// ================= GET SINGLE ORDER =================

const getOrderById = async (req, res) => {

    try {

        const orderId = req.params.id;


        const [orders] = await db.query(
            "SELECT * FROM orders WHERE id = ?",
            [orderId]
        );


        if (orders.length === 0) {

            return res.status(404).json({
                message: "Order not found"
            });

        }


        const [items] = await db.query(
            `SELECT *
             FROM order_items
             WHERE order_id = ?`,
            [orderId]
        );


        res.status(200).json({
            order: orders[0],
            items: items
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch order"
        });
    }
};


// ================= UPDATE ORDER STATUS =================

const updateOrderStatus = async (req, res) => {

    try {

        const orderId = req.params.id;

        const {
            status
        } = req.body;


        const [result] = await db.query(
            `UPDATE orders
             SET status = ?
             WHERE id = ?`,
            [
                status,
                orderId
            ]
        );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Order not found"
            });

        }


        res.status(200).json({
            message: "Order status updated successfully"
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update order status"
        });
    }
};


module.exports = {
    placeOrder,
    getOrders,
    getOrderById,
    updateOrderStatus
};
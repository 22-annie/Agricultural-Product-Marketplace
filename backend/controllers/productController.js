const db = require("../db");

// ================= GET ALL PRODUCTS =================

const getProducts = async (req, res) => {
    try {
        const [products] = await db.query(
            "SELECT * FROM products ORDER BY id DESC"
        );

        res.status(200).json(products);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch products"
        });
    }
};


// ================= GET SINGLE PRODUCT =================

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;

        const [products] = await db.query(
            "SELECT * FROM products WHERE id = ?",
            [id]
        );

        if (products.length === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json(products[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch product"
        });
    }
};


// ================= ADD PRODUCT =================

const addProduct = async (req, res) => {
    try {

        const {
            name,
            description,
            price,
            image,
            category,
            stock
        } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                message: "Product name and price are required"
            });
        }

        const [result] = await db.query(
            `INSERT INTO products
            (name, description, price, image, category, stock)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                name,
                description,
                price,
                image,
                category,
                stock
            ]
        );

        res.status(201).json({
            message: "Product added successfully",
            productId: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to add product"
        });
    }
};


// ================= UPDATE PRODUCT =================

const updateProduct = async (req, res) => {
    try {

        const id = req.params.id;

        const {
            name,
            description,
            price,
            image,
            category,
            stock
        } = req.body;

        const [result] = await db.query(
            `UPDATE products
             SET name = ?,
                 description = ?,
                 price = ?,
                 image = ?,
                 category = ?,
                 stock = ?
             WHERE id = ?`,
            [
                name,
                description,
                price,
                image,
                category,
                stock,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update product"
        });
    }
};


// ================= DELETE PRODUCT =================

const deleteProduct = async (req, res) => {
    try {

        const id = req.params.id;

        const [result] = await db.query(
            "DELETE FROM products WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete product"
        });
    }
};


module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};
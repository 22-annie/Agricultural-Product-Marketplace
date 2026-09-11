const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "agricultural_marketplace",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection()
    .then(connection => {
        console.log("MySQL Connected Successfully!");
        connection.release();
    })
    .catch(err => {
        console.error("Database connection failed:", err.message);
    });

module.exports = db;
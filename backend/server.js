const express = require("express");
const db = require("./db");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Agricultural Product Marketplace Backend is Running!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
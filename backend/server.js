const express = require("express");
const cors = require("cors");
const db = require("./db");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Agricultural Product Marketplace Backend is Running!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
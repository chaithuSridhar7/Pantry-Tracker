//Import libraries
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

// create the express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//Connect to PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

//Port number
const PORT = 5000;
//Test
app.get("/", (req, res) => {
    res.json({ message: "Pantry API is running!" });
});

//get all pantry items
app.get("/items", async (req, res) => {
    try{
        const result = await pool.query("SELECT * FROM items");
        res.json(result.rows);
    } catch (error){
        console.error(error);
        res.status(500).json({ error : "Database error"});
    }
});

//(POST)Add a pantry item
app.post("/items", async (req, res) => {
    const {
        name,
        brand,
        purchase_date,
        expiration_date,
        location,
        owner
    } = req.body;
    try{
        const result = await pool.query(
            `INSERT INTO items 
            (name, brand, purchase_date, expiration_date, location, owner)
            VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING *`,
            [
                name,
                brand,
                purchase_date,
                expiration_date,
                location,
                owner
            ]
        );
        res.jason(result.rows[0]);
    } catch(error){
        console.log(error);
        res.status(500).json({error: "Database error"});
    }
});

//(PUT) Update pantry items
app.put("/items/:id", async(req,res)=>{
    const { id } = req.params;

    const {
        brand,
        purchase_date,
        expiration_date,
        location,
        owner
    } = req.body;

    try {
        const result = await pool.query(
            `UPDATE items
            SET name=$1,
                brand=$2,
                purchase_date=$3,
                expiration_date=$4,
                location=$5,
                owner=$6
            WHERE id=$7
            RETURNING *`,
            [
                brand,
                purchase_date,
                expiration_date,
                location,
                owner,
                id
            ]
        );

        res.jason(result.rows[0]);
    } catch(error){
        console.log(error);
        res.status(500).json({
            error:"Database error"
        });
    }

;})

//(DELETE) delete pantry items
app.delete("/items/:id", async(req,res)=>{
    const {id}=req.params;

    try {
        await pool.query(
            "DELETE FROM items WHERE id=$1",
            [id]
        );

        res.json({
            message:"Item deleted"
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            error:"Database error"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

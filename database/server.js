const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",  // Your MySQL username
    password: "",  // Your MySQL password
    database: "farm_market",
});

db.connect((err) => {
    if (err) console.log("DB Connection Error:", err);
    else console.log("MySQL Connected!");
});

app.post("/save-sellers", (req, res) => {
    const sellers = req.body.sellers;
    sellers.forEach((seller) => {
        db.query("INSERT INTO sellers (id, name) VALUES (?, ?)", 
            [seller.id, seller.name], 
            (err, result) => {
                if (err) console.log("Insert Error:", err);
            }
        );
    });
    res.send("Sellers saved to MySQL!");
});

app.listen(3000, () => console.log("Server running on port 3000"));

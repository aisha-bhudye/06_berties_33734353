const express = require('express');
const router = express.Router();

// Route to get all books as JSON (with optional search, price filter, and sorting)
router.get('/books', function (req, res, next) {
    let sqlquery = "SELECT * FROM books";
    let params = [];
    let conditions = [];
    
    // Handle search parameter
    if (req.query.search) {
        conditions.push("name LIKE ?");
        params.push('%' + req.query.search + '%');
    }
    
    // Handle minimum price
    if (req.query.minprice) {
        conditions.push("price >= ?");
        params.push(req.query.minprice);
    }
    
    // Handle maximum price
    if (req.query.max_price) {
        conditions.push("price <= ?");
        params.push(req.query.max_price);
    }
    
    // Add WHERE clause if there are conditions
    if (conditions.length > 0) {
        sqlquery += " WHERE " + conditions.join(" AND ");
    }
    
    // Handle sorting
    if (req.query.sort) {
        if (req.query.sort === 'name') {
            sqlquery += " ORDER BY name ASC";
        } else if (req.query.sort === 'price') {
            sqlquery += " ORDER BY price ASC";
        }
    }
    
    // Execute the sql query
    db.query(sqlquery, params, (err, result) => {
        // Return results as a JSON object
        if (err) {
            console.error("Database error:", err);
            res.status(500).json({ error: "Database query failed" });
        }
        else {
            res.json(result);
        }
    });
});

module.exports = router;



const express = require("express");
const router = express.Router();

router.get('/person', (req, res) => {
    if(req.query.name) {
        res.send(`You have requested a person ${req.query.name}`);
    }
    res.send("You have requested for a person");
});

router.get('/person/:name', (req, res) => {
    res.send(`You have requested a person ${req.params.name}`);
});

router.get('/error', (req, res) => {
    throw new Error("person side error message ");
});

module.exports = router;
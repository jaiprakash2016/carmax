const customerModel = require("../model/customer.model");
const express = require("express");
const router = express.Router();
const emailMask = require("mask-email-phone");

// create customer request
router.post('/customer', (req, res) => {
    if(!req.body) {
        res.status(400).set("request body is missing");
    }
    const model = customerModel(req.body);
    model.save()
    .then(doc => {
        if(!doc || doc.length === 0) {
            res.status(500).set("error in response");
        }
        res.status(201).send(doc);
    })
    .catch( err => {
        res.status(500).json(err);
    })
});

router.get('/customer', (req, res) => {
    customerModel.findOne ({
        name: req.query.name
    })
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.put('/customer', (req, res) => {
    customerModel.findOneAndUpdate ({
        name: req.query.name
    }, req.body , {
        new: true
    })
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.delete('/customer', (req, res) => {
    customerModel.findOneAndDelete ({
        name: req.query.name
    })
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

function requestValidation(req, res) {
    if (JSON.stringify(req.body) === "{}") {
        res.status(400).send("request body is missing");
    }
    if (req.body.email) {
        const email = req.body.email;
        req.body.email = emailMask(email);
    }
}


module.exports = router;
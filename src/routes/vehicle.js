const express = require("express");
const router = express.Router();
const vehicleModel = require("../model/vehicle.model");
const emailMask = require("mask-email-phone");
const lodash = require("lodash");
//const emailMask = require("data-mask");

router.post('/vehicle', (req, res) => {
    requestValidation(req, res);
    console.log(req.body);
    const model = vehicleModel(req.body);
    model.save()
    .then(doc => {
        if(!doc || doc.length === 0) {
            res.status(500).sent("error in response");
        }
        res.status(201).send(doc);
    })
    .catch( err => {
        res.status(500).json(err);
    })
});

router.get('/vehicles', (req, res) => {
    vehicleModel.find ({})
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.get('/vehicle', (req, res) => {
    vehicleModel.find({
        name: req.query.name
    })
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.put('/vehicle', (req, res) => {
    requestValidation(req, res);
    //console.log(req.body);
    vehicleModel.findOneAndUpdate ({
        name: req.query.name
    }, req.body, {
        new: true
    })
    .then(doc => {
        res.json(doc);
    })
    .catch(err => {
        res.status(500).json(err);
    })
});

router.delete('/vehicle', (req, res) => {
    vehicleModel.findOneAndDelete ({
        name: req.query.name
    }, req.body, {
        new: true
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
    // if (lodash.isEmpty(req.body)) {
    //     res.status(400).send("request body is missing");
    // }
    if (req.body.companyEmail) {
        const companyEmail = req.body.companyEmail;
        req.body.companyEmail = emailMask(companyEmail);
        // const length = parseInt(companyEmail.length);
        // if(length > 2) {
        //     req.body.companyEmail = emailMask.maskRight(companyEmail, parseInt(companyEmail.length) - 2, ' ', '*'); 
        // }

        // jai@mindtree.com-- ja*********
        // ja********e.com
    }
}

module.exports = router;
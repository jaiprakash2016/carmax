const express = require("express");
const app = express();

const personRoute = require("./routes/person");
const customerRoute = require("./routes/customer");
const vehicleRoute = require("./routes/vehicle");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

app.use((bodyParser.json()));

//check if access token exist
//if exist check th value
//if value match do next()
//if value dosent match 401
//if no access token is passed respons 400 bad request
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`);
    next(); 
});
app.use(express.static('public'));
app.use(personRoute);
app.use(customerRoute);
app.use(vehicleRoute);
app.use((req, res, next) => {
    res.status(404).send("your are lost: Not Found");
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("server side exception");
});

app.listen(PORT, () => console.log(`server has started on ${PORT}`));


const mongooseDataSource = require("../datasources/datasource");

const vehicleSchema =  new mongooseDataSource.Schema({
    id: {
        type: String,
        generated: true,
    },
    name: String,
    company: String,
    power: Number,
    color: String,
    companyEmail: String
});

module.exports=mongooseDataSource.model('vehicle', vehicleSchema);
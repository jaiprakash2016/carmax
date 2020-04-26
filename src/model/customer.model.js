const mongooseDataSource = require("../datasources/datasource");

const customerSchema =  new mongooseDataSource.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports=mongooseDataSource.model('customer', customerSchema);
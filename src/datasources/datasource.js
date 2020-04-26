const mongoose = require("mongoose");

const server = 'cluster0-ykuqb.mongodb.net';
const database = 'carmax';
const user = 'admin';
const password = 'admin123';
const config = {
    autoIndex: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
mongoose.connect(`mongodb+srv://${user}:${password}@${server}/${database}`, config);

module.exports = mongoose;
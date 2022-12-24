
let mongoose = require("mongoose");
const { mongodburl } = require("./constants");
const dbconnect = () => {
    mongoose.connect("mongodb://0.0.0.0:27017/Phoenix");
};

const close = () => mongoose.connection.close();
module.exports = { dbconnect, close }
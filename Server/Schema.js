let mongoose = require("mongoose");
let users = new mongoose.Schema({
    username: { type: String, required: true },
    mobileNumber: { type: Number, unique: true, required: true },
});
let services = new mongoose.Schema({
    mobileNumber: {
        type: Number, required: true
    },
    serviceDate: {
        type: Date
    },
    serviceType: [{
        type: {
            type: String
        },
        price: {
            type: Number
        }
    }
    ],
    invoice: {
        tax: {
            type: Number
        },
        total: {
            type: Number
        }
    },
    serviceBy: {
        type: String
    }
})
let UsersModel = mongoose.model("User", users);
let ServiceModel = mongoose.model("Service", services)
exports.User = UsersModel;
exports.Service = ServiceModel;
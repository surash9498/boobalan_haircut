const res = require("express/lib/response");
let { User, Service } = require("./Schema");
const addUser = async ({ body }, res) => {


    let user = new User({
        username: body.Name,
        mobileNumber: body.Mobile,
    })
    try {
        await user.save()
        res.send(true)
    }
    catch (err) {
        console.log(err)
        res.send(false)
    }

}
const fetchUser = async ({ body }, res) => {
    let result = await User.findOne({ mobileNumber: body.Mobile })
    if (result) {
        res.send(result)
    }
    else {
        res.send(false)
    }
}
const addService = async ({ body }, res) => {
    try {
        let serv = new Service({
            serviceBy: body.serviceBy,
            serviceDate: body.date, mobileNumber: body.Mobile,
            invoice: body.invoice

        })
        serv.serviceType.push(...body.service)

        let result = await serv.save();
        res.send(true)

    }
    catch (err) {
        res.send(false)

    }


}
const audithistory = async (req, res) => {

    let result = await Service.find();
    res.status(200).send(result)

}
module.exports = { addService, addUser, fetchUser, audithistory }


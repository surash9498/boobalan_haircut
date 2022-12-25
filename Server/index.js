const express = require('express');
const { UserAccess } = require('./constants');
const mongoose = require("mongoose");
let { dbconnect, close } = require("./connect");
const { addService, addUser, fetchUser, audithistory } = require('./ManageUsers');
const path = require("path")
const app = express()

const port = 5000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
    await dbconnect();
    next();
});

// app.use(express.static('build'))
app.use(express.static(path.join(__dirname, 'build')))
// app.use("/", express.static(path.join(__dirname, 'build')))
app.post("/api/login", (req, res) => {
    let result = UserAccess.find((user) => user[req.body.UserName])

    if (result && result[req.body.UserName] == req.body.Password) {
        res.send(true)
    } else {

        res.send(false)
    }

})
app.post("/api/adduser", (req, res) => {
    addUser(req, res)
})
app.post("/api/getuser", (req, res) => {
    fetchUser(req, res)
})
app.post("/api/addservice", async (req, res) => {
    addService(req, res)
})
app.get("/api/audithistory", (req, res) => {
    audithistory(req, res)


})
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"))
})

process.on("SIGINT", async () => {
    await close();
    process.exit(0);
    // console.log("disconnected")
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
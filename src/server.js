require('dotenv').config()
const express = require('express') //commonjs
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const connection = require('./config/database');

const app = express() // app express
const port = process.env.PORT || 8888 //port => hardcore . uat .prod
const hostname = process.env.HOST_NAME

// config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({extended: true})) // for form data

// config template engine
configViewEngine(app)

// khai bao route
app.use('/', webRoutes);


(async () => {
    try {
        await connection()
        app.listen(port, hostname, () => {
            console.log(`Backend zero app listening on port ${port}`)
        })
    } catch (err) {
        console.log(">>> Error connect to DB: ", err)
    }
})()

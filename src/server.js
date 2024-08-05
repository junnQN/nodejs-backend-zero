require('dotenv').config()
const express = require('express') //commonjs
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
const fileUpload = require('express-fileupload')
const connection = require('./config/database');
const {MongoClient} = require('mongodb');


const app = express() // app express
const port = process.env.PORT || 8888 //port => hardcore . uat .prod
const hostname = process.env.HOST_NAME

// Config file upload
app.use(fileUpload())

// config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({extended: true})) // for form data

// config template engine
configViewEngine(app)

// khai bao route
app.use('/', webRoutes);
app.use('/v1/api/', apiRoutes);

(async () => {
    try {
        // using mongoose
        // await connection();

        // using mongodb driver
// Connection URL
        const url = process.env.DB_HOST_WITH_DRIVER;
        const client = new MongoClient(url);

// Database Name
        const dbName = process.env.HOST_NAME;

        await client.connect();
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection('documents');

        collection.insertOne({"name": "Wei Xiao Bao"})
        //

        await connection()
        app.listen(port, hostname, () => {
            console.log(`Backend zero app listening on port ${port}`)
        })
    } catch (err) {
        console.log(">>> Error connect to DB: ", err)
    }
})()

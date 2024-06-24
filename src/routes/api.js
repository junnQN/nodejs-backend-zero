const express = require('express');

const routerAPI = express.Router();

const {getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI, postUploadSingleFileAPI,
    postUploadMultipleFileAPI} = require('../controllers/apiController')

const {postCreateCustomer, postCreateArrayCustomer, getAllCustomers} = require("../controllers/customerController");

routerAPI.get('/users', getUsersAPI)
routerAPI.post('/users', postCreateUserAPI)
routerAPI.put('/users', putUpdateUserAPI)
routerAPI.delete('/users', deleteUserAPI)

routerAPI.post('/file', postUploadSingleFileAPI)
routerAPI.post('/files', postUploadMultipleFileAPI)

routerAPI.post('/customers', postCreateCustomer)
routerAPI.post('/customers-many', postCreateArrayCustomer)
routerAPI.get('/customers', getAllCustomers)

module.exports = routerAPI; //export default
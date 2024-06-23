const express = require('express');

const routerAPI = express.Router();

const {getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI} = require('../controllers/apiController')

routerAPI.get('/', (req, res) => {
    res.send('Welcome to world with API');
});

routerAPI.get('/samdalri', (req, res) => {
    res.status(200).json({
        data: 'Welcome to Samdal-ri'
    })
});

routerAPI.get('/users', getUsersAPI)

routerAPI.post('/users', postCreateUserAPI)

routerAPI.put('/users', putUpdateUserAPI)

routerAPI.delete('/users', deleteUserAPI)

module.exports = routerAPI; //export default
const express = require('express');
const {getHomepage, getABC, getJunny} = require('../controllers/homeController')
const router = express.Router();

// router.Method('/route',handler)

router.get('/', getHomepage)

router.get('/abc', getABC)

router.get('/hoijunny', getJunny)


module.exports = router //export default
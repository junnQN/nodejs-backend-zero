const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World vs Junny & Grummy Cat with Dont Forget to Breathe')
})

router.get('/abc', (req, res) => {
    res.send('check ABC')
})

router.get('/hoijunny', (req, res) => {
    //res.send('<h1>hoi dan huong cang voi Junny</h1>')
    res.render('sample.ejs')
})

module.exports = router //export default
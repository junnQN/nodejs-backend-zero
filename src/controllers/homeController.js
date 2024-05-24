
const getHomepage = (req, res) => {
    // process data
    // call model
  res.send('Hello World vs Junny & GrummyCat! with nodemon');
}

const getABC = (req, res) => {
  res.send('Check ABC');
}

const getJunny = (req, res) => {
  res.render('sample.ejs')
}

module.exports = {
    getHomepage,
    getABC,
    getJunny
}
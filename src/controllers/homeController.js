const connection = require('../config/database')
const {getAllUsers, getUserById} = require('../services/CRUDService')

const getHomepage = async (req, res) => {
    let results = await getAllUsers();
    return res.render('home', { listUsers: results}) // x <- y
}

const getABC = (req, res) => {
    res.send('Check ABC');
}

const getJunny = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = async (req, res) => {
    let email = req.body.email
    let name = req.body.myname
    let city = req.body.city

    console.log(">>> email = ", email, 'name = ', name, 'city = ', city)

    //let { email, name, city} = req.body

    /*connection.query(
        `INSERT INTO Users (email,name,city) VALUES (?,?,?)`,
        [email, name, city],
        function (err, results) {
            console.log(results)
            res.send('create user succeed!')
        }
    )*/

    let [results, fields] = await connection.query(
        `INSERT INTO Users (email,name,city) VALUES (?,?,?)`, [email, name, city],
    )

    console.log(">> check results: ", results)

    res.send('Created user succeed!')
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id
    let user= await getUserById(userId)

    res.render('edit.ejs', {userEdit : user}) // x <- y
}

module.exports = {
    getHomepage,
    getABC,
    getJunny,
    postCreateUser,
    getCreatePage,
    getUpdatePage
}
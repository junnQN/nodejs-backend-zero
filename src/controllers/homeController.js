const connection = require('../config/database')
const {getAllUsers, getUserById, updateUserById, deleteUserById} = require('../services/CRUDService')

const User = require('../models/user')
const getHomepage = async (req, res) => {
    let results = await User.find({});
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

    await User.create({
        email: email,
        name: name,
        city: city,
    })

    res.send('Created user succeed!')
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id
    //let user= await getUserById(userId)
    let user = await User.findById(userId).exec();
    res.render('edit.ejs', {userEdit : user}) // x <- y
}

const postUpdateUser = async (req, res) => {

    let email = req.body.email
    let name = req.body.myname
    let city = req.body.city
    let userId = req.body.userId

    //await updateUserById(email, city, name, userId)

    await User.updateOne({_id: userId}, {email: email, name: name, city: city})
    res.redirect('/')
}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id
    let user = await User.findById(userId).exec()
    res.render('delete.ejs', {userEdit : user})
}

const postHandleRemoveUser = async (req, res) => {
    const id = req.body.userId
    //await deleteUserById(id)
    await User.deleteOne({_id: id})
    res.redirect('/')
}

module.exports = {
    getHomepage,
    getABC,
    getJunny,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser
}
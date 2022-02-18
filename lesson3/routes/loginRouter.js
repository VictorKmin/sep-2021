const { Router} = require('express');
const users = require('../db/users')
const loginController = require('../controllers/loginController')
const loginMiddleware = require('../middleware/isUserValid')

const loginRouter = Router();

loginRouter.get('/', (req, res) => {
    res.render('login')
})

loginRouter.post('/', loginMiddleware, loginController.loginUser)

module.exports = loginRouter;
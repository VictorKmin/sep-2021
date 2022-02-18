const users = require("../db/users");

class LoginController {
    loginUser(req, res) {
        // console.log(req.body)
        users.push(req.body)
        res.redirect('/users')
    }
}

module.exports = new LoginController()
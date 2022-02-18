const users = require("../db/users");

class UserController {
    renderUsers(req, res) {
        res.render('users', { users });
    }

    getUserById(req, res) {
        const { userId } = req.params;
        console.log(req.query);
        res.json(users[userId]);
    }
}

module.exports = new UserController();
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userService_1 = require("../services/userService");
class UserController {
    async createUser(req, res) {
        const createdUser = await userService_1.userService.createUser(req.body);
        return res.json(createdUser);
    }
    async getUserByEmail(req, res) {
        const { email } = req.params;
        const user = await userService_1.userService.getUserByEmail(email);
        return res.json(user);
    }
}
exports.userController = new UserController();
//# sourceMappingURL=userController.js.map
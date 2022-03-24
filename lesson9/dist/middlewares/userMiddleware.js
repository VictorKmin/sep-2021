"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const userRepository_1 = require("../repositories/user/userRepository");
class UserMiddleware {
    async checkIsUserExist(req, res, next) {
        try {
            const userFromDB = await userRepository_1.userRepository.getUserByEmail(req.body.email);
            if (!userFromDB) {
                res.status(404).json('User not found');
                return;
            }
            req.user = userFromDB;
            next();
        }
        catch (e) {
            res.status(400).json(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
//# sourceMappingURL=userMiddleware.js.map
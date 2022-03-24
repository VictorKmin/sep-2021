"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const userRepository_1 = require("../repositories/user/userRepository");
const ErrorHandler_1 = require("../error/ErrorHandler");
class UserMiddleware {
    async checkIsUserExist(req, res, next) {
        try {
            const userFromDB = await userRepository_1.userRepository.getUserByEmail(req.body.email);
            if (!userFromDB) {
                next(new ErrorHandler_1.ErrorHandler('User not found', 404));
                return;
            }
            req.user = userFromDB;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
//# sourceMappingURL=userMiddleware.js.map
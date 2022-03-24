"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const userRouter_1 = require("./userRouter");
const authRouter_1 = require("./authRouter");
const router = (0, express_1.Router)();
router.use('/users', userRouter_1.userRouter);
router.use('/auth', authRouter_1.authRouter);
// @ts-ignore
router.use('*', (err, req, res, next) => {
    console.log('___________________________________');
    console.log(err);
    console.log('___________________________________');
    res
        .status(err.code || 500)
        .json({
        message: err.message,
        data: err.data
    });
});
exports.apiRouter = router;
//# sourceMappingURL=apiRouter.js.map
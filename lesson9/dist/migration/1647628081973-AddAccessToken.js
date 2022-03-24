"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAccessToken1647628081973 = void 0;
class AddAccessToken1647628081973 {
    async up(queryRunner) {
        await queryRunner.query('ALTER TABLE Tokens ADD COLUMN accessToken VARCHAR(250) NOT NULL');
    }
    async down(queryRunner) {
        await queryRunner.query('ALTER TABLE Token DROP COLUMN accessToken');
    }
}
exports.AddAccessToken1647628081973 = AddAccessToken1647628081973;
//# sourceMappingURL=1647628081973-AddAccessToken.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableTokens1646682885230 = void 0;
class CreateTableTokens1646682885230 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Tokens (
                id INT PRIMARY KEY AUTO_INCREMENT,
                refreshToken VARCHAR(250) NOT NULL,
                userId INT NOT NULL,
                FOREIGN KEY (userId) REFERENCES Users (id)
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Tokens
        `);
    }
}
exports.CreateTableTokens1646682885230 = CreateTableTokens1646682885230;
//# sourceMappingURL=1646682885230-CreateTableTokens.js.map
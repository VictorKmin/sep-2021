import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTokens1646682885230 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS Tokens (
                id INT PRIMARY KEY AUTO_INCREMENT,
                refreshToken VARCHAR(250) NOT NULL,
                userId INT NOT NULL,
                FOREIGN KEY (userId) REFERENCES Users (id)
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS Tokens
        `);
    }
}

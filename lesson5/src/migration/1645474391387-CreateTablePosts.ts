import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTablePosts1645474391387 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'Posts',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },

                {
                    name: 'title',
                    type: 'varchar',
                    width: 250,
                    isUnique: true,
                    isNullable: false,
                },

                {
                    name: 'text',
                    type: 'varchar',
                    width: 250,
                    isNullable: false,
                },

                {
                    name: 'userId',
                    type: 'int',
                },

                {
                    name: 'createdAt',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'now()',
                },

                {
                    name: 'deleteAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],

            foreignKeys: [
                {
                    columnNames: ['userId'],
                    referencedTableName: 'Users',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Posts', true);
    }
}

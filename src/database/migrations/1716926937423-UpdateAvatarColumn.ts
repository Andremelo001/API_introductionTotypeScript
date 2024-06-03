import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAvatarColumn1622547890123 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Atualizar valores nulos
        await queryRunner.query(`
            UPDATE "users"
            SET "avatar" = 'default_avatar.png'
            WHERE "avatar" IS NULL
        `);

        // Aplicar a restrição NOT NULL
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "avatar" SET NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover a restrição NOT NULL no downgrade
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "avatar" DROP NOT NULL
        `);
    }
}

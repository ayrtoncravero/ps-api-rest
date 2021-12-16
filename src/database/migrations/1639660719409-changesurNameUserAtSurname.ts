import {MigrationInterface, QueryRunner} from "typeorm";

export class changesurNameUserAtSurname1639660719409 implements MigrationInterface {
    name = 'changesurNameUserAtSurname1639660719409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "surName" TO "surname"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "surname" TO "surName"`);
    }

}

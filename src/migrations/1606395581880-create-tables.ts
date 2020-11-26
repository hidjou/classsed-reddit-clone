import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1606395581880 implements MigrationInterface {
    name = 'createTables1606395581880'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE INDEX "IDX_fe0bb3f6520ee0469504521e71" ON "users" ("username") `);
        await queryRunner.query(`CREATE TABLE "subs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "title" character varying NOT NULL, "description" text, "imageUrn" character varying, "bannerUrn" character varying, "username" character varying, CONSTRAINT "UQ_2ae46b179b70ab8179597adb8c0" UNIQUE ("name"), CONSTRAINT "PK_c2311ff9e741af88151e0aa2299" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2ae46b179b70ab8179597adb8c" ON "subs" ("name") `);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "identifier" character varying NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "body" text, "subName" character varying NOT NULL, "username" character varying, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_152316363d20c399f934c4f74b" ON "posts" ("identifier") `);
        await queryRunner.query(`CREATE INDEX "IDX_54ddf9075260407dcfdd724857" ON "posts" ("slug") `);
        await queryRunner.query(`ALTER TABLE "subs" ADD CONSTRAINT "FK_4520ae7b26f68a13ec3e96dbbba" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_42377e3f89a203ca74d117e5961" FOREIGN KEY ("username") REFERENCES "users"("username") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_cca21672314ce54982a6dd5d121" FOREIGN KEY ("subName") REFERENCES "subs"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_cca21672314ce54982a6dd5d121"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_42377e3f89a203ca74d117e5961"`);
        await queryRunner.query(`ALTER TABLE "subs" DROP CONSTRAINT "FK_4520ae7b26f68a13ec3e96dbbba"`);
        await queryRunner.query(`DROP INDEX "IDX_54ddf9075260407dcfdd724857"`);
        await queryRunner.query(`DROP INDEX "IDX_152316363d20c399f934c4f74b"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP INDEX "IDX_2ae46b179b70ab8179597adb8c"`);
        await queryRunner.query(`DROP TABLE "subs"`);
        await queryRunner.query(`DROP INDEX "IDX_fe0bb3f6520ee0469504521e71"`);
        await queryRunner.query(`DROP INDEX "IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}

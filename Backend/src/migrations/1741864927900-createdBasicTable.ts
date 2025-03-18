import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedBasicTable1741864927900 implements MigrationInterface {
    name = 'CreatedBasicTable1741864927900'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("categoryId" SERIAL NOT NULL, "categoryName" character varying NOT NULL, CONSTRAINT "UQ_cb776c7d842f8375b60273320dc" UNIQUE ("categoryName"), CONSTRAINT "PK_8a300c5ce0f70ed7945e877a537" PRIMARY KEY ("categoryId"))`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_type_enum" AS ENUM('INCOME', 'EXPENSE')`);
        await queryRunner.query(`CREATE TABLE "transaction" ("transactionId" SERIAL NOT NULL, "title" character varying NOT NULL, "amount" double precision NOT NULL, "type" "public"."transaction_type_enum" NOT NULL, "date" character varying NOT NULL, "createdAt" character varying NOT NULL DEFAULT now(), "updatedAt" character varying, "userId" integer, CONSTRAINT "PK_bdcf2c929b61c0935576652d9b0" PRIMARY KEY ("transactionId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transaction_categories_category" ("transactionTransactionId" integer NOT NULL, "categoryCategoryId" integer NOT NULL, CONSTRAINT "PK_9e545cfd034905404f2b2516f0b" PRIMARY KEY ("transactionTransactionId", "categoryCategoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fdd6368b071e1b1e56ba3b813b" ON "transaction_categories_category" ("transactionTransactionId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2d775dfb77836ee98982ca4b88" ON "transaction_categories_category" ("categoryCategoryId") `);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_605baeb040ff0fae995404cea37" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction_categories_category" ADD CONSTRAINT "FK_fdd6368b071e1b1e56ba3b813bd" FOREIGN KEY ("transactionTransactionId") REFERENCES "transaction"("transactionId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "transaction_categories_category" ADD CONSTRAINT "FK_2d775dfb77836ee98982ca4b88e" FOREIGN KEY ("categoryCategoryId") REFERENCES "category"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction_categories_category" DROP CONSTRAINT "FK_2d775dfb77836ee98982ca4b88e"`);
        await queryRunner.query(`ALTER TABLE "transaction_categories_category" DROP CONSTRAINT "FK_fdd6368b071e1b1e56ba3b813bd"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_605baeb040ff0fae995404cea37"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2d775dfb77836ee98982ca4b88"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fdd6368b071e1b1e56ba3b813b"`);
        await queryRunner.query(`DROP TABLE "transaction_categories_category"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_type_enum"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}

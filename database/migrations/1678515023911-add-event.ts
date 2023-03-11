import { MigrationInterface, QueryRunner } from 'typeorm';

export class addEvent1678515023911 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "event" (
            "eventId" uuid NOT NULL DEFAULT uuid_generate_v4(),
            title varchar NOT NULL,
            capacity int4 NOT NULL,
            is_private bool NOT NULL,
            "password" varchar NULL,
            start_date timestamp NOT NULL,
            end_date timestamp NOT NULL,
            CONSTRAINT "PK_4ee8fd974a5681971c4eb5bb585" PRIMARY KEY ("eventId")
        )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "event"`);
  }
}

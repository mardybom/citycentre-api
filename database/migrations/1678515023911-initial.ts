import { MigrationInterface, QueryRunner } from 'typeorm';

export class initial1678515023911 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "event" (
      title varchar NOT NULL,
      capacity int4 NOT NULL,
      is_private bool NOT NULL,
      "password" varchar NULL,
      start_date timestamp NOT NULL,
      end_date timestamp NOT NULL,
      event_id uuid NOT NULL DEFAULT uuid_generate_v4(),
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NOT NULL DEFAULT now(),
      "organizerUserId" uuid NULL,
      CONSTRAINT "PK_fe0840e4557d98ed53b0ae51466" PRIMARY KEY (event_id)
    )`);
    await queryRunner.query(`CREATE TABLE "user" (
      user_id uuid NOT NULL DEFAULT uuid_generate_v4(),
      username varchar NOT NULL,
      "password" varchar NOT NULL,
      first_name varchar NOT NULL,
      last_name varchar NOT NULL,
      created_at timestamp NOT NULL DEFAULT now(),
      updated_at timestamp NOT NULL DEFAULT now(),
      "memberOfEventId" uuid NULL,
      CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY (user_id),
      CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE (username)
    )`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_183a8ecde6b7f9651ca9238e8cc" FOREIGN KEY ("organizerUserId") REFERENCES "user"(user_id)`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_686c4b7c253848e0f44e23f211b" FOREIGN KEY ("memberOfEventId") REFERENCES "event"(event_id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_183a8ecde6b7f9651ca9238e8cc" FOREIGN KEY ("organizerUserId") REFERENCES "user"(user_id)`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_686c4b7c253848e0f44e23f211b" FOREIGN KEY ("memberOfEventId") REFERENCES "event"(event_id)`,
    );
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}

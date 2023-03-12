import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../../src/user/entities/user.entity';

export class seedUser1678622750953 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);

    const user = userRepository.create({
      username: 'jon@email.com',
      password: 'password',
      firstName: 'Jon',
      lastName: 'Doe',
    });

    await userRepository.save(user);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}

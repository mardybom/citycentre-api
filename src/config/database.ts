import { resolve } from 'path';
import { registerAs } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export default registerAs(
  'database',
  (): PostgresConnectionOptions =>
    ({
      logging: false,
      entities: [resolve(`${__dirname}/../**/**.entity{.ts,.js}`)],
      migrations: [
        resolve(`${__dirname}/../../database/migrations/*{.ts,.js}`),
      ],
      migrationsRun: true,
      migrationsTableName: 'migrations',
      keepConnectionAlive: true,
      synchronize: true,
      type: 'postgres',
      host: process.env.DATABASE_HOSTNAME,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    } as PostgresConnectionOptions),
);

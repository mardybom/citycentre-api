import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database';

const typeOrmConfig = {
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
  ],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    configService.get('database'),
  dataSourceFactory: async (options: DataSourceOptions) =>
    new DataSource(options).initialize(),
};

@Module({
  imports: [
    EventModule,
    UserModule,
    AuthModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

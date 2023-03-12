import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { Event } from './entities/event.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [TypeOrmModule.forFeature([Event, User]), AuthModule, UserModule],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}

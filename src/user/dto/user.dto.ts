import { IsEmail, IsNotEmpty } from 'class-validator';
import { EventDto } from '../../event/dto/event.dto';

export class UserDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  organizerOf: EventDto[];

  memberOf: EventDto;

  createdAt: Date;

  updatedAt: Date;
}

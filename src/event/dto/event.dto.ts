import { IsNotEmpty } from 'class-validator';
import { UserDto } from '../../user/dto/user.dto';

export class EventDto {
  @IsNotEmpty()
  eventId: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  capacity: number;

  @IsNotEmpty()
  isPrivate: boolean;

  password?: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  organizer: UserDto;

  members: UserDto[];

  createdAt: Date;

  updatedAt: Date;
}

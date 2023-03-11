import { EventDto } from 'src/event/dto/event.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { Event } from '../event/entities/event.entity';

export const toEventDto = (data: Event): EventDto => {
  const {
    eventId,
    title,
    capacity,
    isPrivate,
    password,
    startDate,
    endDate,
    createdAt,
    updatedAt,
  } = data;

  const eventDto: EventDto = {
    eventId,
    title,
    capacity,
    isPrivate,
    password,
    startDate,
    endDate,
    createdAt,
    updatedAt,
  };
  return eventDto;
};

export const toUserDto = (data: User): UserDto => {
  const { userId, username, firstName, lastName, createdAt, updatedAt } = data;

  const userDto: UserDto = {
    userId,
    username,
    firstName,
    lastName,
    createdAt,
    updatedAt,
  };

  return userDto;
};

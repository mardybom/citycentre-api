import { EventDto } from '../event/dto/event.dto';
import { UserDto } from '../user/dto/user.dto';
import { User } from '../user/entities/user.entity';
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
    organizer,
    members,
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
    organizer: organizer ? toUserDto(organizer) : null,
    members: members ? members.map((member: User) => toUserDto(member)) : null,
    createdAt,
    updatedAt,
  };

  return eventDto;
};

export const toUserDto = (data: User): UserDto => {
  const {
    userId,
    username,
    firstName,
    lastName,
    organizerOf,
    memberOf,
    createdAt,
    updatedAt,
  } = data;

  const userDto: UserDto = {
    userId,
    username,
    firstName,
    lastName,
    organizerOf,
    memberOf,
    createdAt,
    updatedAt,
  };

  return userDto;
};

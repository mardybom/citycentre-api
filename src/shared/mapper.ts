import { EventDto } from 'src/event/dto/event.dto';
import { Event } from '../event/entities/event.entity';
export const toEventDto = (data: Event): EventDto => {
  const { eventId, title, capacity, isPrivate, password, startDate, endDate } =
    data;

  const eventDto: EventDto = {
    eventId,
    title,
    capacity,
    isPrivate,
    password,
    startDate,
    endDate,
  };
  return eventDto;
};

import { EventDto } from 'src/event/dto/event.dto';
import { Event } from '../event/entities/event.entity';
export const toEventDto = (data: Event): EventDto => {
  const {
    eventId,
    title,
    capacity,
    is_private,
    password,
    start_date,
    end_date,
  } = data;

  const eventDto: EventDto = {
    eventId,
    title,
    capacity,
    is_private,
    password,
    start_date,
    end_date,
  };
  return eventDto;
};

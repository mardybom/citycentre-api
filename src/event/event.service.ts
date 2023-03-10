import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { events } from '../mock/events.mock';
import { Event } from './entities/event.entity';
import { toEventDto } from 'src/shared/mapper';

@Injectable()
export class EventService {
  events: Event[] = events;

  create(createEventDto: CreateEventDto) {
    return 'This action adds a new event';
  }

  findAll() {
    return this.events;
  }

  findOne(id: string) {
    const todo = this.events.find((event) => event.eventId === id);
    if (!todo) {
      throw new HttpException(`Event doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    return toEventDto(todo);
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}

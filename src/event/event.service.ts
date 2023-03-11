import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  create(createEventDto: CreateEventDto): Promise<Event> {
    const event = new Event();
    event.title = createEventDto.title;
    event.capacity = createEventDto.capacity;
    event.is_private = createEventDto.is_private;
    event.password = createEventDto.password;
    event.start_date = createEventDto.start_date;
    event.end_date = createEventDto.end_date;

    return this.eventRepository.save(event);
  }

  findAll() {
    return this.eventRepository.find();
  }

  findOne(id: string) {
    return this.eventRepository.findOneBy({ eventId: id });
  }

  update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const event = new Event();
    event.title = updateEventDto.title;
    event.capacity = updateEventDto.capacity;
    event.is_private = updateEventDto.is_private;
    event.password = updateEventDto.password;
    event.start_date = updateEventDto.start_date;
    event.end_date = updateEventDto.end_date;

    return this.eventRepository.save({ eventId: id, ...event });
  }

  async remove(id: string): Promise<void> {
    await this.eventRepository.delete({ eventId: id });
  }
}

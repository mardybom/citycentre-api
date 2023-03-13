import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../user/dto/user.dto';
import { DataSource, Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { EventDto } from './dto/event.dto';
import { UserService } from '../user/user.service';
import { toEventDto } from '../shared/mapper';
import { User } from '../user/entities/user.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {}

  async create(
    { username }: UserDto,
    createEventDto: CreateEventDto,
  ): Promise<EventDto> {
    // get user from the db
    const organizer = await this.userService.findOne({ where: { username } });

    let event = new Event();
    event.title = createEventDto.title;
    event.capacity = createEventDto.capacity;
    event.isPrivate = createEventDto.isPrivate;
    event.password = createEventDto.password;
    event.startDate = createEventDto.startDate;
    event.endDate = createEventDto.endDate;

    event = this.eventRepository.create({ ...event, organizer });

    await this.eventRepository.save(event);

    return toEventDto(event);
  }

  async findAll() {
    const events = await this.eventRepository.find({
      relations: ['organizer', 'members'],
    });
    return events.map((event) => toEventDto(event));
  }

  async findOne(id: string) {
    const event = await this.eventRepository.findOne({
      where: { eventId: id },
      relations: ['organizer', 'members'],
    });
    return toEventDto(event);
  }

  async joinEvent(id: string, { username }: UserDto): Promise<EventDto> {
    let event = await this.eventRepository.findOne({
      where: { eventId: id },
      relations: ['members'],
    });

    if (!event) {
      throw new HttpException(`Event doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    // check if the event is full
    if (event.members.length >= event.capacity) {
      throw new HttpException(`Event is already full`, HttpStatus.FORBIDDEN);
    }

    // get user from the db
    let user = (await this.userService.findOne({
      where: { username },
    })) as User;

    // get previously joined event
    if (user.memberOf) {
      const prevEvent = await this.eventRepository.findOneBy({
        eventId: user.memberOf.eventId,
      });
      prevEvent.members = prevEvent.members.filter(
        (member) => member.userId === user.userId,
      );
      await this.dataSource.transaction(async (manager) => {
        // remove user from previous event
        manager.save(prevEvent);
        // add user to event and vice versa
        event.members.push(user);
        event = await manager.save(event);
        user = await manager.findOne(User, {
          where: { userId: user.userId },
        });
        user.memberOf = event;
        await manager.save(user);
      });
    }

    // add user to event and vice versa
    await this.dataSource.transaction(async (manager) => {
      event.members.push(user);
      event = await manager.save(event);
      user = await manager.findOne(User, {
        where: { userId: user.userId },
      });
      user.memberOf = event;
      await manager.save(user);
    });

    // re-query
    event = await this.eventRepository.findOne({
      where: { eventId: id },
      relations: ['organizer', 'members'],
    });

    return toEventDto(event);
  }

  async update(
    id: string,
    { username }: UserDto,
    updateEventDto: UpdateEventDto,
  ): Promise<EventDto> {
    const { title, capacity, isPrivate, password, startDate, endDate } =
      updateEventDto;
    let event: Event = await this.eventRepository.findOne({
      where: { eventId: id },
      relations: ['organizer'],
    });

    if (!event) {
      throw new HttpException(`Event doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    // check permission
    if (event.organizer.username !== username) {
      throw new HttpException(
        `Cannot update this event, you are not the organizer`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    // update
    await this.eventRepository.update(
      { eventId: id },
      {
        title,
        capacity,
        isPrivate,
        password,
        startDate,
        endDate,
      },
    );

    // re-query
    event = await this.eventRepository.findOne({
      where: { eventId: id },
      relations: ['organizer', 'members'],
    });

    return toEventDto(event);
  }

  async remove(id: string, { username }: UserDto): Promise<void> {
    const event: Event = await this.eventRepository.findOne({
      where: { eventId: id },
      relations: ['organizer'],
    });

    if (!event) {
      throw new HttpException(`Event doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    // check permission
    if (event.organizer.username !== username) {
      throw new HttpException(
        `Cannot update this event, you are not the organizer`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    await this.eventRepository.delete({ eventId: id });
  }
}

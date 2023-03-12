import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AuthGuard } from '@nestjs/passport';
import { EventDto } from './dto/event.dto';
import { UserDto } from '../user/dto/user.dto';
import { ListEventDto } from './dto/list-event.dto';

@Controller('api/events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(
    @Body() createEventDto: CreateEventDto,
    @Req() req: any,
  ): Promise<EventDto> {
    const user = req.user as UserDto;
    return await this.eventService.create(user, createEventDto);
  }

  @Get()
  async findAll(): Promise<ListEventDto> {
    const events = await this.eventService.findAll();
    return { events };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<EventDto> {
    return this.eventService.findOne(id);
  }

  @Put(':id/join')
  @UseGuards(AuthGuard())
  async join(@Param('id') id: string, @Req() req: any): Promise<EventDto> {
    const user = req.user as UserDto;
    return this.eventService.joinEvent(id, user);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Req() req: any,
  ): Promise<EventDto> {
    const user = req.user as UserDto;
    return this.eventService.update(id, user, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  async remove(@Param('id') id: string, @Req() req: any): Promise<void> {
    const user = req.user as UserDto;
    return this.eventService.remove(id, user);
  }
}

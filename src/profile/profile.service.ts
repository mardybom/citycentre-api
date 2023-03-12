import { Injectable } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService {
  constructor(private readonly userService: UserService) {}
  findOne({ username }: UserDto) {
    return this.userService.findOne({
      where: { username },
      relations: ['organizerOf', 'memberOf'],
    });
  }
}

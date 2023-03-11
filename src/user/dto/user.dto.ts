import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  createdAt: Date;

  updatedAt: Date;
}

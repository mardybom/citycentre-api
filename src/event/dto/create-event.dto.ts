import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  capacity: number;

  @IsNotEmpty()
  @IsBoolean()
  isPrivate: boolean;

  @IsOptional()
  password?: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;
}

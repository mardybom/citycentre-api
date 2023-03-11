export class CreateEventDto {
  title: string;
  capacity: number;
  isPrivate: boolean;
  password?: string;
  startDate: Date;
  endDate: Date;
}

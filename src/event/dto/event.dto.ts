export class EventDto {
  eventId: string;
  title: string;
  capacity: number;
  isPrivate: boolean;
  password?: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

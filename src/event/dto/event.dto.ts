export class EventDto {
  eventId: string;
  title: string;
  capacity: number;
  is_private: boolean;
  password?: string;
  start_date: Date;
  end_date: Date;
}

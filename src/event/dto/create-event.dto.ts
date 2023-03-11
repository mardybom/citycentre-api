export class CreateEventDto {
  title: string;
  capacity: number;
  is_private: boolean;
  password?: string;
  start_date: Date;
  end_date: Date;
}

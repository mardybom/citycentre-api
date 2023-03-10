export class CreateEventDto {
  title: string;
  capacity: number;
  is_private: boolean;
  password?: string;
  start_date: string;
  end_date: string;
}

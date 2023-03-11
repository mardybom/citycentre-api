import { Event } from 'src/event/entities/event.entity';

export const events: Event[] = [
  {
    eventId: 'eac400ba-3c78-11e9-b210-d663bd873d93',
    title: 'Blockchain Hackathon',
    capacity: 500,
    is_private: false,
    start_date: new Date('2023-01-28 08:20:00'),
    end_date: new Date('2023-01-28 10:20:00'),
  },
  {
    eventId: 'eac40736-3c78-11e9-b210-d663bd873d93',
    title: 'Orientation',
    capacity: 50,
    is_private: false,
    start_date: new Date('2023-01-20 13:20:00'),
    end_date: new Date('2023-01-20 14:20:00'),
  },
  {
    eventId: 'eac40a7e-3c78-11e9-b210-d663bd873d93',
    title: 'After party',
    capacity: 25,
    is_private: true,
    password: 'mysecret',
    start_date: new Date('2023-02-20 18:00:00'),
    end_date: new Date('2023-02-20 20:30:00'),
  },
  {
    eventId: 'eac40c90-3c78-11e9-b210-d663bd873d93',
    title: 'Issue investigation',
    capacity: 5,
    is_private: true,
    password: 'mysecretnumbertwo',
    start_date: new Date('2023-02-20 10:00:00'),
    end_date: new Date('2023-02-20 10:30:00'),
  },
];

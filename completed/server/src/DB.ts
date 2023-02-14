interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

const DB: User[] = [
  {
    id: 1,
    username: 'user1',
    email: 'user1@gmail.com',
    password: '1'
  },
  {
    id: 2,
    username: 'user2',
    email: 'user2@gmail.com',
    password: '2'
  },
  {
    id: 3,
    username: 'user3',
    email: 'user3@gmail.com',
    password: '3'
  },
  {
    id: 4,
    username: 'user4',
    email: 'user4@gmail.com',
    password: '4'
  },
];

export default DB;

import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export const helloWorld = (request: Request, response: Response) => {
  const user = createUser({
    name: 'Diego',
    email: 'andrenavarro@usp.br',
    password: '123456',
    techs: [
      'Node.js',
      'React',
      'React Native',
      { title: 'Elixir', experience: 100 },
    ],
  });

  return response.json({ message: 'Hello World!' });
};

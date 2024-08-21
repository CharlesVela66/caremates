/* eslint-disable no-unused-vars */

export type User = {
  firstName: string;
  lastName: string;
};

export type Task = {
  id: string;
  name: string;
  description: string;
  status: 'completed' | 'not_completed';
};

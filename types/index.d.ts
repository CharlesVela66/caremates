/* eslint-disable no-unused-vars */

declare type User = {
  firstName: string;
  lastName: string;
};

export type Task = {
  id: string;
  description: string;
  status: 'pending' | 'processing' | 'success' | 'failed';
};

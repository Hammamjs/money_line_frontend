import { Role } from '@/features/auth/types';

export type User = {
  id: string;
  username: string;
  role: Role;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

// Sign in
export type Role = 'user' | 'admin' | 'super_admin';
export type User = {
  id: string;
  username: string;
  role: Role;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthResult = {
  user: User;
  accessToken: string;
};

export type SignInQuery = {
  email: string;
  password: string;
};

export type SignUpQuery = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type Step = 'email' | 'verify' | 'reset' | 'done';

export type RoleFilter = 'all' | Role;

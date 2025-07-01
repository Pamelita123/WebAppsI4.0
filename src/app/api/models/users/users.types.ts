import Users from '../../sequelize/models/users.models';

export interface User extends UserPayload {
  user_id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserPayload {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserLoginPayload {
  email: string;
  password: string;
}

export interface UserWithToken {
  user: Users;
  token: string;
}
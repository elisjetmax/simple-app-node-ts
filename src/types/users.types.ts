export interface IUser {
  email: string;
  fullName: string;
  password?: string;
  phone?: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  isActive: boolean;
  isDeleted: boolean;
}

export interface IUserInput {
  id?: string;
  email: string;
  fullName: string;
  password?: string;
  phone?: string;
}
export interface IUserUpdate {
  email?: string;
  fullName?: string;
  phone?: string;
}

export interface IUserOutput {
  email: string;
  fullName: string;
  phone?: string;
  emailVerification: boolean;
  phoneVerification: boolean;
  isActive: boolean;
  isDeleted: boolean;
}

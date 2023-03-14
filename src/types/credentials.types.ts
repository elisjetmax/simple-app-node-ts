export interface ICredentials {
  _id?: string;
  idEntity: string;
  apiKey?: string;
  name: string;
  email: string;
  apiSecret?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  credentialFor?: string;
}

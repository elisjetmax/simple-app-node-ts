export interface IPartner {
  name: string;
  description?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  country: string;
}

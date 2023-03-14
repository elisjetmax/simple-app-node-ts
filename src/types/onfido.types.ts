export interface IOnfido {
  _id?: string;
  applicantId: string;
  token: string;
  createdAt?: Date;
  updatedAt?: Date;
  checkId?: string;
  estatus: string;
}

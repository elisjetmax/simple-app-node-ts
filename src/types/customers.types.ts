import { ObjectId } from "mongoose";

export interface ICustomer {
  _id?: any;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string; //unique
  document: ICustomerDocument;
  phone: IPhoneNumber;
  address?: ICustomerAddress;
  isActive?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  kyc?: IKycData;
  relations?: IRelations[];
}

export interface IRelations {
  provider: string;
  providerId: string;
  extraData?: string;
}

export interface IPhoneNumber {
  countryCode: string;
  number: string;
}

export interface ICustomerAddress {
  line1: string;
  line2?: string;
  buildingNumber?: string;
  buildingName?: string;
  town?: string;
  state: string;
  country: string;
  countryAlpha2: string;
  countryAlpha3: string;
  postalCode: string;
}

export interface ICustomerDocument {
  type: string;
  number: string;
}

export interface IKycData {
  provider: string; //synctera | onfido
  isValid?: boolean; //false
  isRejected?: boolean; //false
  kycId?: string; //synctera: verification::id | onfido: applicant::id
  requestDate?: Date; //Date of request verification
  responseDate?: Date; //Date of last check response
  extraData?: string; //For example: to report_names applicant on Onfido ["document", "facial_similarity_photo"]
}

export interface IKycUpdateByEmail {
  email: string;
  kyc: IKycData;
}

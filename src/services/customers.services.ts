import customersModel from "../models/customers.model";
import {
  ICustomer,
  IKycData,
  IKycUpdateByEmail,
} from "../types/customers.types";

export class CustomerServices {
  constructor() {}

  async create(customer: ICustomer) {
    try {
      const customerCreated = await new customersModel({ ...customer }).save();
      return await this.getById(customerCreated._id.toString());
    } catch (error) {
      return { error };
    }
  }

  async getById(id: string) {
    try {
      const customer = await customersModel.findById(id).lean();
      return { ...customer };
    } catch (error) {
      return { error };
    }
  }

  async getByEmail(email: string) {
    try {
      const customer = await customersModel
        .findOne({ email, isDeleted: false })
        .lean();
      if (!customer) return null;
      return { ...customer };
    } catch (error) {
      return { error };
    }
  }

  async getAll() {
    try {
      const customers = await customersModel.find({ isDeleted: false }).lean();
      return customers;
    } catch (error) {
      return { error };
    }
  }

  async update(id: string, customerUpdateData: ICustomer) {
    try {
      const customer = await this.getById(id);
      if (!customer) throw "Customer not found";
      const { error } = customer;
      if (error) throw error;
      const updatedCustomer = { ...customer, ...customerUpdateData };
      await customersModel.findByIdAndUpdate(id, updatedCustomer, {
        new: true,
      });
      return await this.getById(id);
    } catch (error) {
      return { error };
    }
  }

  async logicDelete(id: string) {
    try {
      await customersModel.findByIdAndUpdate(id, {
        isDeleted: true,
        isActive: false,
      });
      return { deleted: true };
    } catch (error) {
      return { error };
    }
  }

  async delete(id: string) {
    try {
      await customersModel.findByIdAndDelete(id);
      return { deleted: true };
    } catch (error) {
      return { error };
    }
  }

  async updateKYCByEmail(kycUpdate: IKycUpdateByEmail) {
    try {
      let customer = await this.getByEmail(kycUpdate.email);
      if (!customer) throw "Customer not found";
      const { error } = customer;
      if (error) throw error;
      let customerObj = customer as ICustomer;
      customerObj.kyc = kycUpdate.kyc;
      await this.update(customerObj._id, customerObj);
      return { ...customerObj };
    } catch (error) {
      return { error };
    }
  }
}

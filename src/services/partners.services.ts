import partnersModel from "../models/partners.model";
import { IPartner } from "../types/partners.types";

export class PartnerServices {
  constructor() {}

  async create(partner: IPartner) {
    try {
      console.log("partner :>> ", partner);
      const partnerCreated = await new partnersModel({ ...partner }).save();
      return await this.getById(partnerCreated._id.toString());
    } catch (error) {
      return { error };
    }
  }

  async getById(id: string) {
    try {
      const partner = await partnersModel.findById(id).lean();
      return { ...partner };
    } catch (error) {
      return { error };
    }
  }

  async getAll() {
    try {
      const partners = await partnersModel.find({ isDeleted: false }).lean();
      return partners;
    } catch (error) {
      return { error };
    }
  }

  async update(id: string, partnerUpdateData: IPartner) {
    try {
      await partnersModel.findByIdAndUpdate(id, partnerUpdateData, {
        new: true,
      });
      return await this.getById(id);
    } catch (error) {
      return { error };
    }
  }

  async logicDelete(id: string) {
    try {
      await partnersModel.findByIdAndUpdate(id, {
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
      await partnersModel.findByIdAndDelete(id);
      return { deleted: true };
    } catch (error) {
      return { error };
    }
  }
}

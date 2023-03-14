//create crud for User model

import usersModel from "../models/users.model";
import { IUserInput, IUserOutput, IUserUpdate } from "../types/users.types";
import bcrypt from "bcryptjs";

export const HashText = async (password) => {
  const salt = await bcrypt.genSalt(12);
  const passHashed = await bcrypt.hash(password, salt);
  return passHashed;
};

export const CompareHashedText = async (hashedText, clearText) => {
  return await bcrypt.compare(clearText, hashedText);
};

export class userServices {
  constructor() {}

  async create(userInput: IUserInput) {
    try {
      const existsUser = await this.getByEmail(userInput.email);
      if (existsUser) {
        const { error } = existsUser;
        if (error) return existsUser;
        if (existsUser) return { error: "User already exists" };
      }
      const userData = {
        ...userInput,
        password: await HashText(userInput.password),
      };
      const user = await usersModel.create(userData);
      return await this.getById(user._id.toString());
    } catch (error) {
      return { error };
    }
  }

  async getById(id: string) {
    try {
      const user = await usersModel.findById(id).lean();
      const { password, ...userWithoutPassword } = user;
      return { ...userWithoutPassword };
    } catch (error) {
      return { error };
    }
  }

  async getByEmail(email: string) {
    try {
      const user = await usersModel.findOne({ email }).lean();
      if (!user) return null;
      const { password, ...userWithoutPassword } = user;
      return { ...userWithoutPassword };
    } catch (error) {
      return { error };
    }
  }

  async update(id: string, userUpdateData: IUserUpdate) {
    try {
      await usersModel.findByIdAndUpdate(id, userUpdateData, {
        new: true,
      });
      return await this.getById(id);
    } catch (error) {
      return { error };
    }
  }

  async deleteLogic(id: string) {
    try {
      await usersModel.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
      );
      return await this.getById(id);
    } catch (error) {
      return { error };
    }
  }
}

import { ICredentials } from "../types/credentials.types";
import credentialsModel from "../models/credentials.model";
import { formatedApyKey, generateRandomString } from "../utils/otp";
import { CompareHashedText, HashText } from "./users.services";

class CredentialsServices {
  constructor() {}

  async create(credentials: ICredentials) {
    try {
      const exists = await this.getByEmailAndCredentialFor(
        credentials.email,
        credentials.credentialFor
      );
      if (exists) {
        throw `This ${credentials.credentialFor} have a API Key for this email.`;
      }

      const clearKeys = {
        apiSecret: generateRandomString(32),
        apiKey: formatedApyKey(),
      };
      credentials.apiSecret = await HashText(clearKeys.apiSecret);
      credentials.apiKey = await HashText(clearKeys.apiKey);

      const credentialsCreated = await new credentialsModel({
        ...credentials,
      }).save();
      let result = await this.getById(credentialsCreated._id.toString());

      return { ...result, ...clearKeys };
    } catch (error) {
      return { error };
    }
  }

  async getByEmailAndCredentialFor(email: string, credentialFor: string) {
    try {
      let credentialsResult = await credentialsModel.findOne({
        email,
        credentialFor,
        isActive: true,
        isDeleted: false,
      });
      if (credentialsResult) {
        let { apiKey, apiSecret, ...credentials } = credentialsResult;
        return { ...credentials };
      } else {
        return null;
      }
    } catch (error) {
      console.log("error", error);
      return { error };
    }
  }

  async getById(id: string) {
    try {
      let credentialsResult = await credentialsModel.findById(id).lean();
      if (credentialsResult) {
        let { apiSecret, ...credentials } = credentialsResult;
        credentialsResult = credentials;
      }

      let { apiKey, apiSecret, ...credentialsResultData } = credentialsResult;

      return { ...credentialsResultData };
    } catch (error) {
      return { error };
    }
  }

  async getAllByEntityId(idEntity: string) {
    try {
      const credentials = await credentialsModel.find({ idEntity }).lean();
      if (credentials && credentials.length > 0)
        return this.prepareRows(credentials);
      return [];
    } catch (error) {
      return { error };
    }
  }

  async getAll() {
    try {
      const credentials = await credentialsModel.find().lean();
      if (credentials && credentials.length > 0)
        return this.prepareRows(credentials);
      return [];
    } catch (error) {
      return { error };
    }
  }

  async deleteLogic(id: string) {
    try {
      await credentialsModel.findByIdAndUpdate(id, { isDeleted: true });
      return { deleted: true };
    } catch (error) {
      return { error };
    }
  }

  async delete(id: string) {
    try {
      await credentialsModel.findByIdAndDelete(id);
      return { deleted: true };
    } catch (error) {
      return { error };
    }
  }

  async getCredentialIfIsValid(email: string, clearApiKey: string) {
    try {
      const credentials = await credentialsModel.findOne({ email });
      if (!credentials) throw "Incorrect credential combination";
      const { apiKey } = credentials;
      const isApiKeyValid = await CompareHashedText(apiKey, clearApiKey);
      if (isApiKeyValid) return await this.getById(credentials._id.toString());
      return null;
    } catch (error) {
      return { error };
    }
  }

  private prepareRows = (rows: ICredentials[]) => {
    return rows.map((row) => {
      let { apiSecret, ...credentials } = row;
      return credentials;
    });
  };
}

export default CredentialsServices;

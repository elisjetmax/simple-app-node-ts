import { IWhiteList } from "../types/whiteLists.types";
import whiteListIpsModel from "../models/whiteListIps.model";

import { IpFilter } from "express-ipfilter";
export class whiteListServices {
  constructor() {}

  async init() {
    try {
      const nroWhiteListsIps = await whiteListIpsModel.estimatedDocumentCount();
      if (nroWhiteListsIps) return;
      console.log("Creando WhiteLists Ips...");

      const values = await Promise.all([
        new whiteListIpsModel({
          IP: "::1",
          description: "localhost IPv6",
        }).save(),
        new whiteListIpsModel({
          IP: "127.0.0.1",
          description: "localhost IPv4",
        }).save(),
      ]);
      console.log("WhiteLists Ips Creados!");
    } catch (error) {
      return { error };
    }
  }

  async getAll() {
    try {
      const whiteLists = await whiteListIpsModel.find().lean();
      return [...whiteLists];
    } catch (error) {
      return { error };
    }
  }
  async getByIP(IP: string) {
    try {
      const whiteIpItem = await whiteListIpsModel.findOne({ IP }).lean();
      if (!whiteIpItem) return null;
      return { ...whiteIpItem };
    } catch (error) {
      return { error };
    }
  }

  async addToFilter(app: any, ips: string[]) {
    console.log("adding this IPs to filter:", ips);
    app.use(IpFilter(ips, { mode: "allow" }));
    app.set("filteredIpList", ips);
    console.log("IPs added to filter");
  }

  async create(whiteList: IWhiteList) {
    try {
      if (await this.getByIP(whiteList.IP))
        return { error: "IP already exists in WhiteList" };
      await new whiteListIpsModel(whiteList).save();
      return await this.getAll();
    } catch (error) {
      return { error };
    }
  }

  async delete(IP: string) {
    try {
      await whiteListIpsModel.deleteOne({ IP });
      return await this.getAll();
    } catch (error) {
      return { error };
    }
  }
}

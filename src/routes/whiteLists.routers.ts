import { Request, Response, Router } from "express";
import { whiteListServices } from "../services/whiteLists.services";
import { IWhiteList } from "../types/whiteLists.types";

class whiteListRoutes {
  _whiteListRoutes = Router();
  constructor() {}

  async routes(app) {
    this._whiteListRoutes.post(
      "/create",
      async (req: Request, res: Response) => {
        const dataIP = {
          IP: req.body.IP,
          description: req.body.description,
        };
        let whiteListRows = (await new whiteListServices().create(
          dataIP
        )) as any;
        const { error } = whiteListRows;
        if (error) return res.json({ error });
        whiteListRows = whiteListRows as IWhiteList[];
        const IPs =
          (whiteListRows && whiteListRows.map((x: any) => x.IP)) || [];
        await new whiteListServices().addToFilter(app, IPs);
        console.log(
          `La [${dataIP.IP} - ${dataIP.description}] ha sido agregada a la WhiteList`
        );
        return res.json(whiteListRows);
      }
    );

    this._whiteListRoutes.delete(
      "/delete/:IP",
      async (req: Request, res: Response) => {
        const { IP } = req.params;
        let whiteListRows = (await new whiteListServices().delete(IP)) as any;
        const { error } = whiteListRows;
        if (error) return res.json({ error });
        whiteListRows = whiteListRows as IWhiteList[];
        const IPs =
          (whiteListRows && whiteListRows.map((x: any) => x.IP)) || [];
        await new whiteListServices().addToFilter(app, IPs);
        console.log(`La [${IP}] ha sido eliminada a la WhiteList`);
        return res.json(whiteListRows);
      }
    );
    return this._whiteListRoutes;
  }
}

export default whiteListRoutes;

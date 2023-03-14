import { Request, Response, Router } from "express";
import { PartnerServices } from "../services/partners.services";

const partnerRoutes = Router();

partnerRoutes.get("/list", async (req: Request, res: Response) => {
  const partners = await new PartnerServices().getAll();
  res.json(partners);
});

partnerRoutes.get("/:id", async (req: Request, res: Response) => {
  const partner = await new PartnerServices().getById(req.query.id.toString());
  res.json(partner);
});

partnerRoutes.delete("/:id", async (req: Request, res: Response) => {
  const partner = await new PartnerServices().delete(req.query.id.toString());
  res.json(partner);
});

partnerRoutes.put("/:id", async (req: Request, res: Response) => {
  const partner = await new PartnerServices().update(
    req.query.id.toString(),
    req.body
  );
  res.json(partner);
});

partnerRoutes.post("/create", async (req: Request, res: Response) => {
  const partner = await new PartnerServices().create(req.body);
  res.json(partner);
});

export default partnerRoutes;

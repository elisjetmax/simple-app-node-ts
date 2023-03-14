// create the cruds routes for credentials services

import { Request, Response, Router } from "express";
import CredentialsServices from "../services/credentials.services";

const credentialsRoutes = Router();

credentialsRoutes.post("/create", async (req: Request, res: Response) => {
  const credentials = await new CredentialsServices().create(req.body);
  res.json(credentials);
});

credentialsRoutes.get("/:id", async (req: Request, res: Response) => {
  const credentials = await new CredentialsServices().getById(req.params.id);
  res.json(credentials);
});

credentialsRoutes.get("/all", async (req: Request, res: Response) => {
  const credentials = await new CredentialsServices().getAll();
  res.json(credentials);
});

credentialsRoutes.get("/all/:idEntity", async (req: Request, res: Response) => {
  const credentials = await new CredentialsServices().getAllByEntityId(
    req.params.idEntity
  );
  res.json(credentials);
});

credentialsRoutes.delete("/logic/:id", async (req: Request, res: Response) => {
  const credentials = await new CredentialsServices().deleteLogic(
    req.params.id
  );
  res.json(credentials);
});

credentialsRoutes.delete("/:id", async (req: Request, res: Response) => {
  const credentials = await new CredentialsServices().delete(req.params.id);
  res.json(credentials);
});

export default credentialsRoutes;

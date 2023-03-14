import { Request, Response, Router } from "express";
import { isValidObjectId } from "mongoose";
import { validateApiCredentials } from "../middlewares/apiKeyValidation.middleware";
import { isPartnerValidation } from "../middlewares/isPartner.middleware";
import { CustomerServices } from "../services/customers.services";
import { validateEmail } from "../utils/generics";

const customersRoutes = Router();

customersRoutes.get("/list", async (req: Request, res: Response) => {
  const customers = await new CustomerServices().getAll();
  res.json(customers);
});

customersRoutes.get(
  "/:idOrEmail",
  [validateApiCredentials, isPartnerValidation],
  async (req: Request, res: Response) => {
    const { idOrEmail } = req.params;
    let customer = null;
    if (isValidObjectId(idOrEmail))
      customer = await new CustomerServices().getById(idOrEmail);

    if (!customer && validateEmail(idOrEmail))
      customer = await new CustomerServices().getByEmail(idOrEmail);

    res.json(customer);
  }
);

customersRoutes.delete("/:id", async (req: Request, res: Response) => {
  const customer = await new CustomerServices().delete(
    req.params.id.toString()
  );
  res.json(customer);
});

customersRoutes.post(
  "/create",
  [validateApiCredentials, isPartnerValidation],
  async (req: Request, res: Response) => {
    const customer = await new CustomerServices().create(req.body);
    res.json(customer);
  }
);
customersRoutes.put(
  "/kyc",
  [validateApiCredentials, isPartnerValidation],
  async (req: Request, res: Response) => {
    console.log("req.body :>> ", req.body);
    const customer = await new CustomerServices().updateKYCByEmail(req.body);
    res.json(customer);
  }
);

customersRoutes.put(
  "/:id",
  [validateApiCredentials, isPartnerValidation],
  async (req: Request, res: Response) => {
    const customer = await new CustomerServices().update(
      req.params.id.toString(),
      req.body
    );
    res.json(customer);
  }
);

export default customersRoutes;

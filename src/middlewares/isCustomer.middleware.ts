import { NextFunction, Request, Response } from "express";

export const isCustomerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.credentials)
    return res
      .status(401)
      .json({ error: "Invalid credentials", code: "PR-MW-FC-01" });
  const { credentialFor } = req.credentials;

  if (credentialFor !== "customer")
    return res.status(401).json({
      error: `Invalid credentials for ${credentialFor}s`,
      code: "PR-MW-FC-02",
    });

  next();
};

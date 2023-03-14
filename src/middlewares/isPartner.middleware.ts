import { NextFunction, Request, Response } from "express";

export const isPartnerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.credentials)
    return res
      .status(401)
      .json({ error: "Invalid credentials", code: "PR-MW-FP-01" });
  const { credentialFor } = req.credentials;

  if (credentialFor !== "partner")
    return res.status(401).json({
      error: `Invalid credentials for ${credentialFor}s`,
      code: "PR-MW-FP-02",
    });

  next();
};

import { NextFunction, Request, Response } from "express";
import CredentialsServices from "../services/credentials.services";
import { ICredentials } from "../types/credentials.types";
import { validateEmail } from "../utils/generics";

export const validateApiCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ error: "Authorization header missing" });

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer") {
    return res.status(401).json({ error: "Invalid authorization scheme" });
  }
  const [email, clearApiKey] = token.split(":");
  if (!validateEmail(email) || !clearApiKey)
    return res.status(401).json({ error: "The credential format is invalid" });

  const credential = await new CredentialsServices().getCredentialIfIsValid(
    email,
    clearApiKey
  );

  if (!credential)
    return res.status(401).json({ error: "Invalid credentials" });

  req.credentials = credential as ICredentials;
  next();
};

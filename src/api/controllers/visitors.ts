import { IVisitor, VisitorsService } from "../../proxyclick/visitors";
import { ICredentials } from "../../proxyclick/credentials";
import { Request, Response, NextFunction } from "express";
import { handleCheckin, Visitor } from "../../process/process";
import { visitors } from "../../../data/visitors";

export const getVisitors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const visitors: Visitor[] = await VisitorsService.getVisitors(req.query);
    return res.status(200).json({
      visitors,
    });
  } catch (e) {}
};

export const checkIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const visitor: Partial<IVisitor> = req.body;
  const credentials: ICredentials = await handleCheckin(visitor);
  console.log(visitor, credentials);
  return res.status(200).json(credentials);
};

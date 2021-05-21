import { IVisitor, VisitorsService } from "../../proxyclick/visitors";
import { ICredentials } from "../../proxyclick/credentials";
import { Request, Response, NextFunction } from "express";
import { handleCheckin, Visitor } from "../../process/process";
import { Sender } from "../../sender/sender";

/**
 * Returns all visitors
 * Able to use query parameters
 *
 * @param {Request} req request
 * @param {Response} res response
 * @returns {Visitor[]} visitors
 */
export const getVisitors = async (req: Request, res: Response) => {
  try {
    const visitors: Visitor[] = await VisitorsService.getVisitors(req.query);
    return res.status(200).json(visitors);
  } catch (e) {
    return res.status(500).json({ status: 500, error: e });
  }
};

/**
 * Handles checkin (generates or fetched the credentials)
 * based on the passed body: {firstname, lastname, email}
 *
 * @param {Request} req request
 * @param {Response} res response
 * @returns status 204
 */
export const checkIn = async (req: Request, res: Response) => {
  try {
    const visitor: Partial<IVisitor> = req.body;
    const credentials: ICredentials = await handleCheckin(visitor);
    console.log(credentials);
    await Sender.sendMessage(credentials, visitor.email);
    return res.status(204).send();
  } catch (e) {
    return res.status(500).json({ status: 500, error: e });
  }
};

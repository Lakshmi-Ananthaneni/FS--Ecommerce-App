import express, { Request, RequestHandler, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { Types } from 'mongoose';

export interface TokenInterface {
  id: string;
}
export interface CustomRequest extends Request {
  id: String ;
}

export const isAuthorised = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //console.log("cookie",req.headers.cookie)
    //first check if there is a cookie available
    if (!req.headers.cookie) {
      return res.status(404).send({
        message: 'no cookie found'
      });
    }
    //get just the token from the cookie
    const token = req.headers.cookie.split('=')[1];
    if (!token) {
      return res.status(404).send({
        message: 'No token found'
      });
    }
    // verify the token
    const privKey = process.env.JWT_SECRET;
    jwt.verify(token, String(privKey), function (err, decoded) {
      if (err) {
        console.log(err);
        return res.status(400).send({
          message: 'Could not verify token'
        });
      }
      //console.log("decoded:",decoded);
      (req as CustomRequest).id = (decoded as TokenInterface).id;
      //console.log((req as CustomRequest).id)
      next();
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message
    });
  }
};
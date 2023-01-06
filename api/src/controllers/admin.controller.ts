import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { securePassword, comparePassword } from '../config/securePassword';
import { errorRes, successRes } from '../helpers/res-helper';
import User, { UserDocument } from '../models/model.users';

import { CustomRequest, TokenInterface } from '../middlewares/authorise';
import { sendVerificationEmail } from '../util/sendVerificationEmail';
import { createToken } from '../util/createToken';
import { sendResetPasswordEmail } from '../util/sendResetPasswordEmail';

export interface VerifyTokenInterface {
  firstname: string;
  lastname: string;
  email: string;
  hashPW: string;
  phone: string;
}

// login user (POST)
export const loginAdmin: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const foundAdmin = await User.findOne({ email: email });
    if (!foundAdmin) {
      return errorRes(res, 404, 'Admin with this email does not exist');
    }
    //check if isAdmin
    if (foundAdmin.isAdmin !== 1) {
      return errorRes(res, 401, 'Not an admin, please use user login');
    }
    const isPwMatch = await comparePassword(password, foundAdmin.password);
    if (!isPwMatch) {
      return errorRes(res, 406, 'email or password does not match');
    }
    // clear previous cookies if exists
    if (req.cookies[`${(foundAdmin as UserDocument)._id}`]) {
      req.cookies[`${(foundAdmin as UserDocument)._id}`] = '';
    }
    const privKey =  process.env.JWT_SECRET;

    // create the token
    const token = jwt.sign({ id: foundAdmin._id }, String(privKey), {
      expiresIn: '3m'
    });

    // create cookie to send the token inside
    res.cookie(String(foundAdmin._id), token, {
      path: '/',
      expires: new Date(Date.now() + 1000 * 170),
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });
    //send the token to the frontend
    return res.status(200).send({ message: 'login success', token: token });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message
    });
  }
};

// GET method /dashboard
export const showDashboard: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundUsers = User.find({ isAdmin: false });
    if (!foundUsers) {
      return errorRes(res, 404, 'Could not find users');
    } else {
      return res.status(200).send({ message: 'success', users: foundUsers });
    }
  } catch (error) {
    res.status(500).send({
      message: 'server error'
    });
  }
};
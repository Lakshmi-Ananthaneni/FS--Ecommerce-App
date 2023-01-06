import { Request, Response, RequestHandler,NextFunction } from 'express'

import User, { UserDocument } from '../models/model.users'
import userService from '../services/users.service'
import { BadRequestError } from '../helpers/apiError'
import { securePassword, comparePassword } from '../config/securePassword'
import jwt,{ JsonWebTokenError } from 'jsonwebtoken'
import { sendVerificationEmail } from '../util/sendVerificationEmail'
import { v4 } from 'uuid';
import { successRes } from '../helpers/res-helper'
import { errorRes } from '../helpers/res-helper'
import { CustomRequest, TokenInterface } from '../middlewares/authorise'
import { sendResetPasswordEmail } from '../util/sendResetPasswordEmail'
import { createToken } from '../util/createToken'
import { uuid } from 'uuidv4'

export interface VerifyTokenInterface {
  firstname: string;
  lastname: string;
  email: string;
  hashPW: string;
  phone: string;
 
}




// register User (POST)
export const registerUser: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email,password,phone } = req.body;
    if (!firstname ||!lastname || !email || !password || !phone) {
      return errorRes(res, 400, 'must provide all fields');
    }
    if (password.length < 8) {
      return errorRes(res, 400, 'password must be at least 8 characters long');
    }
    //check if email already registered:
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return errorRes(res, 400, 'User with this email address already exists');
    }
    const hashPW = await securePassword(password);

    //create jwt token, pass user input as payload in token
    const privKey = process.env.JWT_SECRET;
    const token = jwt.sign({firstname,lastname, email, hashPW, phone }, String(privKey), {
      expiresIn: '1d'
    });

    const emailData = {
      email,
      subject: 'Account verification',
      html: `
      <p>Hi ${firstname}!<a href="http://localhost:3000/activate-account/${token}">Please click on this link to verify your email address.</a></p>
      `
    };

    sendVerificationEmail(emailData);
    return successRes(res, 200, 'Please check your email address to verify your account.');
  } catch (error: any) {
    return res.status(500).send({
      message: error.message
    });
  }
};

// POST method /verify
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.params;
    console.log(req.params);
    if (token) {
      const privKey = process.env.JWT_SECRET;
      jwt.verify(token, String(privKey), async (err: any, decoded: any) => {
        if (err) {
          return  res.status(401).send({ message: 'link has expired, please register again' })
        }
        console.log('decoded from verify user controller:', decoded);
        const { firstname,lastname, email, hashPW, phone } = decoded as VerifyTokenInterface;
        //check if user exists
        const foundUser = await User.findOne({ email: email });

        if (foundUser) {
          return res.status(400).send({ message: 'User with this email address already exists' }) 
        }
        //set verify to true
        const newUser = new User({
          id: v4(),
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: hashPW,
          phone: phone,
          isVerify: 1,
          isAdmin: 0,
        });
        const userData = await newUser.save();
        if (!userData) {
          return errorRes(res, 400, 'User could not be created');
        }
        return successRes(res, 200, 'User successfully verified. Please log in.');
      });
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
};
// POST /users/signin
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const foundUser = await User.findOne({ email: email })
      //console.log(foundUser)
      if (!foundUser) {
        return errorRes(res, 404, 'User with this email does not exist');
      }
      //compare password and check if correct
      const isPwMatch = await comparePassword(password, foundUser.password)
      if (!isPwMatch) {
        return errorRes(res, 406, 'email or password does not match');
      }
      if (foundUser.isVerify) {
        // clear previous cookies if exists
        if (req.cookies[`${(foundUser as UserDocument)._id}`]) {
          req.cookies[`${(foundUser as UserDocument)._id}`] = '';
        }
        const privKey = process.env.JWT_SECRET;
        // create the token
        const token = jwt.sign({ id: foundUser._id }, String(privKey), {
          expiresIn: '30m'
        });
        //console.log(token)
        res.cookie(String(foundUser._id), token, {
          path: '/',  
          expires: new Date(Date.now() + 1000 * 1700), 
          // Setting httpOnly prevents client-side scripts from accessing data
          httpOnly: true,
          sameSite:'lax',
          //sameSite: 'none',
          secure: true
        });
        //send the token to the frontend
        return res.status(200).send({ message: 'login success',token});
        
      } else {
        return errorRes(res, 400, 'Please verify email first');
      }
    } catch (error) {
      if (error instanceof Error && error.name == 'ValidationError') {
        next(new BadRequestError('Invalid Request', 400, error))
      } else {
        next(error)
      }
    }
  }

// POST method /forgot-password
export const forgotPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email: email });
    
    if (userData) {
      if (userData.isVerify  === 1) {
        const newToken = createToken();
        const updatedToken = await User.updateOne(
          { email: email },
          {
            $set: {
              token: newToken
            }
          }
        );
        if (updatedToken) {
          const { id, firstname, email } = userData;
          sendResetPasswordEmail(id, firstname, email, 'Reset Password', newToken, 'users');
          return successRes(res, 200, 'password reset email sent.');
        }
      } else {
        return errorRes(res, 400, 'Please verify your email first');
      }
    } else {
      return errorRes(res, 404, 'Failed to find user with email.');
    }
  } catch (error) {
    res.status(500).send({
      message: 'server error'
    });
  }
};

// POST method /reset-password
export const resetPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //try to find user with token passed in url params
    const { token } = req.params;
    const userData = await User.findOne({ token: token });
    if (userData) {
      const { password } = req.body;
      console.log(password);
      const hashPW = await securePassword(password);
      await User.findOneAndUpdate(
        { token: userData.token },
        {
          $set: {
            password: hashPW,
            token: ''
          }
        }
      );
      return successRes(res, 201, 'password successfully changed!');
    } else {
      errorRes(res, 404, 'Could not find user');
    }
  } catch (error: any) {
    return res.status(500).send({
      message: error.message
    });
  }
};

// /refresh (GET)
export const createRefreshToken: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //check if there is a cookie (check if user is already logged in)
    if (!req.headers.cookie) {
      return res.status(404).send({
        message: 'no cookie found'
      });
    }
    //get token out of the cookie
    const oldToken = req.headers.cookie.split('=')[1];
    if (!oldToken) {
      return res.status(404).send({
        message: 'No token found'
      });
    }

    //verify the old token
    const privKey = process.env.JWT_SECRET;
    jwt.verify(oldToken, String(privKey), function (err, decoded) {
      if (err) {
        console.log(err);
        return res.status(400).send({
          message: 'Could not verify token'
        });
      }
      //if the token IS verified --> reset OLD cookies in res and req header
      req.cookies[`${(decoded as TokenInterface).id}`] = '';
      res.clearCookie(`${(decoded as TokenInterface).id}`, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/'
      });

      //generate the NEW token:
      const newToken = jwt.sign({ id: (decoded as TokenInterface).id }, String(privKey), {
        expiresIn: '2m'
      });
      // send the NEW token inside cookie
      res.cookie(String((decoded as TokenInterface).id), newToken, {
        //Cookies sent to clients can be set for a specific path, not just a domain.
        path: '/',
        expires: new Date(Date.now() + 1000 * 100),
        httpOnly: true,
        sameSite: 'none',
        secure: true
      });
      
      (req as CustomRequest).id = (decoded as TokenInterface).id;
      
      next();
    });
  } catch (error: any) {
    return res.status(500).send({
      message: error.message
    });
  }
};
// /profile (GET)
export const showProfile: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
  try {
    console.log(req)
    const foundUser = await User.findOne({ _id: (req as CustomRequest).id }, { password: 0 });
    //console.log(foundUser)
    if (!foundUser) {
      return errorRes(res, 404, 'User does not exist');
    }
    successRes(res, 200, 'user found', foundUser);
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
};
 // Signout User
export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.cookie) {
      return res.status(400).send({
        message: 'no cookie found'
      });
    }
    const token = req.headers.cookie.split('=')[1];
    if (!token) {
      return res.status(404).send({
        message: 'Token not found'
      });
    }

    // verify token
    const privKey =  process.env.JWT_SECRET;
    jwt.verify(token, String(privKey), function (err, decoded) {
      if (err) {
        console.log(err);
        return res.status(400).send({
          message: 'Could not verify token'
        });
      }
      //clear cookies
      req.cookies[`${(decoded as TokenInterface).id}`] = '';
      res.clearCookie(`${(decoded as TokenInterface).id}`, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
        path: '/'
      });
    });
    res.status(200).json({
      message: 'user logged out'
    });
  } catch (error) {
    res.status(500).send(error)
  }
} 
  //PUT /users/:id
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {  firstname, lastname, email,phone } = req.body
    const { id } = req.params
    const foundUser = await User.findOne({ _id: id })
    if (!foundUser) {
      return errorRes(res, 404, 'Could not find user')
    }
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        firstname,
        lastname,
        email,
        phone,
      },
      {
        new: true,
      }
    )
    if (!updatedUser) {
      return errorRes(res, 404, 'Could not update user information')
    }
    return successRes(res, 200, 'updated user successfully', updatedUser)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
// PUT /users/edit-password/:userId
export const updateUserPassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, oldpassword, newpassword, confirmpassword } = req.body
    const { id } = req.params
    const foundUser = await User.findOne({ _id: id, email:email })
    if (!foundUser) {
      return errorRes(res, 404, 'Could not find user')
    }
    const plainPW = await comparePassword(oldpassword, foundUser.password)
    if (!plainPW) {
      return errorRes(res, 404, 'Wrong password')
    }
    if (newpassword !== confirmpassword) {
      return errorRes(res, 400, 'Confirm password does not match')
    }
    const hashPW = await securePassword(newpassword)
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        password: hashPW,
      },
      {
        new: true,
      }
    )
    if (!updatedUser) {
      return errorRes(res, 404, 'Could not update user password')
    }
    return successRes(res, 200, 'updated password successfully')
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
// GET /users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return successRes(res, 200, 'users was returned', users);
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// GET /users/:userId
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params
    const foundUser = await User.findById(userId)
    if (!foundUser) {
      res.status(404).send({ message: `User ${userId} not found` })
    }
    //return successRes(res, 200, 'user was returned`', foundUser);
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
// DELETE /users/:userId
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.status(200).send({
      message: 'user was succesfully deleted',
    })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

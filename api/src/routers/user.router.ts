import express from 'express'

import {
  getAllUsers,getUserById,deleteUser,updateUser,
  loginUser, logoutUser,
  registerUser,verifyUser,
  forgotPassword,resetPassword,
  showProfile,createRefreshToken, updateUserPassword,
} from '../controllers/users.controllers'
//import session from 'express-session'
import dotenv from 'dotenv'
import { isAuthorised } from '../middlewares/authorise'

dotenv.config()

const router = express.Router()

//use the session 
/*router.use(
  session({
    secret: process.env.SECRET_KEY as string,
    resave: false,
    saveUninitialized: true,
  })
)*/


router.get('/profile',isAuthorised, showProfile);
router.post('/register', registerUser)
router.post('/verify/:token', verifyUser)
router.post('/login', loginUser)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token',resetPassword)
//router.get('/profile',isAuthorised, showProfile);
router.get('/refresh', createRefreshToken,isAuthorised, showProfile);
router.post('/logout',isAuthorised, logoutUser)

router.put('/:id',isAuthorised,updateUser)
router.put('/edit-password/:id',isAuthorised,updateUserPassword)
router.get('/', getAllUsers)
router.get('/:userId', getUserById)
router.delete('/:userId', deleteUser)

export default router


/*router.get("/search/:id([0-9]{4})", (req, res) => {
  res.status(200).send("serach user by id" + req.params.id);
});*/
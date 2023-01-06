import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan';
import cookieParser from 'cookie-parser'
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// import session from 'express-session'
// import passport from 'passport'
//import apiContentType from './middlewares/apiContentType'

import apiErrorHandler from './middlewares/apiErrorHandler'
import productsRouter from './routers/product.router'
import userRouter from './routers/user.router'
import adminRouter from './routers/admin.router'
import categoryRouter from './routers/category.router'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT)

// Global middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan('dev'))
//app.use(apiContentType)


app.get('/', (req, res) => {
  res.send('<h1>Welcome</h1>')
})

// Set up routers
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/categories', categoryRouter)

// Custom API error handler
app.use(apiErrorHandler)

//Swagger jsoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
      description: 'A REST API for products'
    },
    servers: [
      {
        url: 'htpp://localhost:4000',
      },
    ],
  },
  apis: ['./src/routers/*.ts'],
};
const openapiSpecification = swaggerJsdoc(options);
//Swagger ui express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));



/** using passport also requires to ass session and cookieParser middlewares to express
 * To be activated later
app.use(cookieParser())
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 60 * 60 * 24,
    },
    secret: 'secret',
  })
)
app.use(passport.initialize())
app.use(passport.session())
*/

export default app

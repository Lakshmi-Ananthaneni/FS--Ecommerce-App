import { Request, Response, NextFunction } from 'express'

import Products from '../models/model.Products'
import productService from '../services/products.service'
import { BadRequestError } from '../helpers/apiError'
import braintree from 'braintree'
import {
  BT_MERCHANT_ID,
  BT_PRIVATE_KEY,
  BT_PUBLIC_KEY,
  JWT_SECRET,
} from '../util/secrets'
import { errorRes, successRes } from '../helpers/res-helper'
import { sendVerificationEmail } from '../util/sendVerificationEmail'

// Braintree Setup - for deployment, the info below must be changed
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: BT_MERCHANT_ID,
  publicKey: BT_PUBLIC_KEY,
  privateKey: BT_PRIVATE_KEY,
})
//console.log(gateway)
// GET /products
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await productService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
// GET /products/:productId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //res.json(await productService.findById(req.params.productId))
    res.json(await productService.findById(req.params._id))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
// POST /products
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, description, rating, category,sold,quantity} = req.body
    const product = new Products({
      image: req?.file?.filename,
      name,
      price,
      description,
      rating,
      category,
      sold,
      quantity,
    })

    await productService.create(product)
    res.send(product)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// PUT /prducts/:productId
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const productId = req.params.productId
    const updatedProduct = await productService.update(productId, update)
    res.json(updatedProduct)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// DELETE /products/:productId
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await productService.deleteProduct(req.params.productId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
// search /products
export const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   
    const {searchValue} = req.params
    const products = await Products.find({
     $or: [
      {name:{$regex: searchValue, $options: "i"}},
      {description:{$regex: searchValue, $options: "i"}},
     ]
    })
   return res.json(products)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

// braintree token
export const getBraintreeToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const braintreeToken = await gateway.clientToken.generate({})
    //console.log(braintreeToken)
    if (!braintreeToken) {
      return errorRes(res, 500, 'could not create braintree token')
    }
    return res.status(200).json(braintreeToken)
    
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}

export const processBraintreePayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nonce, cartItems,totalAmount } = req.body
    
    gateway.transaction
      .sale({
        amount:totalAmount,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      })
      .then(function (result) {
        if (result.success) {
          console.log('Transaction ID: ' + result.transaction.id)
          return successRes(res, 200, 'order success')
        } else {
          console.error(result.message)
          return errorRes(res, 400, 'Could not process order')
        }
      })
      .catch(function (err) {
        console.error(err)
      })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', 400, error))
    } else {
      next(error)
    }
  }
}
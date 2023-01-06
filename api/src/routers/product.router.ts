import express from 'express'

import {
  createProduct,findById,findAll,
  deleteProduct,updateProduct,
  searchProducts,
  getBraintreeToken,
  processBraintreePayment,
} from '../controllers/product.controller'
const { upload } = require("../middlewares/fileUpload");

const router = express.Router()

//payment routes
router.get ("/braintree/token",getBraintreeToken)
router.post("/braintree/payment",processBraintreePayment)

router.get('/search/:searchValue', searchProducts)

router.get('/', findAll)
//router.get('/:productId', findById)
router.get('/:_id', findById)
router.post('/',upload.single("image"), createProduct)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

// creating a reusable schema
/**
 *@swagger
 *components:
 *  schemas:
 *    Product:
 *      type: object
 *      required:
 *        - name
 *        - price
 *        - category
 *        - description
 *        - rating       
 *      properties:
 *        id:
 *          type: string
 *          description: auto generated id of the product
 *        name:
 *          type: string
 *          description: title of the product
 *        price:
 *          type: number
 *          description: price of the product
 *        category:
 *          type: string
 *          description: category of the product
 *        description:
 *          type: string
 *          description: description of the product
 *        rating:
 *          type: number
 *          description: rating of the product
 *      example:
 *          id: ahiahuhauhuahuahuha
 *          name: Mens Casual Premium Slim Fit T-Shirts
 *          price: 50.55
 *          description: Slim-fitting style, contrast raglan long sleeve 
 *          category: men's clothing
 *          rating: 4.5
 */

// grouping requests into tags
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: E-Commerce app
 */

// get request for all products
/**
 * @swagger
 * /products:
 *  get:
 *    summary: Get all the products
 *    tags: [Products]
 *    responses:
 *      200:
 *        description: all the products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 */

 

// get request for single product
/**
 * @swagger
 * /products/{id}:
 *  get:
 *    summary: Get the product with id
 *    tags: [Products]
 *    parameters:
 *      - in : path
 *        name : id
 *        schema:
 *          type: string
 *        required: true
 *        description: product id
 *    responses:
 *      200:
 *        description: the product with id
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Product'
 *      404:
 *        description: the product with id was not found
 */



// post request
/**
 * @swagger
 * /products:
 *  post:
 *    summary: Create a new product
 *    tags: [Products]
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Product'
 *    responses:
 *      201:
 *        description: the product was created
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Product'
 *      404:
 *        description: the product with id was not found
 *      500:
 *        description: server error
 */


// put request

/**
 * @swagger
 * /products/{id}:
 *  put:
 *    summary: Update the product with id
 *    tags: [Products]
 *    parameters:
 *      - in : path
 *        name : id
 *        schema:
 *          type: string
 *        required: true
 *        description: product id
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *                $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: the product was updated
 *      404:
 *        description: the product with id was not found
 *      500:
 *        description: server error
 */


// delete request

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *    summary: Delete the product with id
 *    tags: [Products]
 *    parameters:
 *      - in : path
 *        name : id
 *        schema:
 *          type: string
 *        required: true
 *        description: product id
 *    responses:
 *      200:
 *        description: the product was deleted
 *      404:
 *        description: the product with id was not found
 */





export default router

import Products, { ProductDocument } from '../models/model.Products'
import { NotFoundError } from '../helpers/apiError'

const create = async (product: ProductDocument): Promise<ProductDocument> => {
  return product.save()
}

//get product by id
const findById = async (_id: string): Promise<ProductDocument> => {
  const foundProduct = await Products.findById(_id)

  if (!foundProduct) {
    throw new NotFoundError(`Product  not found`)
  }
  return foundProduct
}

// get all products
const findAll = async (): Promise<ProductDocument[]> => {
  return Products.find().sort({ name: 1, createdAt: -1 })
}
//update the products
const update = async (
  productId: string,
  update: Partial<ProductDocument>
): Promise<ProductDocument | null> => {
  const foundProduct = await Products.findByIdAndUpdate(productId, update, {
    new: true,
  })

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }
  return foundProduct
}

//delete product
const deleteProduct = async (
  productId: string
): Promise<ProductDocument | null> => {
  const foundProduct = Products.findByIdAndDelete(productId)

  if (!foundProduct) {
    throw new NotFoundError(`Product ${productId} not found`)
  }
  return foundProduct
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteProduct,
}

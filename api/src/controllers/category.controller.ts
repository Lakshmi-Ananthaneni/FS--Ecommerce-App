import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import { ImportsNotUsedAsValues } from 'typescript';
import { v4 } from 'uuid';
import { errorRes, successRes } from '../helpers/res-helper';
import Category from '../models/model.categories';
import slugify from 'slugify';


// / (GET)
export const getAllCategories: RequestHandler = async (req: Request, res: Response) => {
  try {
   const categories = await Category.find();
    return successRes(res, 200, 'categories was returned', categories);
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      message: 'server error'
    });
  }
};

// /:id (GET)
export const getCategory: RequestHandler = async (req: Request, res: Response) => {
  try {
    const {slug } = req.params;
    //console.log(slug);
    const category = await Category.findOne({slug});
    if (category) {
      return successRes(res, 200, 'category was returned`', category);
    } else {
      return errorRes(res, 400, 'category with slug does not exist');
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      message: 'server error'
    });
  }
};

// / (POST)
export const createCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {name} = req.body;
    //console.log(req.body)
    if (!name ) {
        return errorRes(res,400,`please provide all  details`);
      }
      //check if category exist r not
      const existingCategory = await Category.findOne({name});
      if(existingCategory) {
        return errorRes(res,400,`Category exist with this name already`);
      }
      const newCategory = await new Category({
        name: name, //men clothe
        slug: slugify(name), // created as  men-clothe
    });
    //console.log(newCategory);
    const savedCategory = await newCategory.save();
    //console.log(savedCategory);
    return successRes(res, 201, 'category successfully created',savedCategory);

  } catch (error: any) {
    res.status(500).send({
      message: 'server error'
    });
  }
};

// /:id (POST)
export const updateCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const  existingCategory = await Category.findOne({_id: categoryId});
    if (!existingCategory) {
        return errorRes(res,400,`Category does not exist with this id`);
      }
      const updatedCategory = await Category.findByIdAndUpdate(
        {_id: categoryId},
          {name, slug: slugify
         (name)}, {new: true});
        
      if (updatedCategory) {
        successRes(res, 201, 'category successfully updated', updatedCategory);
      } else {
        return errorRes(res, 400, 'could not update category');
      }
  } catch (error: any) {
    res.status(500).send({
      message: 'server error'
    });
  }
};

// /:id (DELETE)
export const deleteCategory: RequestHandler = async (req: Request, res: Response) => {
  try {
    const {categoryId } = req.params;
    const  existingCategory = await Category.findById({_id: categoryId});
    if (!existingCategory) {
        return errorRes(res, 400, 'category with id does not exist');
      }
     const deletedCtegory = await Category.deleteOne({_id: categoryId});
      return successRes(res, 200, 'category deleted', deletedCtegory);
    
  } catch (error: any) {
    console.log(error);
    res.status(500).send({
      message: 'server error'
    });
  }
};
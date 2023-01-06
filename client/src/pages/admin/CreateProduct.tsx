import React, { useState } from 'react'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AdminSidebar } from 'components/AdminSidebar';

import { createCategory, createProduct } from 'services/adminService';
import { NewCategory, NewProduct } from 'types';
import { useAppDispatch } from 'redux/hooks';
import { useNavigate } from 'react-router-dom';

export const CreateProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      productId: "",
      name: "",
      description: "",
      price:0,
      image: "",
      category: " ",
      rating: 0,
    sold:0,
    quantity: 1
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: async (values: NewProduct, { resetForm }) => {
      try {
        const formData = new FormData()
        formData.append('name', values.name)
        formData.append('description', values.description)
        formData.append('category', values.category)
        formData.append('price', values.price  as any)
        formData.append('quantity', values.quantity  as any)
        formData.append('image', values.image)
        //dispatch(addProduct(formData))
        const res = await createProduct(values);
        if (res.status === 200) {
          //dispatch(setLoggedIn());
          //dispatch(setAdmin());
          toast.success(res.data.message);
          resetForm({});
          navigate("/dashboard/admin/products");
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });
  
    const [image, setImage] = useState("");
    const [ categoryId, setCategoryId] = useState("");
    
    const handleImageChange = (e : any) => {
       setImage(e.target.files[0]);
    }

  return (
    <div className='container-full'>
      <AdminSidebar />
      <div className='main-content'>
        <div className='profile'>
          <h3>Create Product</h3>
          <ToastContainer />
          <div className="page">
            <form onSubmit={formik.handleSubmit}>
              <div className="form__section">
              <div>
                 <label htmlFor="image">Image:</label>
                 <input type="file" id="image" {...formik.getFieldProps("image")}
                  accept='image/*' />
                 {formik.touched.image && formik.errors.image ? (
                 <div className="formikErrMsg">{formik.errors.image}</div>
                  ) : null}
                </div>
                <div>
                 <label htmlFor="name">Name:</label>
                 <input type="name" id="name" {...formik.getFieldProps("name")} />
                 {formik.touched.name && formik.errors.name ? (
                 <div className="formikErrMsg">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div>
                 <label htmlFor="description">Description:</label>
                 <input type="description" id="description" {...formik.getFieldProps("description")} />
                 {formik.touched.description && formik.errors.description ? (
                 <div className="formikErrMsg">{formik.errors.description}</div>
                  ) : null}
                </div>
                <div>
                 <label htmlFor="price">Price:</label>
                 <input type="price" id="price" {...formik.getFieldProps("price")} />
                 {formik.touched.price && formik.errors.price ? (
                 <div className="formikErrMsg">{formik.errors.price}</div>
                  ) : null}
                </div>
                <div>
                 <label htmlFor="rating">Rating:</label>
                 <input type="rating" id="rating" {...formik.getFieldProps("rating")} />
                 {formik.touched.rating && formik.errors.rating ? (
                 <div className="formikErrMsg">{formik.errors.rating}</div>
                  ) : null}
                </div>
                <div>
                 <label htmlFor="category">Category:</label>
                 <input type="category" id="category" {...formik.getFieldProps("category")} />
                 {formik.touched.category && formik.errors.category ? (
                 <div className="formikErrMsg">{formik.errors.category}</div>
                  ) : null}
                </div>
                <div>
                 <label htmlFor="sold">Sold:</label>
                 <input type="sold" id="sold" {...formik.getFieldProps("sold")} />
                 {formik.touched.sold && formik.errors.sold ? (
                 <div className="formikErrMsg">{formik.errors.sold}</div>
                  ) : null}
                </div>
                <div>
                 <label htmlFor="quantity">Qunatity:</label>
                 <input type="quantity" id="quantity" {...formik.getFieldProps("quantity")} />
                 {formik.touched.quantity && formik.errors.quantity ? (
                 <div className="formikErrMsg">{formik.errors.quantity}</div>
                  ) : null}
                </div>
              </div>
              <div className="form__section">
                <button className="submitBtn" type="submit">Create Product</button>
              </div>
            </form>
          </div>
        </div>
      </div> 
    </div>
    /*<div>
        <h3>Create Product</h3>
        <div>
            <input type="file" id="image" accept="image/*"
            onChange={handleImageChange} />
        </div>
        
        <div>
         <label htmlFor='category'>Select Category</label>
         <select name="category" id='category'>
            

         </select>
        </div>
        
    </div> */
  )
}

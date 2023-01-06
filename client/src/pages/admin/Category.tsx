import React, { useState, useEffect } from "react";
import LoadingGif from "../../asset/images/Loading_2.gif";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AdminSidebar } from 'components/AdminSidebar'
import { createCategory, deleteCategory, getCategories } from 'services/adminService';
import { DeleteCategory, NewCategory } from "types";

export const Category = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const categories= await getCategories();
      setCategories(categories);
      console.log(categories)
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

 const formik = useFormik({
    initialValues: {
      name: "",
      token: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: async (values: NewCategory, { resetForm }) => {
      try {
        const res = await createCategory(values);
        if (res.status === 200) {
          //dispatch(setLoggedIn());
          //dispatch(setAdmin());
          toast.success(res.data.message);
          resetForm({});
          //navigate("/dashboard");
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });
  const handleDelete = async (values:DeleteCategory) => {
    try {
      const res = await deleteCategory(values);
      toast.success(res.data.message);
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };
return (
    
    <div className="container-full">
      {/* sidebar */}
      <AdminSidebar  />
      {/* main content */}
      <div className="main-content">
        <div className="profile">
          <div>
            <h2>Create Category </h2>
            <ToastContainer />
            <div className="page">
            <form onSubmit={formik.handleSubmit}>
              <div className="form__section">
                <label htmlFor="name">Name:</label>
                <input type="name" id="name" {...formik.getFieldProps("name")} />
                 {formik.touched.name && formik.errors.name ? (
                 <div className="formikErrMsg">{formik.errors.name}</div>
                  ) : null}
              </div>
              <div className="form__section">
                <button className="submitBtn" type="submit">Create Category</button>
              </div>
              </form>
            </div>

            <div className="p-3">
            <h2>All the categories are here..</h2>
             <div className="categories__list p-3">
             <div >
              <button>Men's clothes</button>
                <div className="p-2">
                  <button className="btn ">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="trash  btn"
                    onClick={() => {
                      // @ts-ignore
                      handleDelete(category._id) }} >
                  <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
            </div>
            <div >
              <button>Women's clothes</button>
                <div className="p-2">
                  <button className="btn">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="trash  btn"
                    onClick={() => {
                      // @ts-ignore
                      handleDelete(category._id) }} >
                  <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
            </div>
             </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  ) 
};

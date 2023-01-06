
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserRegister } from "../../types";
import { registerUser } from "../../services/userService";
import { Link } from "react-router-dom";

export const Register = () => {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Required"),
      lastname: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
      phone: Yup.string()
        .required("Required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(8, "Must be exactly 8 digits")
        .max(12, "Must be exactly 12digits"),
    }),
    onSubmit: async (values: UserRegister, { resetForm }) => {
      try {
        const res = await registerUser(values);
        if (res.status === 200) {
          toast.success(res.data.message);
          resetForm({});
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });
  return (
    <div className="form">
      <ToastContainer />
      <h1>Create your account..</h1>
      <div className="page">
        <form onSubmit={formik.handleSubmit}>
          <div className="form__section">
            <label htmlFor="firstname">First Name:</label>
            <input type="text" id="firstname" {...formik.getFieldProps("firstname")} />
            {formik.touched.firstname && formik.errors.firstname ? (
              <div className="formikErrMsg">{formik.errors.firstname}</div>
            ) : null}
          </div>
          <div className="form__section">
            <label htmlFor="lasstname">Last Name:</label>
            <input type="text" id="lastname" {...formik.getFieldProps("lastname")} />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div className="formikErrMsg">{formik.errors.lastname}</div>
            ) : null}
          </div>
          <div className="form__section">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" {...formik.getFieldProps("email")} />
            {formik.touched.email && formik.errors.email ? (
              <div className="formikErrMsg">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form__section">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="formikErrMsg">{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form__section">
            <label htmlFor="phone">Phone:</label>
            <input type="text" id="phone" {...formik.getFieldProps("phone")} />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="formikErrMsg">{formik.errors.phone}</div>
            ) : null}
          </div>
          <div className="form__section">
            <button className="submitBtn" type="submit">
              Register
            </button>
          </div>
        </form>
        <div className='UserLink'>
         <p>Already have an account?  <Link to ="/login" >Login</Link> </p>
        </div>
      </div>
    </div>
  );
}
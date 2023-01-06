import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotPassword } from "../../services/userService";
import { ForgotUser } from "../../types";

export const ForgotPassword = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: async (values: ForgotUser, { resetForm }) => {
      try {
        const res = await forgotPassword(values);
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
    <div className='form'>
        <ToastContainer />
      <h1 className="text p-3">Forgot Password</h1>
      <div className='page'>
        <form onSubmit={formik.handleSubmit}>
          <div className='form__section'>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" 
               value={formik.values.email}
               onChange={formik.handleChange}
            required />
             {formik.touched.email && formik.errors.email ? (
              <div className="formikErrMsg">{formik.errors.email}</div>
            ) : null}
          </div>
          
          <div className="form__section">
            <button className="submitBtn" type="submit">
              Send reset password
            </button>
            </ div>
        </form>
      </div>
    </div>
  )
}

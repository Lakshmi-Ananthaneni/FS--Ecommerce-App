import React from 'react'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserSidebar from 'components/UserSidebar';
import { useAppSelector } from 'redux/hooks';
import { updateUserPassword } from 'types';
import { changePassword } from 'services/userService';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const ChangePasswordd = () => {
  const { user } = useAppSelector((state) => state.userR);
  const formik = useFormik({
    initialValues: {
      _id: "",
      email: "",
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      oldpassword: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
      newpassword: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
      confirmpassword: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: async (values: updateUserPassword, { resetForm }) => {
      try {
        const res = await changePassword(values, user._id);
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
    <div className='container-full'>
    <UserSidebar />
    <div className='main-content'>
      <div className='profile'>
        <h3>Change password </h3>
        <div>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                className="form__section"
                type="email"
                  id="email"
                  label="email"
                {...formik.getFieldProps("email")}
                error={
                  formik.touched.email && Boolean(formik.errors.email)
                }
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="oldpassword"
                type="password"
                id="old password"
                {...formik.getFieldProps("oldpassword")}
                error={
                  formik.touched.oldpassword &&
                  Boolean(formik.errors.oldpassword)
                }
                helperText={
                  formik.touched.oldpassword && formik.errors.oldpassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="newpassword"
                id="new password"
                {...formik.getFieldProps("newpassword")}
                error={
                  formik.touched.newpassword &&
                  Boolean(formik.errors.newpassword)
                }
                helperText={
                  formik.touched.newpassword && formik.errors.newpassword
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                id="confirmpassword"
                label="confirm password"
                {...formik.getFieldProps("confirmpassword")}
                error={
                  formik.touched.confirmpassword &&
                  Boolean(formik.errors.confirmpassword)
                }
                helperText={
                  formik.touched.confirmpassword &&
                  formik.errors.confirmpassword
                }
              />
            </Grid>
          </Grid>
          <Box mb={5} mt={5}>
            <Button
              fullWidth
              variant="contained"
              style={{ fontSize: "1.1rem", backgroundColor: "#4c4c4c" , color:"white"}}
              type="submit"
            >
              Change Password
            </Button>
          </Box>
        </form>
        <Link to={`/dashboard/user`}>Back to Dashborad</Link>

        </div>
      </div>
    </div> 
  </div>
  )
}
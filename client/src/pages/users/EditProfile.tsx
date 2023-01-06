import React from 'react'

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import UserSidebar from 'components/UserSidebar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { updateUserProfile } from 'types';
import { updateUser } from 'services/userService';
import { Box, Button, Grid, Paper, TextField } from '@material-ui/core';

export const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const {  firstname, lastname, email, phone, _id } = state;
  const initialState = {
    _id: _id,
    firstname: firstname,
    lastname: lastname,
    email: email,
    phone:phone,
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialState,
    validationSchema: Yup.object({
      firstname: Yup.string()
        .min(2, "Must be at least 2 characters")
        .required("Required"),
      lastname: Yup.string()
        .min(2, "Must be at least 2 characters")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: async (values: updateUserProfile, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("firstname", values.firstname);
        formData.append("lastname", values.lastname);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        const res = await updateUser(formData, state._id);
        if (res.status === 200) {
          toast.success(res.data.message);
          resetForm({});
          navigate("/dashboard/user");
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
        <h3>Edit profile </h3>
        <div className='page'>
         <Grid container component="main">
            <Grid >
            
              <form
                onSubmit={formik.handleSubmit}
                encType="multipart/form-data" >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                     fullWidth
                     label="firstname"
                     type="firstname"
                     id="firstname"
                     {...formik.getFieldProps("firstname")}
                      error={formik.touched.firstname && Boolean(formik.errors.firstname)
                     }
                  
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField
                  fullWidth
                  type="lastname"
                  label="lastname"
                  id="lastname"
                  {...formik.getFieldProps("lastname")}
                  error={
                    formik.touched.lastname && Boolean(formik.errors.lastname)
                  }
                  
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="email"
                  id="email"
                  label="email"
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                  fullWidth
                  type="phone"
                  label="phone"
                  id="phone"
                  {...formik.getFieldProps("phone")}
                  error={
                    formik.touched.phone && Boolean(formik.errors.phone)
                  }
                  // helperText={formik.touched.phone && formik.errors.phone}
                />
              </Grid>
            </Grid>
            <Box mb={5} mt={5}>
           
              <Button
                fullWidth
                variant="contained"
                style={{ fontSize: "1.1rem" , backgroundColor: "#4c4c4c",color:"white" }}
                type="submit"
              >
                Update
              </Button>
           </Box>
            <Grid container justifyContent="space-around">
              <Grid item>
                <Link
                  to={`/dashboard/user`}
                >
                  Back to Dashboard
                </Link>
              </Grid>
            </Grid>
          </form>
       
      </Grid>
    </Grid>

    </div>
      </div>
    </div> 
  </div>
  )
}
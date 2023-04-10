import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { Link, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/user/userSlice";

let userSchema = yup.object().shape({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  mobile: yup.string().required("Mobile Number is Required"),
  email: yup
    .string()
    .email("Email should be valid")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(register(values));
      navigate("/login")
    },
  });

  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate("/admin");
  //   } else {
  //     navigate("");
  //   }
  // }, []);
  return (
    <>
      <Meta title={"Sign Up"} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form
                className="d-flex flex-column gap-15"
                action=""
                onSubmit={formik.handleSubmit}
              >
                <CustomInput
                  type="text"
                  name="firstName"
                  placeholder = "First Name"
                  value={formik.values.firstName}
                  onChange = {formik.handleChange("firstName")}
                  onBlur = {formik.handleBlur("firstName")}
                />
                <div className="error mt-1">
                  {formik.touched.firstName && formik.errors.firstName}
                </div>
                <CustomInput
                  type="text"
                  name="lastName"
                  placeholder = "Last Name"
                  value={formik.values.lastName}
                  onChange = {formik.handleChange("lastName")}
                  onBlur = {formik.handleBlur("lastName")}
                />
                <div className="error mt-1">
                  {formik.touched.lastName && formik.errors.lastName}
                </div>
                <CustomInput
                  type="text"
                  placeholder="Email Address"
                  name="email"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                />
                <div className="error mt-1">
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput
                  type="tel"
                  placeholder="Mobile Number"
                  name="mobile"
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                  value={formik.values.mobile}
                />
                <div className="error mt-1">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
                <CustomInput
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                />
                <div className="error mt-1">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;

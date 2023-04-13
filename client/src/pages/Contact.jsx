import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import { Link,useNavigate } from "react-router-dom";
import Meta from "../components/Meta";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import Container from "../components/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createQuery } from "../features/contact/contactSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

//create schema
let contactSchema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  email: yup.string().email("Email should be valid").required("Email is Required"),
  mobile: yup.string().required("Mobile Number is Required"),
  comment: yup.string().required("Please write some words"),
});
const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name:"",
      email: "",
      mobile: "",
      comment:""
    },
    validationSchema: contactSchema,
    onSubmit: (values) => {
      dispatch(createQuery(values))
      .then(() => {
        toast.success('Query submitted successfully!'); 
        // Show success message
      })
      .catch(() => {
        toast.error('Failed to submit query. Please try again.'); // Show error message
      });
    },
  });
  return (
    <>
      <Meta title={"Contact Us"} />
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
         
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between ">
              <div>
                <h3 className="contact-title mb-4">Contact</h3>
                <form action="" className="d-flex flex-column gap-15" onSubmit={formik.handleSubmit}>
                  <div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                      value={formik.values.name}
                    />
                    <div className="error mt-1">
                  {formik.touched.name && formik.errors.name}
                </div>
                  </div>
                  <div>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      onChange={formik.handleChange("email")}
                      onBlur={formik.handleBlur("email")}
                      value={formik.values.email}
                    />
                    <div className="error mt-1">
                  {formik.touched.email && formik.errors.email}
                </div>
                  </div>
                  <div>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile Number"
                      name="mobile"
                      onChange={formik.handleChange("mobile")}
                      onBlur={formik.handleBlur("mobile")}
                      value={formik.values.mobile}
                    />
                    <div className="error mt-1">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
                  </div>
                  <div>
                    <textarea

                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                      name="comment"
                      onChange={formik.handleChange("comment")}
                      onBlur={formik.handleBlur("comment")}
                      value={formik.values.comment}
                    ></textarea>
                    <div className="error mt-1">
                  {formik.touched.comment && formik.errors.comment}
                </div>
                  </div>
                  <div>
                    <button className="button border-0" type="submit">Submit</button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title mb-4">Get in touch with us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineHome className="fs-5" />
                      <address className="mb-0">
                      Gondwara,Raipur,Chhattishgarh
                      </address>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiPhoneCall className="fs-5" />
                      <a href="tel:+91  9302067441">+91 9302067441</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineMail className="fs-5" />
                      <a href="mailto:gulshan03kathare@gmail.com">
                        gulshan03kathare@gmail.com
                      </a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiInfoCircle className="fs-5" />
                      <p className="mb-0">Monday – Friday 10 AM – 8 PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Contact;

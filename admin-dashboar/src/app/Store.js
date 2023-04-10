import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/auth/authSlice.jsx";
import customerReducer from "../features/customers/customersSlice.js"
import productReducer from "../features/product/productSlice"
import productCategoryReducer from "../features/prodcategory/proSlice.js"
import brandReducer from "../features/brand/brandSlice";
import colorReducer from "../features/color/colorSlice.js";
import uploadReducer from "../features/upload/uploadSlice.js";
import enquiryReducer from "../features/enquiry/EnqSlice.js";
import couponReducer from "../features/coupon/couponSlice";
import blogReducer from "../features/blogs/blogSlice.jsx";
import blogCategoriesReducer from "../features/blogcategory/blogCategorySlice.jsx";




export const store = configureStore({
    reducer: {
      auth: authReducers,
      customer: customerReducer,
      product:productReducer,
      productCategory:productCategoryReducer,
      brands:brandReducer,
      colors:colorReducer,
      images:uploadReducer,
      enquiries:enquiryReducer,
      coupons:couponReducer,
      blogs:blogReducer,
      blogCategories:blogCategoriesReducer
    },
});
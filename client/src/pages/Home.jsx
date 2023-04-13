import React, { useEffect } from "react";
import ProductCategory from "../components/ProductCategory";
import HeroSection from "../components/HeroSection";
import ImageSection from "../components/ImageSection";
import FeatureCollection from "../components/FeatureCollection";
import SpecialPro from "../components/SpecialPro";
import PopulerProduct from "../components/PopulerProduct";
import Brand from "../components/Brand";
import LatestBlog from "../components/LatestBlog";
import FamousCat from "../components/FamousCat";
import Carousel from "../components/Carousel";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "../features/blog/blogSlice";
import { getAllProducts } from "../features/product/ProductSlice";
const Home = () => {
  

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs?.blogs?.blogs);
  const products = useSelector((state) => state.products?.products?.data)
  const products1 = useSelector((state) => state.products?.products?.data?.slice(0,6))
 console.log('products', products)
  
  useEffect(() => {
    getAllBlogs();
    getProducts();
  }, []);

  const getProducts = () => {
     dispatch(getAllProducts());
  }

  const getAllBlogs = () => {
    dispatch(getBlogs());
  };
  return (
    <>
      <HeroSection />
      <FeatureCollection data = {products1} />
      <ProductCategory />
      <ImageSection />
      <FamousCat />
      <SpecialPro products={products} />
      <Carousel />
      <PopulerProduct products={products} />
      <Brand />
      <LatestBlog blogs ={blogs} />
    </>
  );
};

export default Home;

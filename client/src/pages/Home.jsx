import React from "react";
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
const Home = () => {
  return (
    <>
      <HeroSection />
      <FeatureCollection />
      <ProductCategory />
      <ImageSection />
      <FamousCat />
      <SpecialPro />
      <Carousel />
      <PopulerProduct />
      <Brand />
      <LatestBlog />
    </>
  );
};

export default Home;

import React from 'react'
import Container from './Container'
import ProductCard from './ProductCard'

const PopulerProduct = () => {
  return (
    <> 
     <Container class1="popular-wrapper py-5 home-wrapper-2">
    <div className="row">
      <div className="col-12">
        <h3 className="section-heading">Our Popular Products</h3>
      </div>
    </div>
    <div className="row">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  </Container></>
  )
}

export default PopulerProduct
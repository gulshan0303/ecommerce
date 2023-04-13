import React from 'react'
import Container from './Container'
import ProductCard from './ProductCard'
import PopulerPro from './PopulerPro'

const PopulerProduct = ({products}) => {
  return (
    <> 
     <Container class1="popular-wrapper py-5 home-wrapper-2">
    <div className="row">
      <div className="col-12">
        <h3 className="section-heading">Our Popular Products</h3>
      </div>
    </div>
    <div className="row">
      {
         products?.map((item,index) => {
          return item?.tags === "populer" ?  <PopulerPro  key={index} brand = {item?.brand}
          totalRating ={item?.totalRating}
          title={item?.title}
          price={item?.price}
          quantity={item?.quantity}
          sold={item?.sold}
          images = {item?.images}
          /> : ""
       })
      }
    </div>
  </Container></>
  )
}

export default PopulerProduct
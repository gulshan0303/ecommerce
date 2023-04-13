import React from 'react'
import Container from './Container'
import ProductCard from './ProductCard'

const FeatureCollection = (props) => {
  const {data} = props;
  return (
    <>
         <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          <ProductCard data = {data}/>
          
        </div>
      </Container>
    </>
  )
}

export default FeatureCollection
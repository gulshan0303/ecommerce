import React from 'react'
import Container from './Container'
import SpecialProduct from './SpecialProduct'

const SpecialPro = () => {
  return (
    <>
        <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
          <SpecialProduct />
        </div>
      </Container>
    </>
  )
}

export default SpecialPro
import React from 'react'
import Container from './Container'
import SpecialProduct from './SpecialProduct'

const SpecialPro = ({products}) => {
  return (
    <>
        <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
           {
            products?.map((item,index) => {
               return item?.tags === "special" ?  <SpecialProduct  key={index} brand = {item?.brand}
               totalRating ={item?.totalRating}
               title={item?.title}
               price={item?.price}
               quantity={item?.quantity}
               sold={item?.sold}

               /> : ""
                 
               
            })
           }
        </div>
      </Container>
    </>
  )
}

export default SpecialPro
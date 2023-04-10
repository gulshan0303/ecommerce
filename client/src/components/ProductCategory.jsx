import React from 'react'
import pro1 from "../images/pro1.png"
import pro2 from "../images/pro2.png"
import pro3 from "../images/pro3.jpg"
import pro4 from "../images/pro4.png"
import pro5 from "../images/pro5.jpg"
import pro6 from "../images/pro6.jpg"
import pro7 from "../images/pro7.jpg"
import pro8 from "../images/pro8.png"
import Container from './Container'
import Marquee from 'react-fast-marquee'
const ProductCategory = () => {
  return (
    <>
      <Container class1="marque-wrapper home-wrapper-2 py-5">
      <div className="col-12">
            <h3 className="section-heading"> Product Category</h3>
          </div>
        <div className="row">
          <div className="col-12">
          
            <div className="marquee-inner-wrapper card-wrapper">
            
              <Marquee className="d-flex" speed = {75}>
                <div className="mx-4 img">
                  <img src= {pro1} alt="brand" />
                </div>
                <div className="mx-4 img">
                  <img src={pro2} alt="brand" />
                </div>
                <div className="mx-4 img">
                  <img src={pro3} alt="brand" />
                </div>
                <div className="mx-4 img">
                  <img src={pro4} alt="brand" />
                </div>
                <div className="mx-4 img">
                  <img src={pro5} alt="brand" />
                </div>
                <div className="mx-4 img">
                  <img src={pro6} alt="brand" />
                </div>
                <div className="mx-4 img">
                  <img src={pro7} alt="brand" />
                </div>
                <div className="mx-4 img">
                  <img src={pro8} alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default ProductCategory
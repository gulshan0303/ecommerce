import React from 'react'
import Container from './Container'
import Marquee from 'react-fast-marquee'

import Brand_1 from "../images/brand-01.png"
import Brand_2 from "../images/brand-02.png"
import Brand_3 from "../images/brand-03.png"
import Brand_4 from "../images/brand-04.png"
import Brand_5 from "../images/brand-05.png"
import Brand_6 from "../images/brand-06.png"
import Brand_7 from "../images/brand-07.png"
import Brand_8 from "../images/brand-08.png"
const Brand = () => {
  return (
    <>
     <Container class1="marque-wrapper home-wrapper-2 py-5">
     <div className="col-12">
            <h3 className="section-heading"> Our trusted Brand's</h3>
          </div>
        <div className="row">
          <div className="col-12">
      
            <div className="marquee-inner-wrapper card-wrapper">
              
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src= {Brand_1} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={Brand_2} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={Brand_3} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={Brand_4} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={Brand_5} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={Brand_6} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={Brand_7} alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src={Brand_8} alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Brand
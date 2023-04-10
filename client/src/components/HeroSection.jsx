import React from 'react'
import MainBanner from "../images/d1.jpg"
import CatBanner from "../images/d3.jpg"
import CatBanner_2 from "../images/d2.jpg"
import CatBanner_3 from "../images/d5.jpg"
import CatBanner_4 from "../images/d6.jpg"
import Container from './Container'
import { Link } from 'react-router-dom'
const HeroSection = () => {
  return (
    <>
     <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img
                src={MainBanner}
                className="img-fluid rounded-3"
                alt="main banner"
              />
              {/* <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo.</p>
                <Link className="button">BUY NOW</Link>
              </div> */}
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  src={CatBanner}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                {/* <div className="small-banner-content position-absolute">
                  <h4>Best Sake</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div> */}
              </div>
              <div className="small-banner position-relative">
                <img
                  src={CatBanner_2}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                {/* <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div> */}
              </div>
              <div className="small-banner position-relative ">
                <img
                  src={CatBanner_3}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                {/* <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div> */}
              </div>
              <div className="small-banner position-relative ">
                <img
                  src={CatBanner_4}
                  className="img-fluid rounded-3"
                  alt="main banner"
                />
                {/* <div className="small-banner-content position-absolute">
                  <h4>NEW ARRIVAL</h4>
                  <h5>But IPad Air</h5>
                  <p>
                    From $999.00 <br /> or $41.62/mo.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default HeroSection
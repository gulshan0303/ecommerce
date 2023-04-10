import Carousel from 'react-bootstrap/Carousel';
import React from 'react'
import MainBanner from "../images/d1.jpg"
import CatBanner from "../images/d3.jpg"
import CatBanner_2 from "../images/d2.jpg"
import CatBanner_3 from "../images/d5.jpg"
import CatBanner_4 from "../images/d6.jpg"
import Container from './Container';
import Marquee from 'react-fast-marquee';

function IndividualIntervalsExample() {
  return (
    // <Carousel>
    //   <Carousel.Item interval={2000} className='carousel'>
    //     <img
    //       className="d-block w-100"
    //       src={MainBanner}
    //       alt="First slide"
    //     />
    //     <Carousel.Caption>
    //       <h3>First slide label</h3>
    //       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    //   <Carousel.Item interval={500} className='carousel'>
    //     <img
    //       className="d-block w-100"
    //       src={CatBanner}
    //       alt="Second slide"
    //     />
    //     <Carousel.Caption>
    //       <h3>Second slide label</h3>
    //       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //     </Carousel.Caption>
    //   </Carousel.Item >
    //   <Carousel.Item className='carousel'>
    //     <img
    //       className="d-block w-100"
    //       src={CatBanner_2}
    //       alt="Third slide"
    //     />
    //     <Carousel.Caption>
    //       <h3>Third slide label</h3>
    //       <p>
    //         Praesent commodo cursus magna, vel scelerisque nisl consectetur.
    //       </p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    //   <Carousel.Item className='carousel'>
    //     <img
    //       className="d-block w-100"
    //       src={CatBanner_3}
    //       alt="Third slide"
    //     />
    //     <Carousel.Caption>
    //       <h3>Third slide label</h3>
    //       <p>
    //         Praesent commodo cursus magna, vel scelerisque nisl consectetur.
    //       </p>
    //     </Carousel.Caption>
    //   </Carousel.Item> 
    //   <Carousel.Item className='carousel'>
    //     <img
    //       className="d-block w-100"
    //       src={CatBanner_4}
    //       alt="Third slide"
    //     />
    //     <Carousel.Caption>
    //       <h3>Third slide label</h3>
    //       <p>
    //         Praesent commodo cursus magna, vel scelerisque nisl consectetur.
    //       </p>
    //     </Carousel.Caption>
    //   </Carousel.Item>
    // </Carousel>
    <>
      <Container class1="marque-wrapper home-wrapper-2 py-5">
      
        <div className="row">
          <div className="col-12">
          
            <div className="marquee-inner-wrapper card-wrapper">
            
              <Marquee className="d-flex" speed={75}>
                <div className="mx-4 img1">
                  <img src= {MainBanner} alt="brand" />
                </div>
                <div className="mx-4 img1">
                  <img src={CatBanner} alt="brand" />
                </div>
                <div className="mx-4 img1">
                  <img src={CatBanner_2} alt="brand" />
                </div>
                <div className="mx-4 img1">
                  <img src={CatBanner_3} alt="brand" />
                </div>
                <div className="mx-4 img1">
                  <img src={CatBanner_4} alt="brand" />
                </div>
                <div className="mx-4 img1">
                  <img src={CatBanner_2} alt="brand" />
                </div>
                <div className="mx-4 img1">
                  <img src={CatBanner} alt="brand" />
                </div>
                <div className="mx-4 img1">
                  <img src={CatBanner_2} alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default IndividualIntervalsExample;
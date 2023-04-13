import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import Watch from "../images/watch.jpg";
import "./style.css"
const PopulerPro = (props) => {
  const { title, quantity, price, totalRating, brand, sold,images } = props;
  const withoutDiscount = price * 1.2;

  // Calculate progress bar width percentage
  const progressWidth = sold > 0 ? (sold / quantity) * 100 : 0; // Sold products divided by total products

  return (
    <>
      <div className="col-6 mb-3">
        <div className="special-product-card">
          <div className="d-flex justify-content-between">
            <div className="poplerProduct_img">
              <img src={images[0]?.url ?images[0]?.url : Watch } className="img-fluid" alt="watch" />
            </div>
            <div className="special-product-content">
              <h5 className="brand">{brand}</h5>
              <h6 className="title">{title}</h6>
              <ReactStars
                count={5}
                size={24}
                value={parseInt(totalRating)}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
                <span className="red-p">₹{price}</span> &nbsp;{" "}
                <strike>{withoutDiscount}</strike>
              </p>
              <div className="discount-till d-flex align-items-center gap-10">
                <p className="mb-0">
                  <b>5 </b>days
                </p>
                <div className="d-flex gap-10 align-items-center">
                  <span className="badge rounded-circle p-3 bg-danger">1</span>:
                  <span className="badge rounded-circle p-3 bg-danger">1</span>:
                  <span className="badge rounded-circle p-3 bg-danger">1</span>
                </div>
              </div>
              <div className="prod-count my-3">
                <p>Products: {quantity}</p>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: quantity / quantity + sold * 100 + "%" }}
                    aria-valuenow={quantity / quantity + sold * 100}
                    aria-valuemin={quantity}
                    aria-valuemax={quantity + sold}
                  ></div>
                </div>
              </div>
              <Link className="button">Add to Cart</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopulerPro;

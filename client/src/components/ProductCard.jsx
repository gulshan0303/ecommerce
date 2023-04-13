import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.avif";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch } from 'react-redux'
import { AddwishList } from "../features/product/ProductSlice"

const ProductCard = (props) => {
  const { grid, data } = props;
  const dispatch = useDispatch();
  let location = useLocation();

  const AddToWishLish = (id) => {
    dispatch(AddwishList(id))
  }

  const handleButtonClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    AddToWishLish(id);
  }

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            className={` ${
              location.pathname === "/product" ? `gr-${grid}` : "col-3"
              } `}
            key={index}
          >
            <Link
              to={`${
                location.pathname === "/"
                  ? `/product/${item?._id}`
                  : location.pathname === `/product/${item?._id}`
                    ? `/product/${item?._id}`
                    : `${item?._id}`
                }`}
              className="product-card position-relative"
            >
              <div className="wishlist-icon position-absolute">
                <button className="border-0 bg-transparent" onClick={(e) => handleButtonClick(e, item?._id)}>
                  <img src={wish} alt="wishlist" />
                </button>
              </div>
              <div className="product-image">
                <img src={item?.images[0]?.url} className="img-fluid" alt="product image" />
                <img src={watch2} className="img-fluid" alt="product image" />
              </div>
              <div className="product-details">
                <h6 className="brand">{item?.brand}</h6>
                <h5 className="product-title">
                  {item?.title}
                </h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={parseInt(item?.totalRating)}
                  edit={false}
                  activeColor="#ffd900f4"
                />
                <p>{item?.description}</p>
                <p className="price">₹ {item?.price}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <button className="border-0 bg-transparent">
                    <img src={prodcompare} alt="compare" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={view} alt="view" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img src={addcart} alt="addcart" />
                  </button>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;

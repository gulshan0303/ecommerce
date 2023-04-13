import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import cross from "../images/cross.svg"
import watch from "../images/watch.jpg"
import {useDispatch,useSelector} from 'react-redux'
import { getwishList } from "../features/user/userSlice";
import { AddwishList } from "../features/product/ProductSlice";
const Wishlist = () => {
  const dispatch = useDispatch();

   useEffect(() => {
    getProductWishList()
   },[])
  const getProductWishList = () => {
      dispatch(getwishList());
  }

  const wishlist = useSelector((state) => state.user?.wishlist?.wishList)
  const removeWishList = (id) => {
      dispatch(AddwishList(id));
      setTimeout(() => {
        dispatch(getwishList());
      },300)
  }
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
      <div className="row">
        { wishlist.length ?
          wishlist?.map((item,index) => {
            return(
                  
         
              <div className="col-3 "key={index} >
              <div className="wishlist-card position-relative" >
                <img
                 onClick={() => removeWishList(item?._id)}
                  src={cross}
                  alt="cross"
                  className="position-absolute cross img-fluid"
                />
                <div className="wishlist-card-image">
                  <img
                    src={watch}
                    className="img-fluid w-100"
                    alt="watch"
                  />
                </div>
                <div className="py-3 px-3">
                  <h5 className="title">
                   {item?.title}
                  </h5>
                  <h6 className="price">₹ {item?.price}</h6>
                </div>
              </div>
            </div>
       
            )
          }) : <center><h2>No Wishlist data</h2></center>
        }
         </div> 
      </Container>
    </>
  );
};

export default Wishlist;

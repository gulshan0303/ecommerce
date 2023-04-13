import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Meta from "../components/Meta";
import blogImage from "../images/blog-1.jpg"; // Renamed variable to avoid conflict
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getABlog } from "../features/blog/blogSlice";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const Blogid = location.pathname.split("/")[2]; // Fixed syntax error

  useEffect(() => {
    getASingleBlog(); // Renamed function for consistency
  }, []);

  const getASingleBlog = () => {
    dispatch(getABlog(Blogid));
  };

  const blog = useSelector((state) => state.blogs?.singleBlog?.getBlog);
  console.log("blog", blog);
  return (
    <>
      <Meta title={blog?.title} />
      <BreadCrumb title={blog?.title} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
              </Link>
              <h3 className="title">{blog?.title}</h3>
            
               <img src={blog?.images[0].url ?blog?.images[0].url :  blogImage} className="img-fluid blog_img my-4" alt="blog" />
             
              <p>
                {blog?.description}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;

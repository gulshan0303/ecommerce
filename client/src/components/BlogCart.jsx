import React from "react";
import { Link } from "react-router-dom";
import Blog_1 from "../images/blog-1.jpg"
const BlogCard = (props) => {
  const {id,title,description,date,images} = props;
 
  return (
    <div className="blog-card">
      <div className="card-image" key = {id}>
        <img src={images? images : Blog_1} className="img-fluid w-100" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">{date}</p>
        <h5 className="title">{title}</h5>
        <p className="desc">
          {description}
        </p>
        <Link to={`/blog/${id}` }className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;

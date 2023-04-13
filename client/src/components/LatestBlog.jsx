import React from 'react'
import BlogCard from './BlogCart'
import Container from './Container'

const LatestBlog = ({blogs}) => {
  console.log("blogs", blogs)
  return (
    <>
      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          {blogs && blogs.map(blog => (
            <div key={blog.id} className="col-3">
              <BlogCard title={blog?.title} description={blog?.description} images={blog?.images[0]?.url} />
            </div>
          ))}
        </div>
      </Container>
    </>
  )
}

export default LatestBlog;

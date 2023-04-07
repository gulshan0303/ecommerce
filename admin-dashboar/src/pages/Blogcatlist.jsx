import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteABlogCat,
  getCategories,
  resetState,
} from "../features/blogcategory/blogCategorySlice";
import CustomModal from "../components/CustomModel";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

const Blogcatlist = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId, setblogCatId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, [dispatch]);

  const { category: bCatState } = useSelector((state) => state?.blogCategories?.bCategories ?? {});

  const data1 = bCatState?.map((bCat, index) => ({
    key: index + 1,
    name: bCat?.title,
    action: (
      <React.Fragment>
        <Link
          to={`/admin/blog-category/${bCat?._id}`}
          className=" fs-3 text-danger"
        >
          <BiEdit />
        </Link>
        <button
          className="ms-3 fs-3 text-danger bg-transparent border-0"
          onClick={() => {
            setOpen(true);
            setblogCatId(bCat?._id);
          }}
        >
          <AiFillDelete />
        </button>
      </React.Fragment>
    ),
  }));

  const deleteBlogCategory = async (e) => {
    await dispatch(deleteABlogCat(e));
    setOpen(false);
    await dispatch(getCategories());
  };

  return (
    <div>
      <h3 className="mb-4 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={() => setOpen(false)}
        open={open}
        performAction={() => {
          deleteBlogCategory(blogCatId);
        }}
        title="Are you sure you want to delete this blog category?"
      />
    </div>
  );
};

export default Blogcatlist;

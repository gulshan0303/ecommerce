import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { getUsers } from "../features/customers/customersSlice";
import axios from "axios";

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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    const findApi = async() => {
      const res = await axios.get(`http://localhost:8484/api/v1/blogcategory/all`);
      console.log('res.data--', res.data)
       return res.data;
    }
    findApi();
  }, []);
  const customerstate = useSelector(
    (state) => state.customer?.customers?.getAllUser
  );
  const data1 = [];
  if (customerstate && customerstate.length) {
    for (let i = 0; i < customerstate.length; i++) {
      if (customerstate[i].role !== "admin") {
        data1.push({
          key: i + 1,
          name: customerstate[i].firstName + " " + customerstate[i].lastName,
          email: customerstate[i].email,
          mobile: customerstate[i].mobile,
        });
      }
    }
  }

  return (
    <>
      <div className="mb-4 title">
        Customers
        <Table columns={columns} dataSource={data1} />
      </div>
    </>
  );
};

export default Customers;

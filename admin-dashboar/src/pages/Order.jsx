import React, { useEffect } from "react";
import { Table, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { getOrders } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.auth?.orders);
  const isLoading = useSelector((state) => state.auth?.isLoading);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const data = orderState?.map((order, index) => {
    const { firstName } = order?.orderBy || {};
    return {
      key: index + 1,
      name: firstName,
      product: (
        <Link to={`/admin/order/${order?.orderBy?._id}`}>View Orders</Link>
      ),
      amount: order.paymentIntent.amount,
      date: new Date(order.createdAt).toLocaleString(),
      action: (
        <>
          <Link to="/" className="fs-3 text-danger">
            <BiEdit />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/">
            <AiFillDelete />
          </Link>
        </>
      ),
    };
  });

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      {isLoading ? (
        <div className="d-flex justify-content-center my-5">
          <Spin />
        </div>
      ) : (
        <Table columns={columns} dataSource={data} />
      )}
    </div>
  );
};

export default Orders;

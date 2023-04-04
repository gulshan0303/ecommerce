import React, { useEffect } from "react";
import { Table } from "antd";

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
  const data1 = [];
  return (
    <>
     <div className="mb-4 title">
      Customers
      <Table columns={columns} dataSource={data1}/>
     </div>
    </>
  )
}

export default Customers
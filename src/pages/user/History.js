import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const showOrderInTable = (order) => (
    <table className="table table-bordered" style={{ backgroundColor: "white" }}>
      <thead className="thead-dark">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>{p.product.title}</td>
            <td>${p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="invoice.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Download Invoice
    </PDFDownloadLink>
  );

  
  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="p-3 mb-5 shadow-sm bg-white rounded">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row mt-3">
          <div className="col text-center">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid" style={{ background: "#F4F7FA" }}>
      <div className="row">
        <div className="col-sm-1 col-md-4 col-lg-2" id="sideNav">
          <UserNav />
        </div>
        <div className="col-sm-11 col-md-8 col-lg-10 mt-5 pb-3 text-center">
          <h4 className="mt-5 mb-5" style={{ fontWeight: "bold", color: "#333" }}>
            {orders.length > 0 ? "User Purchase Orders" : "No Purchase Orders"}
          </h4>
          <div className="section-p1" style={{ background: "#FFFFFF", borderRadius: "10px" }}>
            {showEachOrders()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;

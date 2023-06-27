/* import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };
  return (
    <div className="container-fluid">
      <div className="row" style={{backgroundColor:"white"}}>
        <div id="sideNav" className='col-sm-1 col-md-4 col-lg-2'>
          <AdminNav />
        </div>

          <div className="col-sm-11 col-md-8 col-lg-10  mt-5 pt-5 text-center">
            <h4 style={{color:"black",fontWeight:"600"}}>
              ADMIN DASHBOARD
            </h4>
            
           
            <div id="cart" class="section-p1">
            <Orders orders={orders} handleStatusChange={handleStatusChange} />
            
            </div>
          
          </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard; */

import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  const renderOrderStatus = (order) => {
    return (
      <div className="order-status" style={{ backgroundColor: "#f2f2f2", border: "1px solid #ddd", borderRadius: "4px", padding: "20px", marginBottom: "20px" }}>
      <h4 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "10px" }}>Update Order Status: {order.status}</h4>
      <div className="status-buttons" style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => handleStatusChange(order._id, "Processing")} style={{ backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", padding: "10px 20px", margin: "0 10px", cursor: "pointer", fontSize: "16px", transition: "background-color 0.3s ease" }}>
          Processing
        </button>
        <button onClick={() => handleStatusChange(order._id, "Shipped")} style={{ backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", padding: "10px 20px", margin: "0 10px", cursor: "pointer", fontSize: "16px", transition: "background-color 0.3s ease" }}>
          Shipped
        </button>
        <button onClick={() => handleStatusChange(order._id, "Delivered")} style={{ backgroundColor: "#4caf50", color: "white", border: "none", borderRadius: "4px", padding: "10px 20px", margin: "0 10px", cursor: "pointer", fontSize: "16px", transition: "background-color 0.3s ease" }}>
          Delivered
        </button>
      </div>
    </div>
    
    );
  };

  return (
    <div className="container-fluid">
      <div className="row" style={{ backgroundColor: "white" }}>
        <div id="sideNav" className="col-sm-1 col-md-4 col-lg-2">
          <AdminNav />
        </div>
        <div className="col-sm-11 col-md-8 col-lg-10 mt-5 pt-5 text-center">
          <div style={{ marginBottom: "30px" }}>
            <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "#333" }}>
              Welcome to the Admin Dashboard
            </h1>
            <p style={{ fontSize: "18px", color: "#666" }}>Manage and track orders with ease</p>
          </div>
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              {renderOrderStatus(order)}
              <Orders orders={[order]} handleStatusChange={handleStatusChange} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

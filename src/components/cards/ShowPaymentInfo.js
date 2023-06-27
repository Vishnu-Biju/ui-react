import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div style={{ paddingTop: "20px", textAlign: "center" }}>
    <p style={{ fontSize: "18px", fontWeight: "bold", color: "#030c3e", marginBottom: "10px" }}>
      Order Details
    </p>
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
      <span style={{ fontWeight: "600", color: "#088178", marginRight: "10px" }}>
        Order ID:
      </span>
      <span style={{ fontWeight: "600", color: "#030c3e" }}>{order.paymentIntent.id}</span>
    </div>
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
      <span style={{ fontWeight: "600", color: "#088178", marginRight: "10px" }}>
        Currency:
      </span>
      <span style={{ fontWeight: "600", color: "#030c3e" }}>
        {order.paymentIntent.currency.toUpperCase()}
      </span>
    </div>
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
      <span style={{ fontWeight: "600", color: "#088178", marginRight: "10px" }}>
        Method:
      </span>
      <span style={{ fontWeight: "600", color: "#030c3e" }}>
        {order.paymentIntent.payment_method_types[0]}
      </span>
    </div>
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
      <span style={{ fontWeight: "600", color: "#088178", marginRight: "10px" }}>
        Payment:
      </span>
      <span style={{ fontWeight: "600", color: "#030c3e" }}>
        {order.paymentIntent.status.toUpperCase()}
      </span>
    </div>
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
      <span style={{ fontWeight: "600", color: "#088178", marginRight: "10px" }}>
        Orderd on:
      </span>
      <span style={{ fontWeight: "600", color: "#030c3e" }}>
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
    </div>
    <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
      <span style={{ fontWeight: "600", color: "#088178", marginRight: "10px" }}>
        Amount:
      </span>
      <span style={{ fontWeight: "600", color: "#030c3e" }}>
        {(order.paymentIntent.amount / 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
    </div>
    {showStatus && (
      <div style={{ marginTop: "10px" ,marginBottom: "10px"}}>
        <span
          className="badge text-white"
          style={{ backgroundColor: "#088178", fontSize: "14px", padding: "6px 12px" }}
        >
          STATUS: {order.orderStatus}
        </span>
      </div>
    )}
  </div>
);

export default ShowPaymentInfo;
;


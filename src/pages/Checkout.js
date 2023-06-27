import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  createCashOrderForUser,
} from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");

  const navigate = useNavigate();
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.token) {
      getUserCart(user.token).then((res) => {
        console.log("user cart res", JSON.stringify(res.data, null, 4));
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      });
    }
  }, [user?.token]);

  const emptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Cart is empty. Continue shopping.");
    });
  };

  const saveAddressToDb = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p style={{ color: "black", fontWeight: "bold" }}>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="product-form"
        style={{
          backgroundColor: "white",
          borderColor: "black",
          color: "black",
          fontWeight: "bold",
        }}
      />
      <button
        style={{ float: "right" }}
        onClick={applyDiscountCoupon}
        className="btn btn-success mt-2"
      >
        Apply
      </button>
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      if (res.data.ok) {
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        dispatch({
          type: "COD",
          payload: false,
        });
        emptyUserCart(user.token);
        setTimeout(() => {
          navigate("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <div className="checkout-container">
      <section id="shopcheckout">
        <h1
          className="jumbcheckout"
          style={{ color: "green", fontSize: "54px", marginBottom: "20px" }}
        >
          Checkout
        </h1>
        <h2>super value deals</h2>
        <p>Save more with coupons & upto 70% off</p>
      </section>
      <div className="checkout-section">
        <h4 className="checkout-heading">Delivery Address</h4>
        {showAddress()}
        <hr />
        <h4 className="checkout-heading">Got Coupon?</h4>
        {showApplyCoupon()}
        {discountError && <p className="checkout-error">{discountError}...</p>}
      </div>

      <div className="checkout-section">
        <h4 className="checkout-heading">Order Summary</h4>
        <p className="product-count">Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p className="cart-total">Cart Total: {total}</p>

        {totalAfterDiscount > 0 && (
          <p className="discount-applied">
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </p>
        )}

        <div className="checkout-buttons">
          {COD ? (
            <button
              disabled={!addressSaved || !products.length}
              className="place-order-button"
              onClick={createCashOrder}
            >
              Place Order
            </button>
          ) : (
            <button
              disabled={!addressSaved || !products.length}
              className="place-order-button"
              onClick={() => navigate("/payment")}
            >
              Place Order
            </button>
          )}

          <button
            style={{ float: "right" }}
            disabled={!products.length}
            onClick={emptyCart}
            className="empty-cart-button"
          >
            Empty Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

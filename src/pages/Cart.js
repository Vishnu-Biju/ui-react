import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const RedirectToCart = () => {
    navigate("/login", {
      state: {
        previousUrl: "/cart",
      },
    });
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const showCartItems = () => (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <td scope="col">Image</td>
          <td scope="col">Title</td>
          <td scope="col">Price</td>
          <td scope="col">Brand</td>
          <td scope="col">Color</td>
          <td scope="col">Count</td>
          <td scope="col">Shipping</td>
          <td scope="col">Remove</td>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid " style={{ width: "85%" }}>
      <div
        className="Row5 pt-5 p-3 col-md-12"
        style={{ color: "black", backgroundColor: "white" }}
      >
        <div className="col-lg-12 pt-5" style={{ fontWeight: "400" }}>
          <h4
            style={{
              textAlign: "center",
              fontWeight: "800",
              color: "#030c3e",
              fontSize: "44px",
              textTransform: "uppercase",
              marginBottom: "30px",
              marginTop: "30px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            CART - {cart.length} Products
          </h4>

          {!cart.length ? (
            <p style={{ fontSize: "16px" }}>
              No products in cart. <Link to="/shop">Continue Shopping.</Link>
            </p>
          ) : (
            <div id="cart" className="section-p1">
              {showCartItems()}
            </div>
          )}
        </div>

        <div
          className="col-lg-12 col-md-12 pt-5 p-3 mt-5"
          style={{
            backgroundColor: "#f8f8f8",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h4
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#303f9f",
              marginBottom: "20px",
            }}
          >
            Order Summary
          </h4>
          <hr style={{ borderTop: "1px solid #ddd" }} />
          <p style={{ fontSize: "16px", fontWeight: "500" }}>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p style={{ fontSize: "14px", marginBottom: "5px" }}>
                {c.title} x {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr style={{ borderTop: "1px solid #ddd" }} />
          <p style={{ fontSize: "16px", fontWeight: "500" }}>
            Total: <b>${getTotal()}</b>
          </p>
          <hr style={{ borderTop: "1px solid #ddd" }} />
          {user ? (
            <>
              <button
                onClick={saveOrderToDb}
                className="btn btn-sm btn-success mt-2 mb-3"
                disabled={!cart.length}
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                Proceed to Checkout
              </button>
              <br />

              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-primary mt-2"
                disabled={!cart.length}
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  borderRadius: "4px",
                  padding: "8px 16px",
                  backgroundColor: "#2196f3",
                  color: "#fff",
                  boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                Pay Cash on Delivery
              </button>
            </>
          ) : (
            <button
              onClick={RedirectToCart}
              className="btn btn-sm btn-primary mt-2"
              style={{
                fontSize: "14px",
                fontWeight: "600",
                borderRadius: "4px",
                padding: "8px 16px",
                backgroundColor: "#2196f3",
                color: "#fff",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              Login to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

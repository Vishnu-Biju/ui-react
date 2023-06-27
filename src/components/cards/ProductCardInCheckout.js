import React from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  let dispatch = useDispatch();

  const handleColorChange = (e) => {
    console.log("color changed", e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

      //  console.log('cart udpate color', cart)
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
<tbody>
  <tr style={{ borderBottom: "1px solid #ddd" }}>
    <td style={{ padding: "10px" }}>
      <div style={{ width: "100px", height: "auto" }}>
      {p.images.length ? (
  <ModalImage
    small={p.images[0].url}
    large={p.images[0].url}
    style={{ width: "100px", height: "auto" }}
  />
) : (
  <ModalImage
    small={laptop}
    large={laptop}
    style={{ width: "100px", height: "auto" }}
  />
)}

      </div>
    </td>
    <td style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>{p.title}</td>
    <td style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>${p.price}</td>
    <td style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>{p.brand}</td>
    <td style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>
      {
        <select
          onChange={handleColorChange}
          name="color"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "14px",
            padding: "5px",
          }}
        >
          {p.color ? (
            <option value={p.color}>{p.color}</option>
          ) : (
            <option>Select</option>
          )}
          {colors
            .filter((c) => c !== p.color)
            .map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
        </select>
      }
    </td>
    <td className="text-center" style={{ padding: "10px", fontFamily: "Arial, sans-serif" }}>
      <input
        type="number"
        value={p.count}
        onChange={handleQuantityChange}
        style={{ fontFamily: "Arial, sans-serif", width: "50px", textAlign: "center" }}
      />
    </td>
    <td className="text-center" style={{ padding: "10px" }}>
      {p.shipping === "Yes" ? (
        <CheckCircleOutlined className="text-success" />
      ) : (
        <CloseCircleOutlined className="text-danger" />
      )}
    </td>
    <td className="text-center" style={{ padding: "10px" }}>
      <CloseOutlined
        onClick={handleRemove}
        className="text-danger pointer"
      />
    </td>
  </tr>
</tbody>


  );
};

export default ProductCardInCheckout;

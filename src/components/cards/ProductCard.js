import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/ratings";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined" && product.quantity > 0) {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      //npm i lodash
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      console.log("unique", unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };
  // destructure
  const { images, title, description, slug, price } = product;
  return (
     /*    <div id="box">
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div id="rating" className="text-center pt-2">
          NO RATINGS YET
        </div>
      )}

      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "250px", objectFit: "cover" }}
            className="p-2"
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-warning" /> <br /> View Product
          </Link>,
          <Tooltip title={tooltip}>
          <a onClick={handleAddToCart} disabled={product.quantity < 1}>
            <ShoppingCartOutlined className="text-danger" /> <br />
            {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
          </a>
        </Tooltip>,
        ]}
      >
        <Meta
           title={
            <span style={{ color: "#088178" }}>
              {`${title && title.substring(0, 20)} - $${price}`}
            </span>
          }
          description={`${description && description.substring(0, 50)}...`}
        />
      </Card>
    </div>  */
   
    
<div style={{ padding: "25px" }}>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div style={{ textAlign: "center", paddingTop: "10px", color: "#888" }}>
          NO RATINGS YET
        </div>
      )}

      <Card
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{
              height: "250px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            className="p-2"
          />
        }
        actions={[
          <Link
            to={`/product/${slug}`}
            style={{ color: "#088178", textDecoration: "none" }}
          >
            <div style={{ textAlign: "center" }}>
              <EyeOutlined style={{ fontSize: "14px" }} />
              <div style={{ marginTop: "8px", color: "#888" }}>View Product</div>
            </div>
          </Link>,
          <Tooltip title={tooltip}>
            <a
              onClick={handleAddToCart}
              disabled={product.quantity < 1}
              style={{ color: "#088178", textDecoration: "none" }}
            >
              <div style={{ textAlign: "center" }}>
                <ShoppingCartOutlined style={{ fontSize: "14px" }} />
                <div style={{ marginTop: "8px", color: "#888" }}>
                  {product.quantity < 1 ? "Out of stock" : "Add to Cart"}
                </div>
              </div>
            </a>
          </Tooltip>,
        ]}
        hoverable
        style={{
          backgroundColor: "#f7f7f7",
          border: "1px solid #ddd",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "box-shadow 0.3s",
          minHeight: "360px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Meta
          title={
            <span style={{ color: "#088178" }}>
              {`${title && title.substring(0, 20)} - $${price}`}
            </span>
          }
          description={`${description && description.substring(0, 50)}...`}
          style={{ marginBottom: "16px", color: "#888" }}
        />
      </Card>
    </div>
  );
};

export default ProductCard;

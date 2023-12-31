import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItem";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/ratings";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToWishlist } from "../../functions/user";
import { useNavigate } from "react-router-dom";

const { TabPane } = Tabs;

// This is the children component of Product.js page
const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, description, images, slug, _id } = product;
  const [tooltip, setTooltip] = useState("Click to add");
  // Redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleAddToCart = () => {
    // Create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // If cart is in local storage, get it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // Push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // Remove duplicates
      // npm i lodash
      let unique = _.uniqWith(cart, _.isEqual);
      // Save to local storage
      console.log("unique", unique);
      localStorage.setItem("cart", JSON.stringify(unique));
      // Show tooltip
      setTooltip("Added");

      // Add to redux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // Add to redux state
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist");
      navigate("/user/wishlist");
    });
  };

  return (
    <div className="Row2">
      <h2 id="productinfo" style={{ fontSize: "44px", fontWeight: "bold", color: "#333" }}>
        {title}
      </h2>

      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div id="rating" className="text-center pt-4" style={{ fontSize: "16px", color: "#666" }}>
          NO RATINGS YET
        </div>
      )}

      <div className="Row3" id="singleProduct">
        <div className=" col-lg-5  col-md-6 p-5">
          {images && images.length ? (
            <Carousel showArrows={true} autoPlay infiniteLoop>
              {images &&
                images.map((i) => <img src={i.url} key={i.public_id} alt={title} />)}
            </Carousel>
          ) : (
            <Card
              cover={
                <img
                  src={Laptop}
                  style={{ height: "450px", objectFit: "cover" }}
                  className="mb-3"
                  alt={title}
                />
              }
            ></Card>
          )}
          <Tabs type="card">
            <TabPane tab="Description" key="1" style={{ fontSize: "18px", color: "#333" }}>
              {`${description && description.substring(0, 90)}...`}
            </TabPane>
            <TabPane tab="More" key="2" style={{ fontSize: "18px", color: "#333" }}>
              {description && description}
            </TabPane>
          </Tabs>
        </div>

        <div className=" col-lg-5 col-md-5 p-5">
          <Card
            actions={[
              <Tooltip title={tooltip}>
                <a onClick={handleAddToCart} style={{ color: "green", fontWeight: "bold" }}>
                  <ShoppingCartOutlined className="text-success" disabled={product.quantity < 1} /> <br /> Add to
                  Cart
                </a>
              </Tooltip>,
              <a onClick={handleAddToWishlist} style={{ color: "#1890ff", fontWeight: "bold" }}>
                <HeartOutlined className="text-info" /> <br /> Add to Wishlist
              </a>,

              <RatingModal>
                <StarRatings
                  name={_id}
                  starRatedColor="#ff9800"
                  changeRating={onStarClick}
                  rating={star}
                  numberOfStars={5}
                  isSelectable={true}
                />
              </RatingModal>,
            ]}
          >
            <ProductListItems product={product} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;


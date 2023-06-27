/* import React, { useState } from "react";
import { Menu } from "antd";
import Badge from "@mui/material/Badge";
import {
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  UserAddOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const navigate = useNavigate();

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.

        toast.warning("an unexpected error occured !");
      });
  };

  return (
    <Menu
      style={{
        display: "inline-block",
        position: "fixed",
        width: "100%",
        paddingTop: "10px",
        overflow: "hidden",
        padding: "20px 50px",
        background: "#E3E6F3",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.06)",
        height: "8vh"
      }}
      onClick={handleClick}
      mode="horizontal"
      selectedKeys={[current]}
    >
      <Item
        style={{
          color: "#088178",
          backgroundColor: "#E3E6F3",
          fontWeight: "700",
          fontSize: "16px",
        }}
        key="home"
        icon={<AppstoreOutlined />}
      >
        <Link to="/">Home </Link>
      </Item>




      {user && (
        <SubMenu
          key="submenu"
          style={{
            color: "#088178",
            float: "right",
            fontWeight: "700",
            fontSize: "16px",
          }}
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
        >
          {user && user.role === "subscriber" && (
            <Item
              key="setting:1"
              style={{
                color: "#088178",
                backgroundColor: "#E3E6F3",
                fontWeight: "700",
                fontSize: "16px",
                marginTop: "50px",
              }}
            >
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item
              key="setting:1"
              style={{
                color: "#088178",
                backgroundColor: "#E3E6F3",
                fontWeight: "700",
                fontSize: "16px",
              }}
            >
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item
            icon={<LogoutOutlined />}
            onClick={logout}
            style={{
              color: "#088178",
              backgroundColor: "#E3E6F3",
              fontWeight: "700",
              fontSize: "16px",
            }}
          >
            Logout
          </Item>
        </SubMenu>
      )}



      <Item
        style={{
          color: "#088178",
          backgroundColor: "#E3E6F3",
          fontWeight: "700",
          fontSize: "16px",
          
        }}
        key="shop"
        icon={<ShoppingOutlined />}
      >
        <Link to="/shop">Shop </Link>
      </Item>
       

      <Item
        style={{
          color: "#088178",
          backgroundColor: "#E3E6F3",
          fontWeight: "700",
          fontSize: "16px",
          float: "right",
        }}
        key="cart"
        icon={<ShoppingCartOutlined />}
      >
        <Link to="/cart">
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent={cart.length}
            color="secondary"
            overlap="circular"
          >
            Cart
          </Badge>
        </Link>
      </Item>
      
      <Item
        style={{
          float: "right",
        }}
        key="search"
        
      >
        <Search />
      </Item>

      {!user && (
        <Item
          key="register"
          style={{ marginLeft: "auto", float: "right" }}
          icon={<UserAddOutlined />}
        >
          <Link to="/Register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" style={{ float: "right" }} icon={<UserOutlined />}>
          <Link to="/Login">Login</Link>
        </Item>
      )}
    </Menu>
  );
};

export default Header;
 

 */

import React, { useState } from "react";
import { Menu } from "antd";
import Badge from "@mui/material/Badge";
import {
  AppstoreOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
  UserAddOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("home");

  const navigate = useNavigate();

  let dispatch = useDispatch();
  let { user, cart } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        navigate("/login");
      })
      .catch((error) => {
        toast.warning("An unexpected error occurred!");
      });
  };

  return (
    <Menu
      style={{
        backgroundColor: "#E3E6F3",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "8vh",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.06)",
      }}
      onClick={handleClick}
      mode="horizontal"
      selectedKeys={[current]}
    >
      <Item
        key="home"
        icon={<AppstoreOutlined />}
        style={{ fontWeight: "700", fontSize: "16px", marginLeft: 0 }}
      >
        <Link to="/">Home</Link>
      </Item>

      <Item
        key="shop"
        icon={<ShoppingOutlined />}
        style={{ fontWeight: "700", fontSize: "16px" }}
      >
        <Link to="/shop">Shop</Link>
      </Item>

      <Item key="search" style={{ marginLeft: "auto", marginRight: 0 }}>
        <Search />
      </Item>

      <Item
        key="cart"
        icon={<ShoppingCartOutlined />}
        style={{ fontWeight: "700", fontSize: "16px" }}
      >
        <Link to="/cart">
          <Badge
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            badgeContent={cart.length}
            color="secondary"
            overlap="circular"
          >
            Cart
          </Badge>
        </Link>
      </Item>

      {!user && (
        <Item
          key="register"
          style={{ marginRight: 0 }}
          icon={<UserAddOutlined />}
        >
          <Link to="/register">Register</Link>
        </Item>
      )}

      {!user && (
        <Item key="login" style={{ marginRight: 0 }} icon={<UserOutlined />}>
          <Link to="/login">Login</Link>
        </Item>
      )}

      {user && (
        <SubMenu
          key="submenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          style={{ fontWeight: "700", fontSize: "16px" }}
        >
          {user && user.role === "subscriber" && (
            <Item key="dashboard" className="custom-dropdown-item">
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}

          {user && user.role === "admin" && (
            <Item key="dashboard" className="custom-dropdown-item">
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}

          <Item
            icon={<LogoutOutlined />}
            onClick={logout}
            className="custom-dropdown-item"
            style={{ fontWeight: "700", fontSize: "16px" }}
          >
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Header;

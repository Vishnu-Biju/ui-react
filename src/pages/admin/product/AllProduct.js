import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const AllProducts = () => {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  //redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProductsByCount(100)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleRemove = (slug) => {
    if (window.confirm("Delete?")) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <div style={{ padding: "20px 0" }}>
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col " style={{ fontSize: "54px", marginTop: "20px", marginTop:"50px" }}>
        <h1 style={{  fontSize: "54px" ,textAlign:"center", marginTop: "60px", color:"black"}}
        >
          All Products
        </h1>
        <section id="shopProduct">
       
      </section>

          <div className="row">
            {loading ? (
              <h4>Loading...</h4>
            ) : (
              products.map((product) => (
                <div className="col-lg-3 col-md-6 pb-4" key={product._id}>
                  <AdminProductCard
                    product={product}
                    handleRemove={handleRemove}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;

/* import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCart from "../cards/LoadingCard";
import { Pagination } from "antd";


const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);


  useEffect(() => {
    loadAllProducts();
  }, [page]);


  
  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };
 

  return (
    <div className="home-content">
     

      <div className="products">
      {loading ? (
          <LoadingCart count={4} />
        ) : (
          <div className="Row">
            {products.map((product) => (
              <div key={product._id} id="cardmain" className=" col-lg-3 col-md-5 p-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav id="pagination" className="col-lg-4  col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount/4)*10 }
            onChange={(value) => setPage(value)}
            
          />
        </nav>

      </div>
     
    </div>
  );
};

export default NewArrivals;
 */
/* 
import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCart from "../cards/LoadingCard";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="home-1">
      <section id="arrival">
        <h4>Trade-in-offer</h4>
        <h2>super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & upto 70%off</p>
        <Link to="/shop">
            <button>Shop now</button>
          </Link>
      </section>
      <h4 className="jumbow ">New Arrivals</h4>
      <div className="products">
        {loading ? (
          <LoadingCart count={4} />
        ) : (
          <div className="Row">
            {products.map((product) => (
              <div key={product._id} id="cardmain" className=" col-lg-3 col-md-5 p-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="row">
        <nav id="pagination" className="col-lg-4  col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={Math.ceil(productsCount / 4) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </div>
  );
};

export default NewArrivals;
 */
import React, { useEffect, useState } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import ProductCard from "../cards/ProductCard";
import LoadingCart from "../cards/LoadingCard";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data.products); // Update this line
      setLoading(false);
    });
  };

  return (
    <div className="home-1">
      <section id="arrival">
        <h4>Trade-in-offer</h4>
        <h2>super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & upto 70%off</p>
        <Link to="/shop">
          <button>Shop now</button>
        </Link>
      </section>
      <h4 className="jumbow">New Arrivals</h4>
      <h6 className="jumbows">Try it out Now</h6>

      <div className="products">
        {loading ? (
          <LoadingCart count={4} />
        ) : (
          <div className="Row">
            {products.map((product) => (
              <div
                key={product._id}
                id="cardmain"
                className="col-lg-3 col-md-5 p-2"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pagination-container">
        <Pagination
          current={page}
          total={Math.ceil(productsCount / 4) * 10}
          onChange={(value) => setPage(value)}
          showSizeChanger={false}
          pageSize={4}
          hideOnSinglePage={true}
        />
      </div>
    </div>
  );
};

export default NewArrivals;

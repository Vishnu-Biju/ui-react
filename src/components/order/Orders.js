/*  import React from "react";
 import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
 import ShowPaymentInfo from "../cards/ShowPaymentInfo";

 const Orders = ({ orders, handleStatusChange }) => {
   const showOrderInTable = (order) => (
     <table className="table table-bordered" style={{width:"100%" , backgroundColor:"white"}}>
       <thead className="thead-light">
         <tr>
           <td scope="col">Title</td>
           <td scope="col">Price</td>
           <td scope="col">Brand</td>
           <td scope="col">Color</td>
           <td scope="col">Count</td>
           <td scope="col">Shipping</td>
         </tr>
       </thead>

       <tbody>
         {order.products.map((p, i) => (
           <tr key={i}>
             <td>
               <b>{p.product.title}</b>
             </td>
             <td>{p.product.price}</td>
             <td>{p.product.brand}</td>
             <td>{p.color}</td>
             <td>{p.count}</td>
             <td>
               {p.product.shipping === "Yes" ? (
                 <CheckCircleOutlined style={{ color: "green" }} />
               ) : (
                 <CloseCircleOutlined style={{ color: "red" }} />
               )}
             </td>
           </tr>
         ))}
       </tbody>
      
     </table>
   );

   return (
     <>
       {orders.map((order) => (
         <div key={order._id}className="col mb-5 mt-5">
           <div style={{width:"100%"}}>
             <ShowPaymentInfo order={order} showStatus={false} />

             <div className="row">
               <div className="col-md-4">Delivery Status</div>
               <div className="col-md-8">
                 <select
                   onChange={(e) =>
                     handleStatusChange(order._id, e.target.value)
                   }
                   className="form-control"
                   defaultValue={order.orderStatus}
                   name="status"
                 >
                   <option value="Not Processed">Not Processed</option>
                   <option value="Cash on Delivery">Cash on Delivery</option>
                   <option value="Processing">Processing</option>
                   <option value="Dispatched">Dispatched</option>
                   <option value="Cancelled">Cancelled</option>
                   <option value="Completed">Completed</option>
                 </select>
               </div>
             </div>
           </div>

           {showOrderInTable(order)}
          
         </div>
         
       ))}
       
     </>
   );
 };

 export default Orders; */
 import React from "react";
 import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
 import ShowPaymentInfo from "../cards/ShowPaymentInfo";
 
 const Orders = ({ orders, handleStatusChange }) => {
   const showOrderInTable = (order) => (
     <table className="table table-bordered">
       <thead className="thead-light">
         <tr>
           <th>Title</th>
           <th>Price</th>
           <th>Brand</th>
           <th>Color</th>
           <th>Count</th>
           <th>Shipping</th>
         </tr>
       </thead>
       <tbody>
         {order.products.map((p, i) => (
           <tr key={i}>
             <td>
               <b>{p.product.title}</b>
             </td>
             <td>{p.product.price}</td>
             <td>{p.product.brand}</td>
             <td>{p.color}</td>
             <td>{p.count}</td>
             <td>
               {p.product.shipping === "Yes" ? (
                 <CheckCircleOutlined style={{ color: "green" }} />
               ) : (
                 <CloseCircleOutlined style={{ color: "red" }} />
               )}
             </td>
           </tr>
         ))}
       </tbody>
     </table>
   );
 
   return (
     <div className="row">
       {orders.map((order) => (
         <div key={order._id} className="col-md-12 col-lg-12 mb-4">
           <div className="card">
             <div className="card-body mb-2" style={{ textAlign: "center" }}>
               <ShowPaymentInfo order={order} showStatus={false} />
 
               <div className="table-responsive-sm" style={{ marginTop: "20px" }}>
                 {showOrderInTable(order)}
               </div>
             </div>
           </div>
         </div>
       ))}
     </div>
   );
 };
 
 export default Orders;
 
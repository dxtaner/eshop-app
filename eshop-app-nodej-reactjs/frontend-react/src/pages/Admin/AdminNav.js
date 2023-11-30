import React from "react";
import { Link } from "react-router-dom";
import "./admin.css";

function AdminNav() {
  return (
    <nav>
      <ul className="admin-menu">
        <li>
          <Link to={"/admin/home"}>Home</Link>
        </li>
        <li>
          <Link to={"/admin/orders"}>Orders</Link>
        </li>
        <li>
          <Link to={"/admin/products"}>Products</Link>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNav;

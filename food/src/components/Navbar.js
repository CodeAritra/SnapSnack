import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { UseCart } from "./ContextReducer";


export default function Navbar() {
  let data =UseCart();

  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-success">
        <div className="container-fluid">
          <a className="navbar-brand fs-italic fs-5" href="/">
            SnapSnack
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <a
                  className="nav-link active text-white"
                  aria-current="page"
                  href="/"
                >
                  Home
                </a>
              </li>
              {/* {localStorage.getItem("authtoken") ? (
                // <li className="nav-item">
                //   <a
                //     className="nav-link active text-white"
                //     aria-current="page"
                //     href="/Myorder"
                //   >
                //     My Orders
                //   </a>
                // </li>
              ) : (
                ""
              )} */}
            </ul>
            {!localStorage.getItem("authtoken") ? (
              <div className="d-flex ">
                <a className="btn bg-white text-success mx-1 " href="/login">
                  LogIn
                </a>
                <a className="btn bg-white text-success mx-1 " href="/signup">
                  SignUp
                </a>
              </div>
            ) : (
              <>
                <div className="btn bg-white text-success mx-1 " onClick={()=>{setCartView(true)}}>
                  My Cart{"   "}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                </div>
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart></Cart>
                  </Modal>
                ) : (
                  ""
                )}
                <div
                  className="btn bg-white text-danger mx-1"
                  onClick={handlelogout}
                >
                  Log Out
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

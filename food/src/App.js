import "./App.css";

import Home from "./screens/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./screens/Login";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import Signup from "./screens/Signup.js";
import { CartProvider } from "./components/ContextReducer.js";
import Cart from "./screens/Cart.js";
import Myorder from "./screens/Myorder.js";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/Myorder" element={<Myorder/>} /> */}
            {/* <Route path="/cart" element={<Cart/>} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

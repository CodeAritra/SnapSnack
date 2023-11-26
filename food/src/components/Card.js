import React, { useEffect, useRef, useState } from "react";
import { UseCart, UseDispatch } from "./ContextReducer";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  const navigate = useNavigate();
  let dispatch = UseDispatch();
  let data = UseCart();

  const priceref = useRef();

  let options = props.options;
  let priceoptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };
  const handleQty = (e) => {
    setQty(e.target.value);
  };
  const handleOptions = (e) => {
    setSize(e.target.value);
  };

  const handleaddcart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;

        break;
      }
    }
    console.log(food);
    console.log(new Date());
    if (food != []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalprice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalprice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      name: props.foodItem.name,
      id: props.foodItem._id,
      price: finalprice,
      qty: qty,
      size: size,
    });
    console.log(data);
  };

  let finalprice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceref.current.value);
  }, []);

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          style={{ height: "160px", objectFit: "fill" }}
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          {/* <p className="card-text">
             {props.description}
            </p> */}
          <div className=" w-100">
            <select
              className="m-2 h-100 rounded"
              // onChange={(e) => setQty(e.target.value)}
              // onClick={handleClick}
              onChange={handleQty}
            >
              {Array.from(Array(10), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 rounded"
              // onClick={handleClick}
              onChange={handleOptions}
              ref={priceref}
            >
              {priceoptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline fs-5">Rs {finalprice}/-</div>
            <hr />
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handleaddcart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

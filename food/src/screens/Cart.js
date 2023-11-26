import React from "react";

import { UseCart, UseDispatch } from "../components/ContextReducer";

export default function Cart() {
  let data = UseCart();
  let dispatch = UseDispatch();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">Cart is empty</div>
      </div>
    );
  }

  const handlecheckout = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:5000/api/orderdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderdata: data,
        email: userEmail,
        // orderdate: new Date().toDateString,
      }),
    });
    console.log(data);
    console.log("response");

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalprice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md ">
        <table className="table table-hover ">
          <thead className=" text-danger fs-2 ">
            <tr>
              <th className="text-success " scope="col ">
                SL NO
              </th>
              <th className="text-success " scope="col">
                Name
              </th>
              <th className="text-success " scope="col">
                Quantity
              </th>
              <th className="text-success " scope="col">
                Option
              </th>
              <th className="text-success " scope="col">
                Amount
              </th>
              <th className="text-success " scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr className="text-white">
                <th className="text-white " scope="row">
                  {index + 1}
                </th>
                <td className="text-white ">{food.name}</td>
                <td className="text-white ">{food.qty}</td>
                <td className="text-white ">{food.size}</td>
                <td className="text-white ">{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <i
                      className="fa-solid fa-trash-can"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    ></i>
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className=" fs-2">Total Price : {totalprice}/- </h1>
        </div>
        <div>
          <button className="btn bg-success mt-5" onClick={handlecheckout}>
            {" "}
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

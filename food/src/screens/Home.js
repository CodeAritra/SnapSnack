import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

export default function Home() {
  const [search,setSearch] = useState("");
  const [foodcat, setFoodcat] = useState([]);
  const [foodit, setFoodit] = useState([]);

  const loaddata = async () => {
    let response = await fetch("http://localhost:5000/api/fooddata", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodit(response[0]);
    setFoodcat(response[1]);
    // console.log(response[0],response[1]);
  };

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption " style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=>{setSearch(e.target.value)}}
                />
                {/* <button className="btn btn-outline-success bg-success" type="submit">
                  Search
                </button> */}
              </div>
            </div>

            {/* carousel pics */}

            <div className="carousel-item active">
              <img
                src="https://source.unsplash.com/random/300×300?burger"
                className="d-block w-100"
                style={{ filter: "brigthness(30%)" }}
                alt="burger"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300×300?pizza"
                className="d-block w-100"
                style={{ filter: "brigthness(30%)" }}
                alt="pizza"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/300×300?sandwitch"
                className="d-block w-100"
                style={{ filter: "brigthness(30%)" }}
                alt="sandwitch"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="container">
        {foodcat != []
          ? foodcat.map((data) => {
              return (
                <div className="row m-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />

                  {foodit != []
                    ? foodit
                        .filter(
                          (item) => (item.CategoryName == data.CategoryName) && (item.name.toLowerCase().includes(search))
                        )
                        .map((filteritems) => {
                          return (
                            <div
                              className="col-12 col-md-6 col-lg-3"
                              key={filteritems._id}
                            >
                              <Card
                              options={filteritems.options[0]}
                              foodItem={filteritems}
                                
                              />
                            </div>
                          );
                        })
                    : "No food items"}
                </div>
              );
            })
          : "No food category"}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

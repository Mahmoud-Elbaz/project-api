import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import Loading from "../Components/Loading/Loading"

export default function CategorySlider() {
  let [loading,setLoading] = useState(false)

  function getData() {
    setLoading(true)
    return axios.get(`${process.env.REACT_APP_BaseUrl}/api/category`);
  }

  const { data, isLoading, isFetching, isError } = useQuery(
    "categories",
    getData
  );
  console.log(data);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    arrows: false,
    autoplay:true,
    autoplaySpeed: 2500,
  };
  return (
    <>
      <div className="container my-5">
          <h2 className="mb-2 h4">Browse top Categories</h2>
        <Slider {...settings}>
          {data?.data.map((cat) => (
            <div key={cat._id}>
              <img  src={cat.image} className="w-100 catSlide" style={{objectPosition:"top center"}}></img>
              <p className="fw-bold">{cat.name}</p>
            </div>
          ))}
        </Slider>
        {/* <Slider {...settings}>
          {data?.data.data.map((cat) => (
            <div>
              <img key={cat._id} src={cat.image} className="w-100 catSlide" style={{objectPosition:"bottom center"}}></img>
              <p className="fw-bold">{cat.name}</p>
            </div>
          ))}
        </Slider> */}
      </div>
    </>
  );
}

import React from 'react'
import Slider from "react-slick";
import slide1 from "../assets/images/slider-image-1.jpeg"
import slide2 from "../assets/images/slider-image-2.jpeg"
import slide3 from "../assets/images/slider-image-3.jpeg"
import image1 from "../assets/images/grocery-banner.png"
import image2 from "../assets/images/grocery-banner-2.jpeg"
let sliders = [slide1,slide2,slide3]
export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay:true,
        autoplaySpeed: 3500,
      };
    return (
    <div className='container'>
        <div className="row h-100 gx-0 gy-5">
            <div className="col-md-10">
                <Slider {...settings}>
                    {sliders.map((slide)=><img key={slide} height={350} style={{objectFit:"cover"}} src={slide}></img>)}
                </Slider>
            </div>
            <div className="col-md-2">
                <img src={image1} style={{objectFit:"cover", objectPosition:"right center"}} height={"50%"} className='w-100' alt="Grocery bag" />
                <img src={image2} style={{objectFit:"cover", objectPosition:"right center"}} height={"50%"} className='w-100' alt="Bread basket" />
            </div>
        </div>
    </div>
  )
}

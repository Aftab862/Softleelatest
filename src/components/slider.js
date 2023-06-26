import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSlider } from "../redux/actions/app.actions";

const Sliders = () => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: true,
    autoplay: true,
    autoplaySpeed: 9000,
  };

  const dispatch = useDispatch();
  const { slider } = useSelector((selectSate) => selectSate.app);

  useEffect(() => {
    dispatch(getSlider());
  }, []);


  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        {slider?.data?.$sliders &&
          slider?.data?.$sliders.map((data) => (
            <div>
              <img
                className="slider-image slider1 img-fluid hide-on-mobile"
                // src={`https://softliee.com/softlee/public/storage/slider/${data?.image}`}
                src="../../assets/images/slide.webp"
                alt=""
                width="1360"
                height="360"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
};
export default Sliders;

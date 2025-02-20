import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Autoplay } from "swiper/modules";

const Promo = () => {
  return (
    <div className="homeSlider w-full flex justify-center items-center">
      <div className="container">
        <Swiper
          autoplay={{
            delay: 2500, 
            disableOnInteraction: false, 
          }}
          spaceBetween={10}
          modules={[Autoplay]}
          className="sliderHome"
        >
          <SwiperSlide>
            <div className="item md:rounded overflow-hidden">
              <img
                src="https://ik.imagekit.io/44y3v51cp/kisankonnect/Images/BannerImage/20241219162537Story%20Banner%20Web%20%201920px%20%20600px.png?tr=f-webp"
                className="w-full md:rounded"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item md:rounded overflow-hidden">
              <img
                src="https://as2.ftcdn.net/v2/jpg/03/20/39/81/1000_F_320398182_1X1ebszxgKyeS6j291ywWYIw1dfRLETC.jpg"
                alt="Banner slide"
                className="w-full md:rounded"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item md:rounded overflow-hidden">
              <img
                src="https://ik.imagekit.io/44y3v51cp/kisankonnect/Images/BannerImage/20241210112748Hurda%20Combo%20Story%20Web.jpg?tr=f-webp"
                className="w-full md:rounded"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item md:rounded overflow-hidden">
              <img
                src="https://ik.imagekit.io/44y3v51cp/kisankonnect/Images/BannerImage/20241219162537Story%20Banner%20Web%20%201920px%20%20600px.png?tr=f-webp"
                alt="Banner slide"
                className="w-full md:rounded"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item md:rounded overflow-hidden">
              <img
                src="https://ik.imagekit.io/44y3v51cp/kisankonnect/Images/BannerImage/20241210112748Hurda%20Combo%20Story%20Web.jpg?tr=f-webp"
                alt="Banner slide"
                className="w-full md:rounded"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item md:rounded overflow-hidden">
              <img
                src="https://ik.imagekit.io/44y3v51cp/kisankonnect/Images/BannerImage/20241219162537Story%20Banner%20Web%20%201920px%20%20600px.png?tr=f-webp"
                alt="Banner slide"
                className="w-full md:rounded"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Promo;

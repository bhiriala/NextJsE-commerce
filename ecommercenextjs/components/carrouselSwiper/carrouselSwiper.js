"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation"; 
import "swiper/css/pagination";
import styles from "./carrouselSwiper.module.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import slide1 from "../../assets/img/h4-slide.png";
import slide2 from "../../assets/img/h4-slide2.png";
import slide3 from "../../assets/img/h4-slide3.png";
import slide4 from "../../assets/img/h4-slide4.png";

const images = [slide1, slide2, slide3, slide4];

export default function CarrouselSwiper () {
    console.log(images);
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      className={styles.mySwiper}
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
            <Image
            src={img}
            alt={`Slide ${index}`}
            className={styles.slideImage}
            fill
            />
        </SwiperSlide>
        ))}
    </Swiper>
  );
};



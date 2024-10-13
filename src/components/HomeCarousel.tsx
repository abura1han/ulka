"use client";

import Image from "next/image";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const HomeCarousel = () => {
  const sliderSettings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  };

  return (
    <Slider {...sliderSettings} adaptiveHeight>
      <div className="relative">
        <Image
          src="/images/butterfly.jpg"
          alt="Ulka in action 1"
          className="rounded-lg w-full h-[400px] object-contain"
          width={300}
          height={400}
        />
      </div>
      <div>
        <Image
          src="/images/butterfly.jpg"
          alt="Ulka in action 1"
          className="rounded-lg w-full h-[400px] object-contain"
          width={300}
          height={400}
        />
      </div>
      <div>
        <Image
          src="/images/butterfly.jpg"
          alt="Ulka in action 1"
          className="rounded-lg w-full h-[400px] object-contain"
          width={300}
          height={400}
        />
      </div>
    </Slider>
  );
};

export default HomeCarousel;

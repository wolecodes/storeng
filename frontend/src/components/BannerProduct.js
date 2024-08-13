import React, { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
//Desktop View
import image1 from "../assest/banner/img1.png";
import image2 from "../assest/banner/img2.png";
import image3 from "../assest/banner/img3.jpg";
import image4 from "../assest/banner/img4.png";
import image5 from "../assest/banner/img.png";

//Mobile view

import image1Mobile from "../assest/banner/img1_mobile.png";
import image2Mobile from "../assest/banner/img2_mobile.png";
import image3Mobile from "../assest/banner/img3_mobile.jpg";
import image4Mobile from "../assest/banner/img4_mobile.png";
import image5Mobile from "../assest/banner/img5_mobile.png";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const desktopImages = [image1, image2, image3, image4, image5];

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];

  const nextImage = () => {
    if (desktopImages.length - 1 > currentImage) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const previousImage = () => {
    if (currentImage !== 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (desktopImages.length - 1 > currentImage) {
        nextImage();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [currentImage]);
  return (
    <div className="container mx-auto py-4 rounded ">
      <div className="h-72 w-full bg-slate-200  relative">
        <div className="absolute z-10 h-full w-full md:flex items-center hidden">
          <div className="flex justify-between w-full text-2xl ">
            <button
              className="bg-white shadow-md rounded-full p-1"
              onClick={previousImage}
            >
              <FaAngleLeft />
            </button>

            <button
              onClick={nextImage}
              className="bg-white shadow-md rounded-full p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>

        {/* desktop view */}
        <div className="hidden md:flex h-full w-full overflow-hidden">
          {desktopImages.map((img, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all "
                key={img}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={img} alt="" className="h-full w-full " />
              </div>
            );
          })}
        </div>

        {/* mobile view  */}

        <div className="flex h-full w-full overflow-hidden md:hidden">
          {mobileImages.map((img, index) => {
            return (
              <div
                className="w-full h-full min-w-full min-h-full transition-all "
                key={img}
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                <img src={img} alt="" className="h-full w-full object-cover" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;

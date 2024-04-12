import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const AutoPlayingCarousel = () => {
  return (
    <div className="max-w-full mx-auto">
      {' '}
      {/* Adjust the width here */}
      <Carousel autoPlay infiniteLoop showThumbs={false}>
        <div className="h-[400px]">
          <img
            className="object-cover h-full w-full"
            src="D:/6 Sem ppt/Project/Mern Ecommerce web/frontend/public/images/p3.jpeg"
            alt="Slide 1"
          />
        </div>
        <div className="h-[400px]">
          <img
            className="object-cover h-full w-full"
            src="https://via.placeholder.com/300"
            alt="Slide 2"
          />
        </div>
        <div className="h-[400px]">
          <img
            className="object-cover h-full w-full"
            src="https://via.placeholder.com/300"
            alt="Slide 3"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default AutoPlayingCarousel;

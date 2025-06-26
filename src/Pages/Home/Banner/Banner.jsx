import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/banner/banner1.png'
import img2 from '../../../assets/banner/banner2.png'
import img3 from '../../../assets/banner/banner3.png'



const Banner = () => {
    return (
        <Carousel >
            <div>
                <img src={img1} />
                <p className="legend">Fast Delivery</p>
            </div>
            <div>
                <img src={img2} />
                <p className="legend">Secure Delivery</p>
            </div>
            <div>
                <img src={img3} />
                <p className="legend">Easy Delivery</p>
            </div>
        </Carousel>
    );
};

export default Banner;
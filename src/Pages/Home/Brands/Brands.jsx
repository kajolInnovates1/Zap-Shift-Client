import React from 'react';
import Marquee from 'react-fast-marquee';

// Import images from assets folder
import logo1 from '../../../assets/brands/amazon.png';
import logo2 from '../../../assets/brands/amazon_vector.png';
import logo3 from '../../../assets/brands/casio.png';
import logo4 from '../../../assets/brands/moonstar.png';
import logo5 from '../../../assets/brands/randstad.png';
import logo6 from '../../../assets/brands/start-people 1.png';

const logos = [logo1, logo2, logo3, logo4, logo5, logo6];

const CompanyLogos = () => {
    return (
        <div className="bg-base-200 py-6">
            <Marquee speed={40} gradient={false} direction="right" pauseOnHover={true}>
                {logos.map((logo, index) => (
                    <img
                        key={index}
                        src={logo}
                        alt={`logo-${index}`}
                        className="h-16 w-auto mx-8 gap-4"
                    />
                ))}
            </Marquee>
        </div>
    );
};

export default CompanyLogos;

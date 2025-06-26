import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from '../OurService/OurService';
import CompanyLogos from '../Brands/Brands';

const Home = () => {
    return (
        <div className='min-h-[calc(100vh-310px)]'>
            <Banner></Banner>
            <OurServices></OurServices>
            <CompanyLogos></CompanyLogos>
        </div>
    );
};

export default Home;
import React from 'react';

const ServiceCard = ({ service }) => {
    return (
        <div>
            <div

                className={`card shadow-xl p-5 min-h-[200px]  hover:scale-105 ${service.style}`}
            >
                <div className="flex items-center mb-4">
                    {service.icon}
                    <h3 className="ml-3 text-xl font-semibold">{service.title}</h3>
                </div>
                <p className="text-gray-700">{service.description}</p>
            </div>

        </div>
    );
};

export default ServiceCard;
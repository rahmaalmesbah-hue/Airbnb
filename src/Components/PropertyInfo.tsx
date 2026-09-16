import React from 'react';
import type { Property } from '../data/property';

interface PropertyInfoProps {
  property: Property;
}

export const PropertyInfo: React.FC<PropertyInfoProps> = ({ property }) => {
  const handleScrollToReviews = () => {
    const reviewsElement = document.getElementById('reviews-section');
    if (reviewsElement) {
      reviewsElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenMap = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`;
    window.open(mapUrl, '_blank');
  };

  return (
    <div className="mb-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
        {property.title}
      </h1>
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 font-medium">
        <span className="flex items-center gap-1 font-bold text-black">
          ★ {property.rating}
        </span>
        <span>·</span>
        <button
          onClick={handleScrollToReviews}
          className="underline cursor-pointer hover:text-black transition bg-transparent border-none p-0 text-sm font-medium text-gray-700"
        >
          {property.reviews} reviews
        </button>
        <span>·</span>
        <button
          onClick={handleOpenMap}
          className="underline cursor-pointer hover:text-black transition bg-transparent border-none p-0 text-sm font-medium text-gray-700"
        >
          {property.location}
        </button>
      </div>
    </div>
  );
};
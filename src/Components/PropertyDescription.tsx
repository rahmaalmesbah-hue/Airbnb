import React from 'react';
import type { Property } from '../data/property';

interface PropertyDescriptionProps {
  property: Property;
}

export const PropertyDescription: React.FC<PropertyDescriptionProps> = ({ property }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-6 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Hosted by {property.host.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {property.guests} guests · {property.bedrooms} bedrooms · {property.beds} beds · {property.bathrooms} baths
          </p>
        </div>
        <div className="relative">
          <img
            src={property.host.avatar}
            alt={property.host.name}
            className="w-14 h-14 rounded-full object-cover border border-gray-200"
          />
          {property.host.isSuperhost && (
            <span
              className="absolute -bottom-1 -right-1 bg-rose-500 text-white text-[10px] p-1 rounded-full"
              title="Superhost"
            >
              🏅
            </span>
          )}
        </div>
      </div>

      <div className="pb-6 border-b border-gray-200">
        <h3 className="text-lg font-bold mb-3 text-gray-900">About this space</h3>
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          {property.description}
        </p>
      </div>
    </div>
  );
};
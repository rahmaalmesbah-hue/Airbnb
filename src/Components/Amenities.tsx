import React from 'react';

interface AmenitiesProps {
  amenities: { name: string; icon: string }[];
}

export const Amenities: React.FC<AmenitiesProps> = ({ amenities }) => {
  return (
    <div className="pb-6 border-b border-gray-200">
      <h3 className="text-lg font-bold mb-4 text-gray-900">What this place offers</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {amenities.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm font-medium text-gray-800">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
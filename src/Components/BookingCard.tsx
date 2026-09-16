import React, { useState } from 'react';
import type { Property } from '../data/property';

interface BookingCardProps {
  property: Property;
  onReserve: (details: { checkIn: string; checkOut: string; guests: number; total: number }) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({ property, onReserve }) => {
  const [checkIn, setCheckIn] = useState('2026-10-12');
  const [checkOut, setCheckOut] = useState('2026-10-17');
  const [guests, setGuests] = useState(2);

  const calculateNights = () => {
    const start = new Date(checkIn).getTime();
    const end = new Date(checkOut).getTime();
    const diff = (end - start) / (1000 * 3600 * 24);
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();
  const cleaningFee = 40;
  const serviceFee = 25;
  const basePrice = property.price * nights;
  const totalPrice = basePrice + cleaningFee + serviceFee;

  return (
    <div className="sticky top-28 bg-white border border-gray-200 rounded-3xl p-6 shadow-xl space-y-6">
      <div className="flex justify-between items-baseline">
        <div>
          <span className="text-2xl font-extrabold text-gray-900">${property.price}</span>
          <span className="text-gray-500 text-sm"> / night</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold">
          <span>★ {property.rating}</span>
          <span className="text-gray-400">({property.reviews})</span>
        </div>
      </div>

      <div className="border border-gray-300 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-2 border-b border-gray-300">
          <div className="p-3 border-r border-gray-300 bg-gray-50/50">
            <label className="block text-[10px] font-bold text-gray-700 uppercase">CHECK-IN</label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-xs font-semibold bg-transparent focus:outline-none cursor-pointer"
            />
          </div>
          <div className="p-3 bg-gray-50/50">
            <label className="block text-[10px] font-bold text-gray-700 uppercase">CHECKOUT</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-xs font-semibold bg-transparent focus:outline-none cursor-pointer"
            />
          </div>
        </div>
        <div className="p-3 bg-gray-50/50">
          <label className="block text-[10px] font-bold text-gray-700 uppercase">GUESTS</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full text-xs font-semibold bg-transparent focus:outline-none cursor-pointer"
          >
            {[...Array(property.guests)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} guest{i > 0 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex justify-between">
          <span className="underline">${property.price} x {nights} nights</span>
          <span>${basePrice}</span>
        </div>
        <div className="flex justify-between">
          <span className="underline">Cleaning fee</span>
          <span>${cleaningFee}</span>
        </div>
        <div className="flex justify-between">
          <span className="underline">Airbnb service fee</span>
          <span>${serviceFee}</span>
        </div>
        <div className="pt-3 border-t border-gray-200 flex justify-between font-extrabold text-base text-gray-900">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>

      <button
        onClick={() => onReserve({ checkIn, checkOut, guests, total: totalPrice })}
        className="w-full bg-gradient-to-r from-[#FF385C] to-[#E00B41] text-white font-bold py-3.5 rounded-xl hover:opacity-95 transition shadow-lg cursor-pointer"
      >
        Reserve
      </button>
    </div>
  );
};
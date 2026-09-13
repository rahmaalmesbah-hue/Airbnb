import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface BookingCardProps {
  price: number;
}

const BookingCard = ({ price }: BookingCardProps) => {
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleReserve = () => {
    if (!checkIn || !checkOut) {
      alert("Please select your dates");
      return;
    }

    navigate("/checkout", {
      state: {
        price,
        checkIn,
        checkOut,
        guests,
      },
    });
  };

  return (
    <aside className="h-fit rounded-2xl border p-6 shadow-lg lg:sticky lg:top-8">
      <h2 className="text-2xl font-semibold">
        ${price}
        <span className="text-sm font-normal text-gray-500">
          {" "}
          night
        </span>
      </h2>

      <div className="mt-6 grid grid-cols-2 rounded-xl border">
        <div className="border-r p-3">
          <label className="text-xs font-semibold">
            CHECK-IN
          </label>

          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-2 w-full"
          />
        </div>

        <div className="p-3">
          <label className="text-xs font-semibold">
            CHECK-OUT
          </label>

          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-2 w-full"
          />
        </div>
      </div>

      <div className="mt-3 rounded-xl border p-3">
        <label className="text-xs font-semibold">
          GUESTS
        </label>

        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="mt-2 w-full"
        >
          <option value={1}>1 guest</option>
          <option value={2}>2 guests</option>
          <option value={3}>3 guests</option>
          <option value={4}>4 guests</option>
        </select>
      </div>

      <button
        onClick={handleReserve}
        className="mt-5 w-full rounded-xl bg-black py-3 font-semibold text-white"
      >
        Reserve
      </button>
    </aside>
  );
};

export default BookingCard;
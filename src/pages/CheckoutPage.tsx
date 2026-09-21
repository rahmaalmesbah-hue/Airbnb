import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { Property } from "../data/property";
import { BOOKINGS_KEY, type Booking, type BookingDraft } from "../types/booking";
import { useAuth } from "../context/AuthContext";

interface CheckoutState {
  property: Property;
  listingImage: string;
  bookingData: BookingDraft;
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const location = useLocation();
  const state = location.state as CheckoutState | null;

  const [formData, setFormData] = useState({
    fullName: user ?? "",
    email: "",
    phone: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [error, setError] = useState("");

  if (!state?.property || !state.bookingData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-2xl font-bold">No reservation in progress</h1>
        <button onClick={() => navigate("/")} className="text-[#FF385C] font-semibold underline">
          Browse stays
        </button>
      </div>
    );
  }

  const { property, listingImage, bookingData } = state;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const emailRegex = /\S+@\S+\.\S+/;
    const cleanCardNumber = formData.cardNumber.replace(/\s+/g, "");
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

    if (!formData.fullName || !formData.email || !formData.phone || !formData.cardNumber || !formData.expiry || !formData.cvv) {
      setError("Please fill in all required fields");
      return;
    }
    if (formData.fullName.trim().length < 3) {
      setError("Please enter a valid full name");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (formData.phone.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid phone number");
      return;
    }
    if (cleanCardNumber.length !== 16 || Number.isNaN(Number(cleanCardNumber))) {
      setError("Card number must be exactly 16 digits");
      return;
    }
    if (!expiryRegex.test(formData.expiry)) {
      setError("Expiry date must be in MM/YY format (e.g. 12/28)");
      return;
    }
    if (formData.cvv.length !== 3 || Number.isNaN(Number(formData.cvv))) {
      setError("CVV must be exactly 3 digits");
      return;
    }

    const newBooking: Booking = {
      id: Date.now().toString(),
      propertyId: property.id,
      propertyTitle: property.title,
      propertyImage: listingImage,
      location: property.location,
      checkIn: bookingData.checkIn,
      checkOut: bookingData.checkOut,
      guests: bookingData.guests,
      totalPrice: bookingData.total,
      guestName: formData.fullName,
      guestEmail: formData.email,
      bookingDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    const existingBookings: Booking[] = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify([newBooking, ...existingBookings]));
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <button type="button" onClick={() => navigate(-1)} className="mb-6 text-sm font-semibold text-gray-600 hover:underline">
          ← Back
        </button>

        <h1 className="mb-6 text-3xl font-bold text-gray-900">Confirm and Pay</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="mb-4 text-xl font-semibold">Your Information</h2>

            {error && <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-600">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-rose-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-rose-500"
                />
              </div>
              <hr className="my-4" />
              <h3 className="text-lg font-semibold">Payment Info</h3>
              <div>
                <label className="block text-sm font-medium">Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-rose-500"
                  placeholder="1234 5678 9101 1121"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium">Expiry</label>
                  <input
                    type="text"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-rose-500"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-rose-500"
                    placeholder="123"
                  />
                </div>
              </div>
              <button type="submit" className="mt-4 w-full rounded-lg bg-rose-500 py-3 font-semibold text-white hover:bg-rose-600 transition">
                Confirm Booking
              </button>
            </form>
          </div>

          <div className="h-fit rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <img src={listingImage} alt={property.title} className="mb-4 h-40 w-full rounded-xl object-cover" />
            <h2 className="mb-1 text-lg font-semibold">{property.title}</h2>
            <p className="mb-4 text-sm text-gray-500">{property.location}</p>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Dates</span>
                <span>
                  {bookingData.checkIn} → {bookingData.checkOut}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Guests</span>
                <span>{bookingData.guests}</span>
              </div>
              <hr />
              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total (USD)</span>
                <span>${bookingData.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

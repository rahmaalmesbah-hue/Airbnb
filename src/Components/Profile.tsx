import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

interface Booking {
  id: string
  propertyTitle: string
  propertyImage: string
  location?: string
  checkIn: string
  checkOut: string
  totalPrice: number
  guestName: string
  guestEmail: string
  bookingDate: string
}

export default function Profile() {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("myBookings") || "[]")
    setBookings(savedBookings)
  }, [])

  const userInfo = bookings.length > 0 ? {
    name: bookings[0].guestName,
    email: bookings[0].guestEmail
  } : {
    name: "User Guest",
    email: "user@example.com"
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      
      {/* كارت بيانات المستخدم */}
      <div className="mb-10 flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF385C] text-2xl font-bold text-white">
          {userInfo.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{userInfo.name}</h1>
          <p className="text-sm text-gray-500">{userInfo.email}</p>
        </div>
      </div>

      {/* قائمة الحجوزات السابقة */}
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Your Reservations</h2>

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 p-10 text-center">
          <p className="mb-4 text-gray-500">You don't have any bookings yet.</p>
          <Link
            to="/"
            className="inline-block rounded-xl bg-[#FF385C] px-6 py-3 font-semibold text-white transition hover:bg-[#e00b41]"
          >
            Explore Stays
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <img
                src={booking.propertyImage || "https://via.placeholder.com/150"}
                alt={booking.propertyTitle}
                className="h-28 w-28 rounded-xl object-cover"
              />

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="font-bold text-gray-900 line-clamp-1">
                    {booking.propertyTitle}
                  </h3>
                  {booking.location && (
                    <p className="text-xs text-gray-500">{booking.location}</p>
                  )}
                  <div className="mt-2 text-xs text-gray-600">
                    <p><span className="font-semibold">Check-in:</span> {booking.checkIn}</p>
                    <p><span className="font-semibold">Check-out:</span> {booking.checkOut}</p>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
                  <span className="text-xs text-gray-400">Booked on {booking.bookingDate}</span>
                  <span className="font-bold text-[#FF385C]">${booking.totalPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
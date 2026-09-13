import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface BookingForm {
  fullName: string
  email: string
  phone: string
  cardNumber: string
  expiry: string
  cvv: string
}

export default function Checkout() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<BookingForm>({
    fullName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /\S+@\S+\.\S+/
    const cleanCardNumber = formData.cardNumber.replace(/\s+/g, '')
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/

    if (!formData.fullName || !formData.email || !formData.phone || !formData.cardNumber || !formData.expiry || !formData.cvv) {
      setError('Please fill in all required fields')
      return
    }

    if (formData.fullName.trim().length < 3) {
      setError('Please enter a valid full name')
      return
    }

    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return
    }

    if (formData.phone.length < 10 || isNaN(Number(formData.phone))) {
      setError('Please enter a valid phone number (digits only)')
      return
    }

    if (cleanCardNumber.length !== 16 || isNaN(Number(cleanCardNumber))) {
      setError('Card number must be exactly 16 digits')
      return
    }

    if (!expiryRegex.test(formData.expiry)) {
      setError('Expiry date must be in MM/YY format (e.g. 12/28)')
      return
    }

    if (formData.cvv.length !== 3 || isNaN(Number(formData.cvv))) {
      setError('CVV must be exactly 3 digits')
      return
    }

    setError('')

    // 1. تجهيز بيانات الحجز الجديد
    const newBooking = {
      id: Date.now().toString(),
      propertyTitle: 'Luxury Oceanfront Villa',
      propertyImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      location: 'Malibu, California',
      checkIn: 'Oct 15, 2026',
      checkOut: 'Oct 20, 2026',
      totalPrice: 680,
      guestName: formData.fullName,
      guestEmail: formData.email,
      bookingDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    }

    // 2. قراءة الحجوزات القائمة ثم إضافة الحجز الجديد وحفظهم في localStorage
    const existingBookings = JSON.parse(localStorage.getItem('myBookings') || '[]')
    const updatedBookings = [newBooking, ...existingBookings]
    localStorage.setItem('myBookings', JSON.stringify(updatedBookings))

    // 3. التوجيه لصفحة البروفايل مباشرة
    alert('Booking confirmed successfully!')
    navigate('/profile')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 text-sm font-semibold text-gray-600 hover:underline"
        >
          ← Back
        </button>

        <h1 className="mb-6 text-3xl font-bold text-gray-900">Confirm and Pay</h1>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Form */}
          <div className="rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="mb-4 text-xl font-semibold">Your Information</h2>

            {error && (
              <div className="mb-4 rounded-md bg-red-100 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 text-sm outline-none focus:border-rose-500"
                  placeholder="John Doe"
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
                  placeholder="john@example.com"
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
                  placeholder="+20 100 000 0000"
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

              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-rose-500 py-3 font-semibold text-white hover:bg-rose-600 transition"
              >
                Confirm Booking
              </button>
            </form>
          </div>

          {/* Summary */}
          <div className="h-fit rounded-xl bg-white p-6 shadow-sm border border-gray-200">
            <h2 className="mb-4 text-xl font-semibold">Price Details</h2>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>$120 x 5 nights</span>
                <span>$600</span>
              </div>
              <div className="flex justify-between">
                <span>Cleaning fee</span>
                <span>$30</span>
              </div>
              <div className="flex justify-between">
                <span>Service fee</span>
                <span>$50</span>
              </div>

              <hr />

              <div className="flex justify-between text-base font-bold text-gray-900">
                <span>Total (USD)</span>
                <span>$680</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
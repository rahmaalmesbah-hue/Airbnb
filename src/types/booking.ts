export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  location?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  guestName: string;
  guestEmail: string;
  bookingDate: string;
}

export interface BookingDraft {
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
}

export const BOOKINGS_KEY = "myBookings";

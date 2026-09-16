export interface Listing {
  id: string;
  title: string;
  category: string;
  location: string;
  rating: number;
  price: number;
  date: string;
  imageUrl: string;
  isGuestFavorite?: boolean;
  lat: number;
  lng: number;
}

export const listingsData: Listing[] = [
  // --- 1. Villas 🏡 ---
  {
    id: '1',
    title: 'Luxury Oceanfront Villa 🌊',
    category: 'Villas 🏡',
    location: 'Malibu, California',
    rating: 4.95,
    price: 450,
    date: 'Oct 12 – 17',
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
    isGuestFavorite: true,
    lat: 34.0259,
    lng: -118.7798,
  },
  {
    id: '9',
    title: 'Cliffside Infinity Villa 🌅',
    category: 'Villas 🏡',
    location: 'Mykonos, Greece',
    rating: 4.97,
    price: 580,
    date: 'Oct 15 – 20',
    imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    isGuestFavorite: true,
    lat: 37.4467,
    lng: 25.3289,
  },

  // --- 2. Apartments 🏢 ---
  {
    id: '2',
    title: 'Modern Sunset Apartment 🌅',
    category: 'Apartments 🏢',
    location: 'Santorini, Greece',
    rating: 4.88,
    price: 190,
    date: 'Oct 20 – 25',
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
    isGuestFavorite: false,
    lat: 36.3932,
    lng: 25.4615,
  },
  {
    id: '10',
    title: 'Luxury High-Rise Penthouse 🏙️',
    category: 'Apartments 🏢',
    location: 'New York, USA',
    rating: 4.92,
    price: 380,
    date: 'Nov 12 – 18',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    isGuestFavorite: true,
    lat: 40.7128,
    lng: -74.006,
  },

  // --- 3. Cabins 🪵 ---
  {
    id: '3',
    title: 'Cozy Wooden Cabin & Hot Tub 🌲',
    category: 'Cabins 🪵',
    location: 'Aspen, Colorado',
    rating: 4.93,
    price: 275,
    date: 'Nov 5 – 10',
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    isGuestFavorite: false,
    lat: 39.1911,
    lng: -106.8175,
  },
  {
    id: '11',
    title: 'A-Frame Mountain Forest Cabin 🌲',
    category: 'Cabins 🪵',
    location: 'Banff, Canada',
    rating: 4.89,
    price: 220,
    date: 'Dec 5 – 10',
    imageUrl: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
    isGuestFavorite: false,
    lat: 51.1784,
    lng: -115.5708,
  },

  // --- 4. Chalets 🏔️ ---
  {
    id: '4',
    title: 'Historic Royal Chalet ❄️',
    category: 'Chalets 🏔️',
    location: 'Edinburgh, Scotland',
    rating: 4.82,
    price: 340,
    date: 'Nov 1 – 6',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    isGuestFavorite: true,
    lat: 55.9533,
    lng: -3.1883,
  },
  {
    id: '12',
    title: 'Alpine Ski Chalet & Sauna 🎿',
    category: 'Chalets 🏔️',
    location: 'Zermatt, Switzerland',
    rating: 4.96,
    price: 490,
    date: 'Nov 20 – 26',
    imageUrl: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80',
    isGuestFavorite: true,
    lat: 45.9765,
    lng: 7.7491,
  },

  // --- 5. Beachfront 🏖️ ---
  {
    id: '5',
    title: 'Tropical Beachfront Paradise 🏝️',
    category: 'Beachfront 🏖️',
    location: 'Bali, Indonesia',
    rating: 4.98,
    price: 520,
    date: 'Dec 1 – 8',
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
    isGuestFavorite: true,
    lat: -8.4095,
    lng: 115.1889,
  },
  {
    id: '13',
    title: 'Overwater Ocean Bungalow 🐚',
    category: 'Beachfront 🏖️',
    location: 'Maldives',
    rating: 4.99,
    price: 680,
    date: 'Dec 10 – 17',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    isGuestFavorite: true,
    lat: 3.2028,
    lng: 73.2207,
  },

  // --- 6. Castles 🏰 ---
  {
    id: '6',
    title: 'Grand Medieval Castle Experience 👑',
    category: 'Castles 🏰',
    location: 'Tuscany, Italy',
    rating: 4.91,
    price: 750,
    date: 'Nov 15 – 22',
    imageUrl: 'https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&w=800&q=80',
    isGuestFavorite: false,
    lat: 43.7711,
    lng: 11.2486,
  },
  {
    id: '14',
    title: 'Fairytale Medieval Fortress ⚔️',
    category: 'Castles 🏰',
    location: 'Bavaria, Germany',
    rating: 4.98,
    price: 820,
    date: 'Nov 22 – 28',
    imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    isGuestFavorite: false,
    lat: 47.5576,
    lng: 10.7498,
  },

  // --- 7. Hotels 🏨 ---
  {
    id: '7',
    title: 'Modern City Hotel Suite 🏙️',
    category: 'Hotels 🏨',
    location: 'Tokyo, Japan',
    rating: 4.86,
    price: 210,
    date: 'Oct 28 – Nov 3',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    isGuestFavorite: true,
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    id: '15',
    title: 'Grand Boutique Palace Hotel 🏛️',
    category: 'Hotels 🏨',
    location: 'Paris, France',
    rating: 4.91,
    price: 410,
    date: 'Oct 25 – 30',
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
    isGuestFavorite: false,
    lat: 48.8566,
    lng: 2.3522,
  },

  // --- 8. Houses 🏠 ---
  {
    id: '8',
    title: 'Charming Countryside House 🌿',
    category: 'Houses 🏠',
    location: 'Cotswolds, UK',
    rating: 4.89,
    price: 310,
    date: 'Nov 10 – 16',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    isGuestFavorite: false,
    lat: 51.833,
    lng: -1.843,
  },
  {
    id: '16',
    title: 'Traditional Japanese Machiya 🎋',
    category: 'Houses 🏠',
    location: 'Kyoto, Japan',
    rating: 4.94,
    price: 290,
    date: 'Nov 8 – 14',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    isGuestFavorite: true,
    lat: 35.0116,
    lng: 135.7681,
  },
];
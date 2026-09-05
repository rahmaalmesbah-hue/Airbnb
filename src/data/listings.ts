export interface Listing {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
}

export const listingsData: Listing[] = [
  {
    id: 1,
    title: "شقة مميزة في الإسكندرية عالبحر مباشرة",
    location: "الإسكندرية، مصر",
    price: 1200,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
  },
  {
    id: 2,
    title: "استوديو هادئ ومريح في قلب المدينة",
    location: "القاهرة، مصر",
    price: 850,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
  },
  {
    id: 3,
    title: "فيلا واسعة مع حمام سباحة خاص",
    location: "الجونة، مصر",
    price: 3500,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"
  }
];
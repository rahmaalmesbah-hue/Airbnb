import type { Listing } from "../data/listingsData";

interface PropertyCardProps {
  listing: Listing;
  isFavorite: boolean;
  onToggleWishlist: (id: string) => void;
  onClick: () => void;
}

export function PropertyCard({ listing, isFavorite, onToggleWishlist, onClick }: PropertyCardProps) {
  return (
    <div className="flex flex-col gap-2 group cursor-pointer" onClick={onClick}>
      <div className="aspect-square w-full relative overflow-hidden rounded-xl">
        <img
          src={listing.imageUrl}
          alt={listing.title}
          className="object-cover h-full w-full group-hover:scale-105 transition duration-300"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(listing.id);
          }}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:scale-110 transition cursor-pointer z-10"
        >
          <svg
            className={`w-6 h-6 stroke-white stroke-[2] ${
              isFavorite ? "fill-[#FF385C] stroke-[#FF385C]" : "fill-black/40"
            }`}
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        {listing.isGuestFavorite && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
            Guest favorite
          </div>
        )}
      </div>

      <div className="flex flex-col text-sm mt-1">
        <div className="flex justify-between items-center font-bold text-gray-900">
          <span className="truncate">{listing.location}</span>
          <span className="flex items-center gap-1 font-normal text-xs">★ {listing.rating}</span>
        </div>
        <p className="text-gray-500 text-xs">{listing.title}</p>
        <p className="text-gray-500 text-xs">{listing.date}</p>
        <p className="mt-1 font-semibold text-gray-900">
          ${listing.price} <span className="font-normal text-gray-500">night</span>
        </p>
      </div>
    </div>
  );
}

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { CategoryFilter } from "../Components/CategoryFilter";
import { PropertyCard } from "../Components/PropertyCard";
import { MapModal } from "../Components/MapModal";
import { listingsData } from "../data/listingsData";
import { useAuth } from "../context/AuthContext";

export function Home() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [activeModal, setActiveModal] = useState<"wishlist" | "host" | null>(null);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id],
    );
  };

  const filteredListings = useMemo(() => {
    return listingsData.filter((listing) => {
      const matchesSearch =
        listing.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.title.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        listing.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans flex flex-col">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
        onLogout={logout}
        onOpenWishlist={() => setActiveModal("wishlist")}
        onOpenBookings={() => navigate("/profile")}
        onOpenHostModal={() => setActiveModal("host")}
        onOpenMapModal={() => setIsMapModalOpen(true)}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-8 flex-1">
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredListings.map((listing) => (
              <PropertyCard
                key={listing.id}
                listing={listing}
                isFavorite={wishlist.includes(listing.id)}
                onToggleWishlist={toggleWishlist}
                onClick={() => navigate(`/property/${listing.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-4xl mb-3">🔍</span>
            <h3 className="text-lg font-bold text-gray-900">No properties found</h3>
            <p className="text-gray-500 text-sm mt-1">
              Try searching for something else or reset your categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        listings={filteredListings}
      />

      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold p-1 rounded-full hover:bg-gray-100 cursor-pointer"
            >
              ✕
            </button>

            {activeModal === "wishlist" && (
              <div>
                <h2 className="text-2xl font-bold mb-1 flex items-center gap-2">
                  <span>❤️</span> Your Wishlists ({wishlist.length})
                </h2>
                <p className="text-gray-500 text-sm mb-4">Saved stays and villas on your account.</p>

                {wishlist.length > 0 ? (
                  <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-1">
                    {listingsData
                      .filter((item) => wishlist.includes(item.id))
                      .map((listing) => (
                        <button
                          key={listing.id}
                          type="button"
                          onClick={() => {
                            setActiveModal(null);
                            navigate(`/property/${listing.id}`);
                          }}
                          className="w-full border border-gray-200 rounded-xl p-3 flex gap-3 relative bg-white shadow-sm items-center text-left"
                        >
                          <img src={listing.imageUrl} alt={listing.title} className="w-20 h-20 object-cover rounded-lg shrink-0" />
                          <div className="flex flex-col justify-between overflow-hidden flex-1">
                            <div>
                              <h4 className="font-bold text-sm text-gray-900 truncate">{listing.location}</h4>
                              <p className="text-xs text-gray-500 truncate">{listing.title}</p>
                            </div>
                            <p className="font-bold text-sm text-[#FF385C] mt-1">
                              ${listing.price} <span className="text-xs text-gray-500 font-normal">/ night</span>
                            </p>
                          </div>
                        </button>
                      ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50">
                    <p className="font-semibold text-gray-800">Your favorite items will appear here!</p>
                    <p className="text-xs text-gray-500 mt-1">Click the heart icon on any card to add it to your list.</p>
                  </div>
                )}
              </div>
            )}

            {activeModal === "host" && (
              <div>
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <span>🏡</span> Airbnb it with Airbnb setup
                </h2>
                <p className="text-gray-500 text-sm mb-4">Earn money by renting your apartment or villa.</p>
                <div className="bg-red-50 text-[#FF385C] p-4 rounded-xl font-bold text-lg mb-4 text-center">
                  You could earn $1,250 / 7 nights
                </div>
                <button
                  onClick={() => {
                    setActiveModal(null);
                  }}
                  className="w-full bg-[#FF385C] text-white font-bold py-3 rounded-xl hover:bg-[#e00b41] transition cursor-pointer"
                >
                  Start Setup Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="border-t border-gray-200 py-4 text-center text-xs text-gray-500 bg-white">
        © 2026 Airbnb Clone, Inc. · Privacy · Terms · Sitemap
      </footer>
    </div>
  );
}

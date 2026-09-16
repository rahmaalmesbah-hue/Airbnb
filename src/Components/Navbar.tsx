import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  user: string | null;
  onLogout: () => void;
  onOpenWishlist: () => void;
  onOpenBookings: () => void;
  onOpenHostModal: () => void;
  onOpenMapModal: () => void;
}

export function Navbar({
  searchQuery,
  setSearchQuery,
  user,
  onLogout,
  onOpenWishlist,
  onOpenBookings,
  onOpenHostModal,
  onOpenMapModal,
}: NavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 py-4 flex flex-row items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 cursor-pointer text-[#FF385C]">
          <svg className="w-9 h-9 fill-current" viewBox="0 0 32 32">
            <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 2.472.96 3.396l.011.315c0 4.408-3.6 8.006-8.006 8.006-2.583 0-4.909-1.229-6.42-3.141l-.074-.097-.074.097c-1.511 1.912-3.837 3.141-6.42 3.141-4.406 0-8.006-3.598-8.006-8.006 0-1.168.272-2.27.796-3.486l.245-.521 7.245-15.19C9.972 1.963 11.427 1 13.435 1H16zm0 3h-2.565c-.96 0-1.785.45-2.617 2.112l-7.245 15.19c-.389.815-.573 1.488-.573 2.198 0 2.76 2.246 5.006 5.006 5.006 2.033 0 3.816-1.205 4.582-3.031l.247-.649.336-.884h3.66l.336.884.247.649c.766 1.826 2.549 3.031 4.582 3.031 2.76 0 5.006-2.246 5.006-5.006 0-.649-.164-1.29-.482-2.028l-.164-.343-7.1-14.836C17.785 4.45 16.96 4 16 4zm0 13a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z" />
          </svg>
          <span className="font-bold text-xl hidden sm:block tracking-tight">airbnb</span>
        </Link>

        <div className="border border-gray-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition cursor-pointer flex items-center gap-3 w-full max-w-xs sm:max-w-md">
          <input
            type="text"
            placeholder="Search villas, hotels, city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm font-medium outline-none bg-transparent placeholder-gray-500"
          />
          <div className="bg-[#FF385C] p-2 rounded-full text-white shrink-0">
            <svg className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24" fill="none">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-2 relative">
          <button
            onClick={onOpenHostModal}
            className="hidden md:block text-sm font-semibold py-2 px-3 rounded-full hover:bg-gray-100 transition cursor-pointer"
          >
            Airbnb your home
          </button>

          <button
            onClick={onOpenMapModal}
            className="p-2 hover:bg-gray-100 rounded-full transition cursor-pointer"
            title="Open World Map"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
          </button>

          <div
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 border border-gray-300 rounded-full p-1.5 pl-3 hover:shadow-md transition cursor-pointer bg-white"
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <div className="bg-gray-600 text-white rounded-full p-1 w-7 h-7 flex items-center justify-center text-xs font-bold">
              {user ? user.charAt(0).toUpperCase() : "👤"}
            </div>
          </div>

          {showDropdown && (
            <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 text-sm">
              {user ? (
                <>
                  <div className="px-4 py-2 border-b border-gray-100 font-bold text-gray-800">Hello, {user}! 👋</div>
                  <button
                    onClick={() => {
                      onOpenWishlist();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition cursor-pointer"
                  >
                    Wishlists / Favorites ❤️
                  </button>
                  <button
                    onClick={() => {
                      onOpenBookings();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition cursor-pointer"
                  >
                    Bookings 🧳
                  </button>
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition cursor-pointer"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600 font-medium transition cursor-pointer"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    onClick={() => setShowDropdown(false)}
                    className="block w-full text-left px-4 py-2.5 font-bold hover:bg-gray-50 transition"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setShowDropdown(false)}
                    className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 transition border-b border-gray-100"
                  >
                    Log in
                  </Link>
                  <button
                    onClick={() => {
                      onOpenHostModal();
                      setShowDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 transition cursor-pointer"
                  >
                    Airbnb your home
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

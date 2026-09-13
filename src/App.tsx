import { useMemo, useState } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom"

import Navbar from "./Components/Navbar"
import CategoryFilter from "./Components/CategoryFilter"
import PropertyCard from "./Components/PropertyCard"
import { listingsData } from "./listingsData"
import PropertyDetails from "./Components/PropertyDetails"
import Login from "./Components/Login"
import Signup from "./Components/Signup"
import Checkout from "./Components/Checkout"

// ==================== HOME PAGE ====================

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const navigate = useNavigate()

  const filteredListings = useMemo(() => {
    if (selectedCategory === "All") {
      return listingsData
    }

    return listingsData.filter(
      (listing) => listing.category === selectedCategory
    )
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <Navbar />

      {/* Categories */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-5 py-8">

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-semibold text-gray-900">
            Explore stays
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Find your perfect place to stay
          </p>
        </div>

        {/* Property Grid */}
        <section className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {filteredListings.map((listing) => (
            <PropertyCard
              key={listing.id}
              listing={listing}
              onClick={() => {
                navigate(`/property/${listing.id}`)
              }}
            />
          ))}

        </section>

        {/* No Results */}
        {filteredListings.length === 0 && (
          <div className="py-20 text-center">

            <h2 className="text-xl font-semibold">
              No properties found
            </h2>

            <p className="mt-2 text-gray-500">
              Try another category.
            </p>

          </div>
        )}

      </main>
    </div>
  )
}

// ==================== APP ====================

function App() {
  return (
    <BrowserRouter>

      <Routes>
        
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Property & Booking Pages */}
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
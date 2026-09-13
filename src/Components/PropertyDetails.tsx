import { property } from "./property";
import ImageGallery from "./ImageGallery";
import PropertyInfo from "./PropertyInfo";
import PropertyDescription from "./PropertyDescription";
import Amenities from "./Amenities";
import BookingCard from "./BookingCard";

const PropertyDetails = () => {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8">

        {/* Property Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            {property.title}
          </h1>

          <div className="mt-2 flex gap-2 text-sm">
            <span>
              ★ {property.rating}
            </span>

            <span className="underline">
              {property.reviews} reviews
            </span>

            <span>·</span>

            <span className="underline">
              {property.location}
            </span>
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery images={property.images} />

        {/* Content */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">

          {/* Left Side */}
          <div className="lg:col-span-2">

            <PropertyInfo
              host={property.host}
              guests={property.guests}
              bedrooms={property.bedrooms}
              beds={property.beds}
              bathrooms={property.bathrooms}
            />

            <PropertyDescription
              description={property.description}
            />

            <Amenities
              amenities={property.amenities}
            />

          </div>

          {/* Right Side */}
          <BookingCard
            price={property.price}
          />

        </div>
      </div>
    </main>
  );
};

export default PropertyDetails;
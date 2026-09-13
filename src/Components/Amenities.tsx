interface AmenitiesProps {
  amenities: string[];
}

const Amenities = ({ amenities }: AmenitiesProps) => {
  return (
    <section className="py-8">
      <h2 className="text-xl font-semibold">
        What this place offers
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-5">
        {amenities.map((amenity) => (
          <div key={amenity} className="flex gap-3">
            <span>✓</span>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Amenities;
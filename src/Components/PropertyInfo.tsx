interface PropertyInfoProps {
  host: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

const PropertyInfo = ({
  host,
  guests,
  bedrooms,
  beds,
  bathrooms,
}: PropertyInfoProps) => {
  return (
    <div className="border-b pb-8">
      <h2 className="text-xl font-semibold">
        Entire apartment hosted by {host}
      </h2>

      <p className="mt-2 text-gray-600">
        {guests} guests · {bedrooms} bedrooms · {beds} beds ·{" "}
        {bathrooms} bathroom
      </p>
    </div>
  );
};

export default PropertyInfo;
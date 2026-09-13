import { useState } from "react";

interface PropertyDescriptionProps {
  description: string;
}

const PropertyDescription = ({
  description,
}: PropertyDescriptionProps) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="border-b py-8">
      <h2 className="text-xl font-semibold">
        About this place
      </h2>

      <p
        className={`mt-4 leading-7 text-gray-600 ${
          !showMore ? "line-clamp-3" : ""
        }`}
      >
        {description}
      </p>

      <button
        onClick={() => setShowMore(!showMore)}
        className="mt-4 font-semibold underline"
      >
        {showMore ? "Show less" : "Show more"}
      </button>
    </section>
  );
};

export default PropertyDescription;
import { useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Review } from "../data/property";
import { getListingById, getPropertyById } from "../data/catalog";
import { Amenities } from "../Components/Amenities";
import { BookingCard } from "../Components/BookingCard";
import { ImageGallery } from "../Components/ImageGallery";
import { PropertyDescription } from "../Components/PropertyDescription";
import { PropertyInfo } from "../Components/PropertyInfo";
import type { BookingDraft } from "../types/booking";

export function PropertyDetailsPage() {
  const navigate = useNavigate();
  const { id = "" } = useParams();
  const property = getPropertyById(id);
  const listing = getListingById(id);

  const [reviews, setReviews] = useState<Review[]>(property?.reviewsList ?? []);
  const [newComment, setNewComment] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="text-2xl font-bold">Property not found</h1>
        <Link to="/" className="text-[#FF385C] font-semibold underline">
          Back to stays
        </Link>
      </div>
    );
  }

  const handleReserve = (data: BookingDraft) => {
    navigate("/checkout", {
      state: {
        property,
        listingImage: listing?.imageUrl ?? property.images[0],
        bookingData: data,
      },
    });
  };

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !newAuthor.trim()) return;

    const newRev: Review = {
      id: Date.now().toString(),
      author: newAuthor,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "Just now",
      comment: newComment,
    };

    setReviews([newRev, ...reviews]);
    setNewComment("");
    setNewAuthor("");
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-8 space-y-8">
      <button
        onClick={() => navigate("/")}
        className="mb-4 flex items-center gap-2 font-semibold text-gray-700 hover:text-black transition cursor-pointer"
      >
        ← Back
      </button>

      <PropertyInfo property={property} />
      <ImageGallery images={property.images} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-b border-gray-200 pb-12">
        <div className="lg:col-span-2 space-y-8">
          <PropertyDescription property={property} />
          <Amenities amenities={property.amenities} />
        </div>
        <div>
          <BookingCard property={property} onReserve={handleReserve} />
        </div>
      </div>

      <div id="reviews-section" className="py-8 space-y-6">
        <h3 className="text-2xl font-bold text-gray-900">
          ★ {property.rating} · {reviews.length} Reviews
        </h3>

        <form onSubmit={handleAddReview} className="bg-gray-50 p-4 rounded-2xl space-y-3 max-w-lg border border-gray-200">
          <h4 className="font-bold text-sm text-gray-800">Leave a review</h4>
          <input
            type="text"
            placeholder="Your Name"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
            className="w-full p-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none"
          />
          <textarea
            placeholder="Write your review here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 text-xs border border-gray-300 rounded-lg bg-white focus:outline-none"
            rows={3}
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-gray-800 transition cursor-pointer"
          >
            Submit Review
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="border border-gray-100 rounded-2xl p-4 bg-white shadow-sm space-y-2">
              <div className="flex items-center gap-3">
                <img src={rev.avatar} alt={rev.author} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h5 className="font-bold text-sm text-gray-900">{rev.author}</h5>
                  <span className="text-xs text-gray-400">{rev.date}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

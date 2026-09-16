import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <div className="relative mb-8">
      {/* Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden shadow-sm">
        <div className="md:col-span-2 aspect-[4/3] md:aspect-auto">
          <img
            src={images[0]}
            alt="Main"
            onClick={() => { setSelectedIdx(0); setIsOpen(true); }}
            className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition duration-300"
          />
        </div>
        <div className="hidden md:grid col-span-2 grid-cols-2 gap-2">
          {images.slice(1, 5).map((img, idx) => (
            <div key={idx} className="aspect-square bg-gray-100 overflow-hidden">
              <img
                src={img}
                alt={`Sub ${idx}`}
                onClick={() => { setSelectedIdx(idx + 1); setIsOpen(true); }}
                className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 border border-gray-300 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm shadow-md hover:bg-white transition cursor-pointer flex items-center gap-2"
      >
        <span>📷</span> Show all photos ({images.length})
      </button>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 animate-fadeIn">
          <div className="flex justify-between items-center text-white">
            <span className="text-sm font-semibold">
              Photo {selectedIdx + 1} of {images.length}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold p-2 hover:bg-white/10 rounded-full cursor-pointer text-white"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4">
            <img
              src={images[selectedIdx]}
              alt="Expanded view"
              className="max-h-[80vh] max-w-full object-contain rounded-lg"
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => setSelectedIdx((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-xl text-sm font-bold cursor-pointer"
            >
              ← Previous
            </button>
            <button
              onClick={() => setSelectedIdx((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-xl text-sm font-bold cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
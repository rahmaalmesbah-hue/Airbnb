interface ImageGalleryProps {
  images: string[];
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="grid h-[500px] grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
      <div className="col-span-2 row-span-2">
        <img
          src={images[0]}
          alt="Main property"
          className="h-full w-full object-cover"
        />
      </div>

      {images.slice(1, 5).map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`Property ${index + 2}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
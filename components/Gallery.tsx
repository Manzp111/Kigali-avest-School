"use client";

import { useEffect, useState } from "react";
import ImageModal from "@/components/ImageModal"; // Ensure this import path is correct

// Define the shape based on your API response
type GalleryImage = {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  type: string;
  published: boolean;
};

export function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        // Fetching from your local API
        const res = await fetch("/api/gallery?type=gallery&published=true");
        if (!res.ok) throw new Error("Failed to fetch gallery");
        
        const data = await res.json();
        
        // Safety check to ensure we only show what we want
        const filtered = Array.isArray(data) 
          ? data.filter((img: GalleryImage) => img.type === "gallery" && img.published)
          : [];
          
        setImages(filtered);
      } catch (error) {
        console.error("Gallery Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section id="gallery" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-blue-900 mb-4 font-bold">Our School Gallery</h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-4"></div>
          <p className="text-gray-700 italic">A glimpse into life at Kigali Harvest School</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No gallery images available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
                onClick={() => setSelectedImage({ src: image.imageUrl, alt: image.title })}
              >
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay with Title/Subtitle */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-lg">{image.title}</h3>
                  {image.subtitle && (
                    <p className="text-blue-100 text-sm line-clamp-2">{image.subtitle}</p>
                  )}
                </div>

                {/* Zoom Icon */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-md rounded-full p-2 border border-white/30">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <ImageModal
          src={selectedImage.src}
          alt={selectedImage.alt}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
}
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ImageModal from "@/components/ImageModal";
import { apiClient } from "@/lib/utils/apiClient";

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
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("page", "1");
      params.append("limit", "15"); // Only fetch the first 6 pictures
      params.append("type", "gallery");
      params.append("published", "true");
      
      const res = await apiClient(`/api/gallery?${params.toString()}`);

      if (res && res.success) {
        setImages(res.data || []);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error("Gallery Sync Error:", error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-blue-900 mb-4 font-bold tracking-tight">Our School Gallery</h2>
          <div className="w-24 h-1.5 bg-[#E31E24] mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium italic">A glimpse into life at Kigali Harvest School</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004795]"></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synchronizing Media...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold uppercase text-sm tracking-widest">
              No gallery images available at the moment.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative overflow-hidden rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white border border-slate-100"
                  onClick={() => setSelectedImage({ src: image.imageUrl, alt: image.title })}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#004795]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-8">
                    <h3 className="text-white font-black text-lg  tracking-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {image.title}
                    </h3>
                    {image.subtitle && (
                      <p className="text-blue-100 text-xs mt-2 line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        {image.subtitle}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* View More Button at the bottom */}
            <div className="mt-16 flex justify-center">
              <Link
                href="/gallery"
                className="px-10 py-4 bg-red-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 active:scale-95"
              >
                View More Pictures
              </Link>
            </div>
          </>
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
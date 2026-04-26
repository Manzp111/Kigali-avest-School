"use client";

import { useEffect, useState } from "react";
import ImageModal from "@/components/ImageModal";


type GalleryImage = {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  type: string;
  published: boolean;
};

type PaginationData = {
  page: number;
  limit: number;
  total: string | number;
  totalPages: number;
};

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchGallery();
  }, [currentPage]);
 const fetchGallery = async () => {
    try {
      setLoading(true);
      
      // 1. Build the query string
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: "12",
        type: "gallery",
        published: "true"
      });

      // 2. Use standard browser fetch
      const response = await fetch(`/api/gallery?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Explicitly ensuring no credentials/auth headers are attached if needed
        cache: 'no-store' 
      });

      const res = await response.json();

      if (res && res.success) {
        setImages(res.data || []);
        setPagination(res.pagination);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error("Gallery Public Fetch Error:", error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    // min-h-screen ensures footer stays at bottom if content is short
    // pt-24 ensures the content starts AFTER the fixed header
    <main className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-blue-900 mb-4 font-bold uppercase tracking-tight">Full School Gallery</h2>
          <div className="w-24 h-1.5 bg-[#E31E24] mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium italic">Explore all moments from Kigali Harvest School</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004795]"></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synchronizing Media...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200 shadow-sm">
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
                    <h3 className="text-white font-black text-lg uppercase tracking-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
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

            {pagination && pagination.totalPages > 1 && (
              <div className="mt-16 flex justify-center items-center gap-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-[#004795] hover:text-white disabled:opacity-30 transition-all shadow-sm"
                >
                  Previous
                </button>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Page {currentPage} of {pagination.totalPages}
                </span>
                <button
                  disabled={currentPage === pagination.totalPages}
                  onClick={() => setCurrentPage(p => p + 1)}
                  className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-[10px] font-black uppercase tracking-widest hover:bg-[#004795] hover:text-white disabled:opacity-30 transition-all shadow-sm"
                >
                  Next
                </button>
              </div>
            )}
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
    </main>
  );
}
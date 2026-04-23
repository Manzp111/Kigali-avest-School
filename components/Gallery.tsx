"use client";
import { useState } from 'react';
import { ImageModal } from './ImageModal';

const galleryImages = [
  { src: '/imports/10.png', alt: 'Students in uniform studying' },
  { src: '/imports/DSC_3831.jpg', alt: 'School trip to airport' },
  { src: '/imports/DSC_3959.jpg', alt: 'Students at airport arrival' },
  { src: '/imports/Screenshot_2026-04-01_173815.png', alt: 'Graduation ceremony' },
  { src: '/imports/4.png', alt: 'School building exterior' },
  { src: '/imports/2.png', alt: 'Students singing at event' },
  { src: '/imports/3.png', alt: 'Students in yellow uniforms' },
  { src: '/imports/8.png', alt: 'Traditional dance performance' },
  { src: '/imports/WhatsApp_Image_2026-04-13_at_12.24.22.jpeg', alt: 'School trip to Akagera National Park' },
  { src: '/imports/WhatsApp_Image_2026-04-13_at_12.25.26.jpeg', alt: 'Students by the lake' },
  { src: '/imports/WhatsApp_Image_2026-04-13_at_12.09.13.jpeg', alt: 'Students enjoying rides' },
  { src: '/imports/WhatsApp_Image_2026-04-13_at_12.09.18.jpeg', alt: 'Students swimming fun day' },
  { src: '/imports/1.png', alt: 'Graduation ceremony close-up' },
  { src: '/imports/6.png', alt: 'Graduate students in gowns' },
  { src: '/imports/Screenshot_2026-04-16_125715.png', alt: 'Graduate speaking at ceremony' }
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section id="gallery" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-blue-900 mb-4">Our School Gallery</h2>
          <div className="w-24 h-1 bg-green-500 mx-auto mb-4"></div>
          <p className="text-gray-700">A glimpse into life at Kigali Harvest School</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4">{image.alt}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
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

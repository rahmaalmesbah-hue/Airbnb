import React, { useEffect, useRef } from 'react';
import type { Listing } from '../data/listingsData';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  listings: Listing[];
}

export const MapModal: React.FC<MapModalProps> = ({ isOpen, onClose, listings }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Dynamically inject Leaflet CSS & JS without requiring extra NPM packages
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    const initMap = async () => {
      if (!(window as any).L) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }

      const L = (window as any).L;

      if (mapContainerRef.current && !mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current).setView([25, 10], 2);
        mapInstanceRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        listings.forEach((listing) => {
          if (listing.lat && listing.lng) {
            const redIcon = L.divIcon({
              className: 'custom-map-pin',
              html: `
                <div style="
                  background-color: #FF385C;
                  color: white;
                  font-weight: bold;
                  padding: 4px 10px;
                  border-radius: 20px;
                  border: 2px solid white;
                  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                  font-size: 12px;
                  white-space: nowrap;
                  cursor: pointer;
                  display: flex;
                  align-items: center;
                  gap: 4px;
                ">
                  📍 $${listing.price}
                </div>
              `,
              iconSize: [70, 30],
              iconAnchor: [35, 15],
            });

            const popupContent = `
              <div style="width: 190px; text-align: left; font-family: sans-serif;">
                <img src="${listing.imageUrl}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 10px; margin-bottom: 6px;" />
                <h4 style="font-weight: bold; font-size: 13px; margin: 0 0 2px 0; color: #111;">${listing.location}</h4>
                <p style="font-size: 11px; color: #666; margin: 0;">${listing.title}</p>
                <p style="font-weight: 800; color: #FF385C; margin: 6px 0 0 0; font-size: 13px;">$${listing.price} / night</p>
              </div>
            `;

            L.marker([listing.lat, listing.lng], { icon: redIcon })
              .addTo(map)
              .bindPopup(popupContent);
          }
        });
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen, listings]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-6xl h-[85vh] overflow-hidden shadow-2xl flex flex-col relative">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white z-10">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌍</span>
            <div>
              <h2 className="font-bold text-lg text-gray-900">Explore Properties on World Map</h2>
              <p className="text-xs text-gray-500">Click red markers to view available stay details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition font-bold text-gray-600 text-sm cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        {/* Map Container */}
        <div className="flex-1 w-full h-full relative">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};
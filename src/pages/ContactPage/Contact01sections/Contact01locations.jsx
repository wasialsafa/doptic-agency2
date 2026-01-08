import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- Constants ---
const FONT_INTER = 'Inter Variable, sans-serif';
const FONT_CASLON = 'Libre Caslon Text, serif';

// --- Color Classes ---
const textMain = "text-[#0e0e0e] dark:text-[#e2e2e2]";
const textSub = "text-[#0E0E0EB2] dark:text-[#E2E2E2]/70";

// Helper to animate map
const MapUpdater = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
};

const OfficeLocations = () => {
  const locations = [
    {
      id: 'sydney',
      city: 'Sydney',
      address: '123 Sample St, Sydney NSW 2000 AU',
      coords: [-33.8688, 151.2093], 
    },
    {
      id: 'newyork',
      city: 'New York',
      address: '123 Sample St, New York NY 10000 USA',
      coords: [40.7128, -74.0060], 
    },
    {
      id: 'london',
      city: 'London',
      address: '61 Union Street, Dunstable, England',
      coords: [51.5074, -0.1278], 
    }
  ];

  const [activeId, setActiveId] = useState(locations[0].id);
  const activeLocation = locations.find(l => l.id === activeId);

  return (
    <div 
      className="bg-bg-light dark:bg-bg-dark min-h-screen flex justify-center w-full transition-colors duration-300"
      style={{ fontFamily: FONT_INTER }}
    >
      
      {/* Main Container - Responsive */}
      <div className="relative box-border w-full mx-auto flex flex-col">
        <div className="w-full lg:max-w-[1440px] mx-auto px-6 py-12 lg:py-[120px] lg:px-[75px]">
          
          {/* Header */}
          <div className="flex flex-col justify-between w-full lg:w-[768px] h-auto lg:h-[156px] mb-10 lg:mb-[80px] gap-4 lg:gap-3">
            <h1 className="flex flex-wrap items-baseline gap-2 lg:gap-3 m-0">
              <span 
                className={`font-weight-[500] text-4xl lg:text-[72px] leading-tight tracking-tight ${textMain}`}
                style={{ fontFamily: FONT_INTER }}
              >
                Our office
              </span>
              <span 
                className={`italic font-weight-[400] text-4xl lg:text-[72px] leading-tight ${textMain}`}
                style={{ fontFamily: FONT_CASLON }}
              >
                Locations
              </span>
            </h1>
            <p 
              className={`text-sm lg:text-base leading-relaxed max-w-xl m-0 ${textSub}`}
              style={{ fontFamily: FONT_INTER }}
            >
              Getting started is made simple and transparent right from day one. We guide you through every step with us.
            </p>
          </div>

          {/* Content Area - Flex Column on Mobile, Row on Desktop */}
          <div className="flex flex-col-reverse lg:flex-row w-full lg:w-[1290px] h-auto lg:h-[369px] gap-8 lg:gap-[72px]">
            
            {/* LEFT COLUMN: Locations List */}
            <div className="flex flex-col justify-between w-full lg:w-[500px] h-auto lg:h-full gap-4 lg:gap-0">
              {locations.map((loc) => {
                const isActive = activeId === loc.id;
                
                return (
                  <div 
                    key={loc.id}
                    onClick={() => setActiveId(loc.id)}
                    className={`
                      flex flex-col justify-center cursor-pointer transition-all duration-300 box-border
                      w-full lg:flex-1
                      py-4 px-4 lg:py-[20px] lg:px-[30px]
                      border-l-2
                    `}
                    style={{
                      borderColor: isActive ? '#FF4422' : 'transparent',
                      opacity: isActive ? 1 : 0.3,
                      // Optional: subtle hover effect if desired, currently transparent
                      backgroundColor: 'transparent'
                    }}
                  >
                    <h3 
                      className={`text-xl lg:text-[32px] tracking-tight mb-1 m-0 ${textMain}`}
                      style={{ 
                        fontFamily: FONT_INTER,
                        fontWeight: isActive ? 600 : 400 
                      }}
                    >
                      {loc.city}
                    </h3>
                    
                    <p 
                      className={`text-sm lg:text-base m-0 truncate ${textSub}`}
                      style={{ fontFamily: FONT_INTER }}
                    >
                      {loc.address}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: Map */}
            <div className="w-full h-[300px] lg:w-[726px] lg:h-[369px] rounded-lg lg:rounded-none overflow-hidden bg-gray-200 dark:bg-gray-800">
              <MapContainer 
                center={activeLocation.coords} 
                zoom={13} 
                style={{ width: '100%', height: '100%' }}
                zoomControl={true}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapUpdater center={activeLocation.coords} zoom={13} />
                <Marker position={activeLocation.coords}>
                  <Popup>{activeLocation.address}</Popup>
                </Marker>
              </MapContainer>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeLocations;
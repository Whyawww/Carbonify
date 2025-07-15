'use client';

import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useEffect } from 'react';

interface EcoPoint {
  id: number;
  name: string;
  category: string;
  address: string;
  position: [number, number];
}

interface MapProps {
  points: EcoPoint[];
  userLocation: [number, number] | null;
  radiusInKm: number;
}

const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [38, 38],
});

const userIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30],
});

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

function getZoomLevel(radiusInKm: number) {
  if (radiusInKm <= 2) return 14;
  if (radiusInKm <= 5) return 13;
  if (radiusInKm <= 10) return 12;
  if (radiusInKm <= 25) return 11;
  return 10;
}

const Map = ({ points, userLocation, radiusInKm }: MapProps) => {
  const mapCenter = userLocation || [-6.26, 106.8];
  
  const zoomLevel = getZoomLevel(radiusInKm);

  return (
    <MapContainer
      center={mapCenter}
      zoom={zoomLevel} 
      style={{ height: '100%', width: '100%', borderRadius: 'inherit' }}
    >
      <ChangeView center={mapCenter} zoom={zoomLevel} /> 
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {userLocation && !isNaN(radiusInKm) && radiusInKm > 0 && (
        <>
          <Marker position={userLocation} icon={userIcon}>
            <Popup>Lokasi Anda</Popup>
          </Marker>
          <Circle
            center={userLocation}
            radius={radiusInKm * 1000}
            pathOptions={{ color: 'cyan', fillColor: 'cyan', fillOpacity: 0.1 }}
          />
        </>
      )}

      {points.map((point) => (
        <Marker
          key={point.id}
          position={[point.position[0], point.position[1]]}
          icon={customIcon}
        >
          <Popup>
            <div className="font-sans">
              <h3 className="font-bold text-base mb-1">{point.name}</h3>
              <p className="text-sm text-gray-600">{point.category}</p>
              <p className="text-xs mt-2">{point.address}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
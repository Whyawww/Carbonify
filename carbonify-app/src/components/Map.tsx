'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { ecoPoints } from '@/lib/data';

const customIcon = new Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
  iconSize: [38, 38],
});

const Map = () => {
  return (
    <MapContainer
      center={[-6.26, 106.8]}
      zoom={13}
      style={{ height: '100%', width: '100%', borderRadius: 'inherit' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {ecoPoints.map((point) => (
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
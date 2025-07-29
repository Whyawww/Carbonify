'use client';

import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const InteractiveGlobe = () => {
  const globeEl = useRef<HTMLDivElement>(null);
  const [globeWidth, setGlobeWidth] = useState(0);

  const markersData = [
    { lat: -6.2088, lng: 106.8456, size: 20, color: 'green', city: 'Jakarta' },
    { lat: 51.5074, lng: -0.1278, size: 20, color: 'blue', city: 'London' },
    { lat: 35.6895, lng: 139.6917, size: 20, color: 'red', city: 'Tokyo' },
    { lat: 40.7128, lng: -74.006, size: 20, color: 'yellow', city: 'New York' },
  ];

  useEffect(() => {
    if (globeEl.current) {
      setGlobeWidth(globeEl.current.offsetWidth);
    }
    const handleResize = () => {
      if (globeEl.current) {
        setGlobeWidth(globeEl.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div ref={globeEl} className="w-full h-full">
      <Globe
        width={globeWidth}
        height={globeEl.current?.offsetHeight || 600}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={markersData}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={0}
        pointRadius={0.5}
        pointColor="color"
        labelsData={markersData}
        labelLat="lat"
        labelLng="lng"
        labelText="city"
        labelSize={1.5}
        labelDotRadius={0.5}
        labelColor={() => 'rgba(255, 255, 255, 0.75)'}
        labelResolution={2}
      />
    </div>
  );
};

export default InteractiveGlobe;

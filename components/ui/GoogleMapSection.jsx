'use client';
import React, { useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MarkerItem from './MarkerItem';

const containerStyle = {
  width: '100%',
  height: '80vh',
  borderRadius: 10
};

function GoogleMapSection({ coordinates, listing, item }) {
  const [center, setCenter] = React.useState({
    lat: 13.7563,
    lng: 100.5018,
  });

  const [map, setMap] = React.useState(null);

  useEffect(() => {
    console.log('New coordinates received:', coordinates , listing);
    if (coordinates) {
      setCenter(coordinates);
    }
  }, [coordinates]);

  const onLoad = React.useCallback(function callback(mapInstance) {
    const bounds = new window.google.maps.LatLngBounds(center);
    mapInstance.fitBounds(bounds);
    setMap(mapInstance);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components */}
        {listing.map((item,index)=>(
          <MarkerItem key={index} item={item}/>
        ))}
      </GoogleMap>
    </div>
  );
}

export default GoogleMapSection;

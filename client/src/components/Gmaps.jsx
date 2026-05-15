import { useEffect, useRef, useState } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

// Configure the loader globally
setOptions({
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: "weekly",
});

function Gmaps() {
  const mapRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // OpusCode Dark Blue Theme
  const opusCodeMapStyle = [
    { elementType: "geometry", stylers: [{ color: "#060913" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#4b6c96" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#060913" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#6188bd" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#0d1627" }] },
    { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#4b6c96" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#111b30" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#172642" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#4b6c96" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#182b4a" }] },
    { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#1c345a" }] },
    { featureType: "transit", elementType: "geometry", stylers: [{ color: "#0d1627" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#08101c" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#4b6c96" }] }
  ];

  useEffect(() => {
    const initMap = async () => {

      try {
        const { Map, InfoWindow } = await importLibrary("maps");
        const { Marker } = await importLibrary("marker");

        // The actual location of OpusCode
        const markerLocation = { lat: 50.473138, lng: 14.9418201 };    
        const mapCenter = { lat: 50.473200, lng: 14.9418201 };

        const map = new Map(mapRef.current, {
          center: mapCenter, 
          zoom: 19,
          styles: opusCodeMapStyle,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "cooperative",
        });

        // Create the Marker
        const marker = new Marker({
          map: map,
          position: markerLocation,
          title: "OpusCode",
          // Standard Google Maps built-in drop animation
          animation: window.google.maps.Animation.DROP, 
        });

        // CSS for anims
        if (marker.content) {
            marker.content.classList.add('drop-in-animation');
        }

        // Business Popup (InfoWindow)
        const infoWindow = new InfoWindow({
          content: `
            <div style="color: #060913; padding: 4px; font-family: sans-serif;">
              <h3 style="margin: 0 0 6px 0; font-size: 16px; font-weight: bold; color: #1c345a;">OpusCode.dev</h3>
              <p style="margin: 0 0 4px 0; font-size: 13px;">Spojovací 1172</p>
              <p style="margin: 0; font-size: 13px;">294 01 Bakov nad Jizerou</p>
            </div>
          `,
          ariaLabel: "OpusCode",
        });

        marker.addListener("click", () => {
          infoWindow.open({
            anchor: marker,
            map,
          });
        });
        // auto open
        infoWindow.open({
          anchor: marker,
          map,
        });
        // trigger fade-in (not working)
        setIsLoaded(true);

      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initMap();
  }, []);

  return (
    <div 
      className={`reveal reveal-delay-4 mt-6 w-full h-[400px] rounded-2xl overflow-hidden glass-panel border border-slate-800 relative z-0 transition-opacity duration-1000 ease-in-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <div ref={mapRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} />
    </div>
  );
}

export default Gmaps;
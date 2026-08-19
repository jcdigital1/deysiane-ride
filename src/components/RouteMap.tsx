/// <reference types="google.maps" />
import { useEffect, useRef } from "react";
import type { SelectedPlace } from "@/lib/places-types";

type LatLng = { lat: number; lng: number };

type Props = {
  center: LatLng;
  origin: SelectedPlace | null;
  destination: SelectedPlace | null;
  path: LatLng[];
};

let mapsPromise: Promise<typeof google.maps> | null = null;

function loadMaps(): Promise<typeof google.maps> {
  if (mapsPromise) return mapsPromise;
  mapsPromise = new Promise((resolve, reject) => {
    const key = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"];
    const channel = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID"] ?? "";
    const cbName = "__initDeysianeMap";
    (window as unknown as Record<string, unknown>)[cbName] = () => resolve(google.maps);
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&loading=async&language=pt-BR&region=BR&callback=${cbName}&channel=${channel}`;
    script.async = true;
    script.onerror = () => reject(new Error("Não foi possível carregar o mapa."));
    document.head.appendChild(script);
  });
  return mapsPromise;
}

const DARK_STYLE: google.maps.MapTypeStyle[] = [
  { elementType: "geometry", stylers: [{ color: "#1b1b1f" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#1b1b1f" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#9a9aa2" }] },
  { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#2a2a30" }] },
  { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8d8d96" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#101014" }] },
  { featureType: "transit", stylers: [{ visibility: "off" }] },
];

function pinIcon(maps: typeof google.maps, color: string): google.maps.Symbol {
  return {
    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z",
    fillColor: color,
    fillOpacity: 1,
    strokeColor: "#ffffff",
    strokeWeight: 1,
    scale: 1.6,
    anchor: new maps.Point(12, 22),
  };
}

export default function RouteMap({ center, origin, destination, path }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const lineRef = useRef<google.maps.Polyline | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadMaps()
      .then((maps) => {
        if (cancelled || !containerRef.current || mapRef.current) return;
        mapRef.current = new maps.Map(containerRef.current, {
          center,
          zoom: 13,
          disableDefaultUI: true,
          gestureHandling: "greedy",
          styles: DARK_STYLE,
        });
      })
      .catch((error) => console.error(error));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mapRef.current && !origin && !destination) {
      mapRef.current.setCenter(center);
    }
  }, [center, origin, destination]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || typeof google === "undefined") return;
    const maps = google.maps;

    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];
    lineRef.current?.setMap(null);
    lineRef.current = null;

    const bounds = new maps.LatLngBounds();

    if (origin) {
      markersRef.current.push(
        new maps.Marker({
          map,
          position: { lat: origin.lat, lng: origin.lng },
          title: "Partida",
          icon: pinIcon(maps, "#ff2d8f"),
        }),
      );
      bounds.extend({ lat: origin.lat, lng: origin.lng });
    }

    if (destination) {
      markersRef.current.push(
        new maps.Marker({
          map,
          position: { lat: destination.lat, lng: destination.lng },
          title: "Destino",
          icon: pinIcon(maps, "#22c55e"),
        }),
      );
      bounds.extend({ lat: destination.lat, lng: destination.lng });
    }

    if (path.length > 1) {
      lineRef.current = new maps.Polyline({
        map,
        path,
        strokeColor: "#ff2d8f",
        strokeOpacity: 0.95,
        strokeWeight: 5,
      });
      path.forEach((p) => bounds.extend(p));
    }

    if (origin && destination) {
      map.fitBounds(bounds, 56);
    } else if (origin || destination) {
      map.setCenter(bounds.getCenter());
      map.setZoom(15);
    }
  }, [origin, destination, path]);

  return <div ref={containerRef} className="h-full w-full" />;
}

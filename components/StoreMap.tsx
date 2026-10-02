"use client";

import { useEffect, useRef } from "react";
import type { Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { STORE } from "@/lib/constants";

const PAPER = "#f3f2ee";

const FILL: Record<string, string> = {
  park: "#e6e4de",
  water: "#d8d6cf",
  landuse_residential: "#eeede8",
  landcover_wood: "#e3e1db",
  building: "#e1dfd8",
  road_area_pier: "#e1dfd8",
};

const LINE: Record<string, string> = {
  waterway: "#c8c6be",
  road_pier: "#c8c6be",
  highway_path: "#d2d0c8",
  highway_minor: "#b7b4ab",
  highway_major_casing: "#9e9b92",
  highway_major_inner: "#f8f7f4",
  highway_major_subtle: "#cfcbc3",
  highway_motorway_casing: "#8f8c84",
  highway_motorway_inner: "#f6f5f1",
  highway_motorway_subtle: "#c8c5bd",
  highway_motorway_bridge_casing: "#8f8c84",
  highway_motorway_bridge_inner: "#f6f5f1",
};

function quiet(map: MapLibreMap) {
  map.setPaintProperty("background", "background-color", PAPER);

  for (const [id, color] of Object.entries(FILL)) {
    if (!map.getLayer(id)) continue;
    map.setPaintProperty(id, "fill-color", color);
    if (id === "building" || id === "park") {
      map.setPaintProperty(id, "fill-opacity", id === "building" ? 0.95 : 0.8);
    }
  }

  for (const [id, color] of Object.entries(LINE)) {
    if (!map.getLayer(id)) continue;
    map.setPaintProperty(id, "line-color", color);
  }

  const hide = [
    "landcover_ice_shelf",
    "landcover_glacier",
    "tunnel_motorway_casing",
    "tunnel_motorway_inner",
    "aeroway-taxiway",
    "aeroway-runway-casing",
    "aeroway-area",
    "aeroway-runway",
    "railway_transit",
    "railway_transit_dashline",
    "railway_service",
    "railway_service_dashline",
    "railway",
    "railway_dashline",
    "boundary_3",
    "boundary_2",
    "boundary_disputed",
  ];

  for (const id of hide) {
    if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", "none");
  }

  for (const layer of map.getStyle().layers ?? []) {
    if (layer.type === "symbol" && map.getLayer(layer.id)) {
      map.setLayoutProperty(layer.id, "visibility", "none");
    }
  }
}

export function StoreMap() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let removed = false;
    let observer: ResizeObserver | null = null;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    void import("maplibre-gl").then(({ Map, Marker, setWorkerUrl }) => {
      if (removed || !canvasRef.current) return;

      // Keep public/maplibre in sync with the installed maplibre-gl version.
      setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

      const map = new Map({
        container: canvasRef.current,
        style: "https://tiles.openfreemap.org/styles/positron",
        center: [STORE.lng + 0.00055, STORE.lat],
        zoom: 15.85,
        minZoom: 13.5,
        maxZoom: 17.5,
        attributionControl: false,
        scrollZoom: false,
        dragRotate: false,
        pitchWithRotate: false,
        touchPitch: false,
        boxZoom: false,
        doubleClickZoom: false,
        dragPan: !coarse,
        touchZoomRotate: !coarse,
        fadeDuration: 0,
      });

      map.touchZoomRotate.disableRotation();

      const mark = document.createElement("div");
      mark.className = "map-mark";
      mark.innerHTML =
        '<span class="map-mark-pin"><span class="map-mark-ring"></span><span class="map-mark-dot"></span></span><span class="map-mark-copy"><span>FARFITS</span><span>Block H</span></span>';

      new Marker({ element: mark, anchor: "left", offset: [-7, 0] })
        .setLngLat([STORE.lng, STORE.lat])
        .addTo(map);

      map.on("load", () => {
        quiet(map);
        map.resize();
      });

      observer = new ResizeObserver(() => map.resize());
      observer.observe(canvasRef.current);

      mapRef.current = map;
    });

    return () => {
      removed = true;
      observer?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  function zoom(dir: 1 | -1) {
    const map = mapRef.current;
    if (!map) return;
    map.easeTo({ zoom: map.getZoom() + dir * 0.7, duration: 420 });
  }

  return (
    <div
      className="map"
      role="region"
      aria-label="FARFITS, North Nazimabad Block H, Karachi"
    >
      <div ref={canvasRef} className="map-canvas" />
      <div className="map-vignette" aria-hidden="true" />
      <p className="map-meta">
        <span>Karachi</span>
        <span>24°56′19″ N</span>
        <span>67°03′08″ E</span>
      </p>
      <div className="map-zoom">
        <button type="button" aria-label="Zoom in" onClick={() => zoom(1)}>
          +
        </button>
        <button type="button" aria-label="Zoom out" onClick={() => zoom(-1)}>
          −
        </button>
      </div>
      <p className="map-credit">
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
        >
          © OpenStreetMap
        </a>
        <span aria-hidden="true">·</span>
        <a
          href="https://openfreemap.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          © OpenFreeMap
        </a>
      </p>
    </div>
  );
}

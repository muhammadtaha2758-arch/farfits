"use client";

import { useEffect, useRef } from "react";
import type { Map as MapLibreMap } from "maplibre-gl";
import { STORE } from "@/lib/constants";

const PAPER = "#f3f2ee";

const FILL: Record<string, string> = {
  park: "#e8e7e2",
  water: "#dddcd6",
  landuse_residential: "#ebeae5",
  landcover_wood: "#e5e4df",
  building: "#e3e2dd",
  road_area_pier: "#e3e2dd",
};

const LINE: Record<string, string> = {
  waterway: "#d2d0c9",
  road_pier: "#d2d0c9",
  highway_path: "#dedcd6",
  highway_minor: "#ffffff",
  highway_major_casing: "#cecbc4",
  highway_major_inner: "#ffffff",
  highway_major_subtle: "#f7f6f3",
  highway_motorway_casing: "#c6c3bc",
  highway_motorway_inner: "#fafaf8",
  highway_motorway_subtle: "#f4f3ef",
  highway_motorway_bridge_casing: "#c6c3bc",
  highway_motorway_bridge_inner: "#fafaf8",
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
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    void import("maplibre-gl").then(({ Map, Marker }) => {
      if (removed || !canvasRef.current) return;

      const map = new Map({
        container: canvasRef.current,
        style: "https://tiles.openfreemap.org/styles/positron",
        center: [STORE.lng + 0.00115, STORE.lat - 0.00015],
        zoom: 15.55,
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
        touchZoomRotate: false,
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

      mapRef.current = map;
    });

    return () => {
      removed = true;
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

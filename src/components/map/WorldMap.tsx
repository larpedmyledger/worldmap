"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoMercator, geoPath, type GeoPermissibleObjects } from "d3-geo";
import { select } from "d3-selection";
import { zoom as d3Zoom, zoomIdentity } from "d3-zoom";
import { feature } from "topojson-client";
import type { FeatureCollection, Geometry } from "geojson";
import { getCountryByIsoNumeric, CONTINENT_META } from "@/data/countries";
import { cn } from "@/lib/cn";

interface WorldMapProps {
  highlightId?: string;
  targetId?: string;
  selectedId?: string | null;
  onSelect?: (countryId: string) => void;
  showTooltip?: boolean;
  interactive?: boolean;
  className?: string;
  dimOthers?: boolean;
  correctId?: string | null;
  wrongId?: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WorldTopology = any;

export function WorldMap({
  highlightId,
  targetId,
  selectedId,
  onSelect,
  showTooltip = true,
  interactive = true,
  className,
  dimOthers = false,
  correctId,
  wrongId,
}: WorldMapProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gRef = useRef<SVGGElement | null>(null);
  const [geo, setGeo] = useState<FeatureCollection<Geometry> | null>(null);
  const [hover, setHover] = useState<{ name: string; continent: string; x: number; y: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/countries-110m.json")
      .then((r) => r.json())
      .then((topo: WorldTopology) => {
        if (cancelled) return;
        const countries = feature(
          topo,
          topo.objects.countries
        ) as unknown as FeatureCollection<Geometry>;
        setGeo(countries);
      })
      .catch(() => setError("Impossible de charger la carte."));
    return () => {
      cancelled = true;
    };
  }, []);

  const projection = useMemo(
    () => geoMercator().scale(140).translate([480, 320]).center([0, 20]),
    []
  );
  const pathGen = useMemo(() => geoPath(projection), [projection]);

  useEffect(() => {
    if (!svgRef.current || !gRef.current || !interactive) return;
    const svg = select(svgRef.current);
    const g = select(gRef.current);
    const zoomBehavior = d3Zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.8, 8])
      .on("zoom", (event) => {
        g.attr("transform", event.transform.toString());
      });
    svg.call(zoomBehavior);
    svg.call(zoomBehavior.transform, zoomIdentity);
    return () => {
      svg.on(".zoom", null);
    };
  }, [interactive, geo]);

  const focusCountry = highlightId || targetId;

  useEffect(() => {
    if (!geo || !focusCountry || !gRef.current || !svgRef.current) return;
    const country = geo.features.find((f) => {
      const id = String(f.id ?? "").padStart(3, "0");
      const match = getCountryByIsoNumeric(id);
      return match?.id === focusCountry;
    });
    if (!country) return;
    const bounds = pathGen.bounds(country as GeoPermissibleObjects);
    const [[x0, y0], [x1, y1]] = bounds;
    const width = 960;
    const height = 500;
    const dx = x1 - x0;
    const dy = y1 - y0;
    const x = (x0 + x1) / 2;
    const y = (y0 + y1) / 2;
    const scale = Math.max(0.9, Math.min(6, 0.7 / Math.max(dx / width, dy / height)));
    const translate: [number, number] = [width / 2 - scale * x, height / 2 - scale * y];
    const svg = select(svgRef.current);
    const g = select(gRef.current);
    g.attr(
      "transform",
      `translate(${translate[0]},${translate[1]}) scale(${scale})`
    );
    // keep zoom state roughly in sync without d3-transition
    void svg;
  }, [focusCountry, geo, pathGen]);

  if (error) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl bg-slate-900 text-slate-400">
        {error}
      </div>
    );
  }

  if (!geo) {
    return (
      <div className="flex h-64 items-center justify-center rounded-3xl bg-slate-900 text-slate-400 animate-pulse">
        Chargement de la carte…
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-3xl bg-slate-950 border border-slate-800", className)}>
      <svg
        ref={svgRef}
        viewBox="0 0 960 500"
        className="h-full w-full touch-none"
        role="img"
        aria-label="Carte du monde interactive"
      >
        <rect width="960" height="500" fill="#020617" />
        <g ref={gRef}>
          {geo.features.map((f, i) => {
            const numeric = String(f.id ?? "").padStart(3, "0");
            const country = getCountryByIsoNumeric(numeric);
            const countryId = country?.id;
            const isTarget = targetId && countryId === targetId;
            const isHighlight = highlightId && countryId === highlightId;
            const isSelected = selectedId && countryId === selectedId;
            const isCorrect = correctId && countryId === correctId;
            const isWrong = wrongId && countryId === wrongId;
            const dim =
              dimOthers &&
              focusCountry &&
              countryId !== focusCountry &&
              !isSelected &&
              !isCorrect &&
              !isWrong;

            let fill = "#1e293b";
            if (isCorrect) fill = "#10b981";
            else if (isWrong) fill = "#f43f5e";
            else if (isSelected || isHighlight || isTarget) fill = "#6366f1";
            else if (dim) fill = "#0f172a";

            return (
              <path
                key={`${numeric}-${i}`}
                d={pathGen(f as GeoPermissibleObjects) ?? undefined}
                fill={fill}
                stroke="#334155"
                strokeWidth={0.4}
                className={cn(
                  "transition-colors duration-150",
                  interactive && countryId && "cursor-pointer hover:fill-indigo-400/80"
                )}
                onClick={() => {
                  if (interactive && countryId && onSelect) onSelect(countryId);
                }}
                onMouseMove={(e) => {
                  if (!showTooltip || !country) return;
                  const rect = svgRef.current?.getBoundingClientRect();
                  if (!rect) return;
                  setHover({
                    name: country.name,
                    continent: CONTINENT_META[country.continent].name,
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                  });
                }}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}
        </g>
      </svg>

      {hover && showTooltip && (
        <div
          className="pointer-events-none absolute z-10 rounded-xl bg-slate-900/95 border border-slate-700 px-3 py-2 text-sm shadow-xl"
          style={{ left: hover.x + 12, top: hover.y + 12 }}
        >
          <p className="font-medium text-white">{hover.name}</p>
          <p className="text-xs text-slate-400">{hover.continent}</p>
        </div>
      )}

      {interactive && (
        <p className="absolute bottom-3 left-3 text-[11px] text-slate-500">
          Molette pour zoomer · glisser pour déplacer
        </p>
      )}
    </div>
  );
}

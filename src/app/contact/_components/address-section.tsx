"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, NavigationControl } from "react-map-gl/mapbox";
import Image from "next/image";
import Badge from "@/soul/primitives/Badge";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const MAP_CONFIG = {
  longitude: -149.8936,
  latitude: 61.2155,
  zoom: 12,
} as const;

const LOGO_SIZES = {
  width: 64,
  height: 64,
} as const;

const VISUAL_BLOCK_CLASS =
  "mt-10 w-full h-full max-w-[1220px] min-h-[709px] rounded-xl border border-zinc-800";

export function AddressSection() {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const logoSrc = "/images/www.kainé.ch_.png";
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const leftColumn = container.querySelector<HTMLElement>(".address-column");
      const largeChild = container.querySelector<HTMLElement>(".large-child");

      if (!leftColumn || !largeChild) return;

      const section = container.querySelector<HTMLElement>("section");
      if (!section) return;

      const getY = () => leftColumn.clientHeight - largeChild.clientHeight;

      ScrollTrigger.create({
        trigger: leftColumn,
        endTrigger: largeChild,
        pin: true,
        pinSpacing: false,
        start: "top 25%",
        end: "bottom 50%",

      });

      gsap.to(largeChild, {
        y: getY,
        ease: "none",
        scrollTrigger: {
          trigger: leftColumn,
          endTrigger: largeChild,
          start: "top 30%",
          end: "bottom 50%",
          scrub: 1,

        },
      });


      ScrollTrigger.create({
        trigger: container,
        pin: true,
        pinSpacing: false,
        start: "bottom 40%",
        end: "+=100%",

      });


      gsap.to(section, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,

        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <section className="flex flex-col text-kainé-white bg-kainé-black  -mt-14 pt-16">
        <div className="px-4 sm:px-6 lg:px-8">
          <h1 className="text-[223px] ">Hello!</h1>
        </div>

        <div className="vertical-section w-full flex px-4 ">
          <div className="address-column w-full max-w-md flex flex-col gap-6 p-8">
            <span>
              <Badge
                variant="outline"
                size="sm"
                className="text-kainé-white border-kainé-white"
              >
                Address
              </Badge>
            </span>
            <p className="text-3xl font-medium leading-10">
              413 West Fireweed Ln, Anchorage, Alaska
            </p>
            <p className="text-lg text-gray-500">
              Whoever searches will find. If you&apos;re reading this, you
              don&apos;t need to search and you&apos;ll find us right in the
              courtyard, to the left of the Parterre restaurant.
            </p>
          </div>

          <div className="py-10"></div>
          <div className="w-full flex flex-col large-child">
            <div className="w-full flex flex-col items-center p-8 gap-10">
              {/* Contact info */}
              <div className="flex flex-col gap-8 w-full max-w-md">
                <span>
                  <Badge
                    variant="outline"
                    size="sm"
                    className="text-kainé-white border-kainé-white"
                  >
                    Contact
                  </Badge>
                </span>
                <p className="text-3xl mb-4 leading-10">
                  Whoever searches will find. If you&apos;re reading this, you
                  don&apos;t need to search
                </p>
                <p className="text-3xl flex flex-col gap-4">
                  Hello.kaine@outlook.com
                  <span>+2349038432630</span>
                </p>
              </div>

              {/* Map */}
              <div className={VISUAL_BLOCK_CLASS} >
                {mapboxToken ? (
                  <Map
                    mapboxAccessToken={mapboxToken}
                    mapStyle="mapbox://styles/mapbox/dark-v11"
                    initialViewState={{
                      longitude: MAP_CONFIG.longitude,
                      latitude: MAP_CONFIG.latitude,
                      zoom: MAP_CONFIG.zoom,
                    }}
                    style={{ width: "100%", height: "100%" }}
                    attributionControl={false}
                    onLoad={() => ScrollTrigger.refresh()}
                    dragPan={false}
                    scrollZoom={false}
                    boxZoom={false}
                    doubleClickZoom={false}
                    keyboard={false}
                    dragRotate={false}
                    touchZoomRotate={false}
                  >
                    <Marker
                      longitude={MAP_CONFIG.longitude}
                      latitude={MAP_CONFIG.latitude}
                      anchor="bottom"
                    >
                      <div
                        style={{
                          width: LOGO_SIZES.width,
                          height: LOGO_SIZES.height,
                          backgroundImage: `url(${logoSrc})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                        }}
                      />
                    </Marker>
                    <NavigationControl
                      showCompass={false}
                    />
                  </Map>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-sm text-zinc-400">
                    Set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN to display the map.
                  </div>
                )}
              </div>

              {/* Last image */}
              <div className={`${VISUAL_BLOCK_CLASS} relative`}>
                <Image
                  src="/images/placeholder1.jpg"
                  alt="Studio exterior"
                  fill
                  onLoad={() => ScrollTrigger.refresh()}
                  className="object-cover rounded-xl"
                  sizes="(min-width: 1280px) 1220px, 100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

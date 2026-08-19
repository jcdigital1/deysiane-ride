import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { Car, MessageCircle } from "lucide-react";
import logoMark from "@/assets/logo-mark.png";
import { PlaceField } from "@/components/PlaceField";
import { computeRoute, reverseGeocode } from "@/lib/maps.functions";
import { decodePolyline, type SelectedPlace } from "@/lib/places-types";

const RouteMap = lazy(() => import("@/components/RouteMap"));

const WHATSAPP_NUMBER = "5534998402888";
const WHATSAPP_LINK = "https://wa.link/ptzng7";
const DEFAULT_CENTER = { lat: -18.9436, lng: -46.9925 };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Deysiane Uber Particular | Corridas particulares" },
      {
        name: "description",
        content:
          "Peça sua corrida particular com a Deysiane: informe partida e destino e envie direto pelo WhatsApp.",
      },
      { property: "og:title", content: "Deysiane Uber Particular" },
      {
        property: "og:description",
        content: "Peça sua corrida com segurança e praticidade, direto pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#000000" },
    ],
    links: [{ rel: "manifest", href: "/manifest.webmanifest" }],
  }),
  component: Index,
});

function Index() {
  const geocode = useServerFn(reverseGeocode);
  const route = useServerFn(computeRoute);

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [city, setCity] = useState<string>("");
  const [gpsDenied, setGpsDenied] = useState(false);

  const [originText, setOriginText] = useState("");
  const [destText, setDestText] = useState("");
  const [origin, setOrigin] = useState<SelectedPlace | null>(null);
  const [destination, setDestination] = useState<SelectedPlace | null>(null);
  const [path, setPath] = useState<Array<{ lat: number; lng: number }>>([]);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setGpsDenied(true);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const next = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoords(next);
        try {
          const info = await geocode({ data: next });
          setCity([info.city, info.state].filter(Boolean).join(" - "));
        } catch (error) {
          console.error(error);
        }
      },
      () => setGpsDenied(true),
      { enableHighAccuracy: true, timeout: 10000 },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!origin || !destination) {
      setPath([]);
      return;
    }
    let cancelled = false;
    route({
      data: {
        origin: { lat: origin.lat, lng: origin.lng },
        destination: { lat: destination.lat, lng: destination.lng },
      },
    })
      .then((result) => {
        if (cancelled) return;
        setPath(result.polyline ? decodePolyline(result.polyline) : []);
      })
      .catch((error) => console.error(error));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [origin, destination]);

  const ready = Boolean(origin && destination);
  const center = useMemo(() => coords ?? DEFAULT_CENTER, [coords]);

  function requestRide() {
    if (!origin || !destination) return;
    const message =
      `Olá, Deysiane! Desejo solicitar uma corrida. \u{1F697}\n\n` +
      `\u{1F4CD} Local de partida:\n${origin.address}\n\n` +
      `\u{1F3C1} Destino:\n${destination.address}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col gap-5 px-4 pb-10 pt-8">
      <header className="flex flex-col items-center text-center">
        <div className="glow-pink rounded-3xl bg-card/70 p-3">
          <img src={logoMark} alt="Deysiane Uber Particular" width={72} height={72} className="size-16" />
        </div>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">
          Deysiane <span className="text-primary">Uber Particular</span>
        </h1>
        <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-sm font-medium text-success">
          <span className="animate-pulse-dot size-2 rounded-full bg-success" aria-hidden />
          Disponível
        </span>
        <p className="mt-4 text-base text-foreground/90">
          Peça sua corrida com segurança e praticidade.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Informe seu local de partida e para onde deseja ir.
        </p>
        {city && <p className="mt-2 text-xs text-primary/90">Buscando em {city}</p>}
        {gpsDenied && (
          <p className="mt-2 text-xs text-muted-foreground">
            Localização não autorizada. Digite seu endereço normalmente.
          </p>
        )}
      </header>

      <section className="card-soft relative overflow-hidden rounded-3xl border border-border/60 bg-card p-5">
        <div
          className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/10 blur-2xl"
          aria-hidden
        />
        <div className="flex flex-col gap-4">
          <PlaceField
            label="Local de partida"
            placeholder="Digite seu local de partida"
            variant="origin"
            coords={coords}
            value={originText}
            onValueChange={setOriginText}
            onSelect={setOrigin}
          />
          <PlaceField
            label="Para onde você vai?"
            placeholder="Digite seu destino"
            variant="destination"
            coords={coords}
            value={destText}
            onValueChange={setDestText}
            onSelect={setDestination}
          />
        </div>
      </section>

      <section className="card-soft h-56 overflow-hidden rounded-3xl border border-border/60 bg-card">
        <ClientOnly fallback={<div className="h-full w-full animate-pulse bg-secondary" />}>
          <Suspense fallback={<div className="h-full w-full animate-pulse bg-secondary" />}>
            <RouteMap center={center} origin={origin} destination={destination} path={path} />
          </Suspense>
        </ClientOnly>
      </section>

      <button
        type="button"
        onClick={requestRide}
        disabled={!ready}
        className="bg-gradient-pink glow-pink flex h-16 w-full items-center justify-center gap-3 rounded-2xl text-lg font-semibold text-primary-foreground transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
      >
        <Car className="size-6" aria-hidden />
        SOLICITAR CORRIDA
      </button>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-success/40 bg-success/10 text-sm font-medium text-success transition-colors hover:bg-success/20"
      >
        <MessageCircle className="size-5" aria-hidden />
        Falar com a Deysiane
      </a>
    </main>
  );
}

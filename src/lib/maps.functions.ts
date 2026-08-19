import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_maps";

function authHeaders() {
  const lovableKey = process.env["LOVABLE_API_KEY"];
  const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
  if (!lovableKey || !mapsKey) throw new Error("Credenciais do Google Maps ausentes.");
  return {
    Authorization: `Bearer ${lovableKey}`,
    "X-Connection-Api-Key": mapsKey,
    "Content-Type": "application/json",
  };
}

async function ensureOk(response: Response) {
  if (!response.ok) {
    const body = await response.text();
    console.error(`Google Maps gateway [${response.status}]: ${body}`);
    if (response.status === 403) {
      throw new Error("Google Maps negou a requisição (403). Verifique as restrições da chave.");
    }
    throw new Error(`Falha na requisição do Google Maps [${response.status}]`);
  }
  return response.json();
}

export const autocompletePlaces = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        input: z.string().min(2).max(200),
        lat: z.number().min(-90).max(90).optional(),
        lng: z.number().min(-180).max(180).optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const body: Record<string, unknown> = {
      input: data.input,
      includedRegionCodes: ["br"],
      languageCode: "pt-BR",
      regionCode: "br",
    };
    if (typeof data.lat === "number" && typeof data.lng === "number") {
      body["locationBias"] = {
        circle: { center: { latitude: data.lat, longitude: data.lng }, radius: 30000 },
      };
    }
    const json = (await ensureOk(
      await fetch(`${GATEWAY_URL}/places/v1/places:autocomplete`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(body),
      }),
    )) as {
      suggestions?: Array<{
        placePrediction?: {
          placeId: string;
          text?: { text?: string };
          structuredFormat?: { mainText?: { text?: string }; secondaryText?: { text?: string } };
        };
      }>;
    };

    return (json.suggestions ?? [])
      .map((s) => s.placePrediction)
      .filter((p): p is NonNullable<typeof p> => Boolean(p?.placeId))
      .slice(0, 6)
      .map((p) => ({
        placeId: p.placeId,
        main: p.structuredFormat?.mainText?.text ?? p.text?.text ?? "",
        secondary: p.structuredFormat?.secondaryText?.text ?? "",
      }));
  });

export const getPlaceDetails = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ placeId: z.string().min(3).max(300) }).parse(data))
  .handler(async ({ data }) => {
    const json = (await ensureOk(
      await fetch(`${GATEWAY_URL}/places/v1/places/${encodeURIComponent(data.placeId)}`, {
        headers: {
          ...authHeaders(),
          "X-Goog-FieldMask": "id,displayName,formattedAddress,location",
        },
      }),
    )) as {
      displayName?: { text?: string };
      formattedAddress?: string;
      location?: { latitude: number; longitude: number };
    };

    return {
      name: json.displayName?.text ?? "",
      address: json.formattedAddress ?? "",
      lat: json.location?.latitude ?? null,
      lng: json.location?.longitude ?? null,
    };
  });

export const reverseGeocode = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z.object({ lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180) }).parse(data),
  )
  .handler(async ({ data }) => {
    const json = (await ensureOk(
      await fetch(
        `${GATEWAY_URL}/maps/api/geocode/json?latlng=${data.lat},${data.lng}&language=pt-BR&result_type=locality|administrative_area_level_2`,
        { headers: authHeaders() },
      ),
    )) as {
      results?: Array<{
        formatted_address?: string;
        address_components?: Array<{ long_name: string; short_name: string; types: string[] }>;
      }>;
    };

    const first = json.results?.[0];
    const comp = (type: string) =>
      first?.address_components?.find((c) => c.types.includes(type))?.long_name ?? "";
    return {
      city: comp("administrative_area_level_2") || comp("locality"),
      state:
        first?.address_components?.find((c) => c.types.includes("administrative_area_level_1"))
          ?.short_name ?? "",
      formatted: first?.formatted_address ?? "",
    };
  });

export const computeRoute = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        origin: z.object({ lat: z.number(), lng: z.number() }),
        destination: z.object({ lat: z.number(), lng: z.number() }),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const json = (await ensureOk(
      await fetch(`${GATEWAY_URL}/routes/directions/v2:computeRoutes`, {
        method: "POST",
        headers: {
          ...authHeaders(),
          "X-Goog-FieldMask":
            "routes.polyline.encodedPolyline,routes.distanceMeters,routes.duration",
        },
        body: JSON.stringify({
          origin: { location: { latLng: { latitude: data.origin.lat, longitude: data.origin.lng } } },
          destination: {
            location: { latLng: { latitude: data.destination.lat, longitude: data.destination.lng } },
          },
          travelMode: "DRIVE",
          languageCode: "pt-BR",
          regionCode: "BR",
        }),
      }),
    )) as {
      routes?: Array<{
        polyline?: { encodedPolyline?: string };
        distanceMeters?: number;
        duration?: string;
      }>;
    };

    const route = json.routes?.[0];
    return {
      polyline: route?.polyline?.encodedPolyline ?? null,
      distanceMeters: route?.distanceMeters ?? null,
      duration: route?.duration ?? null,
    };
  });

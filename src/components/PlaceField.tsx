import { useEffect, useId, useRef, useState } from "react";
import { MapPin, Flag, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { autocompletePlaces, getPlaceDetails } from "@/lib/maps.functions";
import type { SelectedPlace } from "@/lib/places-types";

type Suggestion = { placeId: string; main: string; secondary: string };

type Props = {
  label: string;
  placeholder: string;
  variant: "origin" | "destination";
  coords: { lat: number; lng: number } | null;
  value: string;
  onValueChange: (value: string) => void;
  onSelect: (place: SelectedPlace | null) => void;
};

export function PlaceField({
  label,
  placeholder,
  variant,
  coords,
  value,
  onValueChange,
  onSelect,
}: Props) {
  const inputId = useId();
  const search = useServerFn(autocompletePlaces);
  const details = useServerFn(getPlaceDetails);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const skipNext = useRef(false);
  const Icon = variant === "origin" ? MapPin : Flag;

  useEffect(() => {
    if (skipNext.current) {
      skipNext.current = false;
      return;
    }
    const term = value.trim();
    if (term.length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const results = await search({
          data: { input: term, ...(coords ? { lat: coords.lat, lng: coords.lng } : {}) },
        });
        if (cancelled) return;
        setSuggestions(results);
        setOpen(results.length > 0);
      } catch (error) {
        console.error(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(timer);
275;
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, coords?.lat, coords?.lng]);

  async function handlePick(suggestion: Suggestion) {
    setOpen(false);
    setSuggestions([]);
    setLoading(true);
    try {
      const place = await details({ data: { placeId: suggestion.placeId } });
      if (place.lat == null || place.lng == null) return;
      const label = place.address || suggestion.main;
      skipNext.current = true;
      onValueChange(label);
      onSelect({
        name: place.name || suggestion.main,
        address: label,
        lat: place.lat,
        lng: place.lng,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative">
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-foreground/90">
        {label}
      </label>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-primary"
          aria-hidden
        />
        <input
          id={inputId}
          value={value}
          onChange={(event) => {
            onValueChange(event.target.value);
            onSelect(null);
          }}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder}
          autoComplete="off"
          className="field-input h-14 w-full rounded-2xl border border-border/40 pl-12 pr-11 text-base outline-none placeholder:text-neutral-400 focus:ring-2 focus:ring-ring"
        />
        {loading && (
          <Loader2
            className="absolute right-4 top-1/2 size-5 -translate-y-1/2 animate-spin text-primary"
            aria-hidden
          />
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul className="card-soft absolute z-30 mt-2 w-full overflow-hidden rounded-2xl bg-field text-field-foreground">
          {suggestions.map((suggestion) => (
            <li key={suggestion.placeId} className="border-b border-neutral-200 last:border-b-0">
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handlePick(suggestion)}
                className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-neutral-100"
              >
                <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-medium">{suggestion.main}</span>
                  {suggestion.secondary && (
                    <span className="block truncate text-[13px] text-neutral-500">
                      {suggestion.secondary}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

"use client";

import { MapPin, Globe, Plug, Phone, Info } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const destinations = [
  { name: "Paris", country: "France", currency: "EUR", language: "Français", emoji: "🇫🇷" },
  { name: "Lisbonne", country: "Portugal", currency: "EUR", language: "Portugais", emoji: "🇵🇹" },
  { name: "Barcelone", country: "Espagne", currency: "EUR", language: "Espagnol", emoji: "🇪🇸" },
  { name: "Rome", country: "Italie", currency: "EUR", language: "Italien", emoji: "🇮🇹" },
  { name: "Amsterdam", country: "Pays-Bas", currency: "EUR", language: "Néerlandais", emoji: "🇳🇱" },
  { name: "Londres", country: "Royaume-Uni", currency: "GBP", language: "Anglais", emoji: "🇬🇧" },
  { name: "Tokyo", country: "Japon", currency: "JPY", language: "Japonais", emoji: "🇯🇵" },
  { name: "New York", country: "États-Unis", currency: "USD", language: "Anglais", emoji: "🇺🇸" },
  { name: "Marrakech", country: "Maroc", currency: "MAD", language: "Arabe / Français", emoji: "🇲🇦" },
  { name: "Bangkok", country: "Thaïlande", currency: "THB", language: "Thaï", emoji: "🇹🇭" },
  { name: "Istanbul", country: "Turquie", currency: "TRY", language: "Turc", emoji: "🇹🇷" },
  { name: "Dubrovnik", country: "Croatie", currency: "EUR", language: "Croate", emoji: "🇭🇷" },
];

export default function ExplorePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Explorer</h1>
        <p className="mt-1 text-sm text-slate-500">
          Découvre nos destinations et crée un voyage en un clic.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((dest) => (
          <Card key={dest.name} hover>
            <div className="flex items-start gap-3">
              <span className="text-3xl">{dest.emoji}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900">{dest.name}</h3>
                <p className="text-sm text-slate-500">{dest.country}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge>{dest.currency}</Badge>
                  <Badge variant="info">{dest.language}</Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

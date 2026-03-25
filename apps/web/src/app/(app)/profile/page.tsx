"use client";

import { useState } from "react";
import { User, Mail, Globe, Wallet } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DIETARY_LABELS, ALLERGY_LABELS } from "@voygo/shared";
import { cn } from "@/lib/utils";

const dietaryOptions = Object.entries(DIETARY_LABELS);
const allergyOptions = Object.entries(ALLERGY_LABELS);

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    full_name: "Marie Dupont",
    email: "marie@example.com",
    preferred_currency: "EUR",
    preferred_language: "fr",
    dietary_type: "none",
    allergies: [] as string[],
    favorite_cuisines: ["french", "italian", "japanese"],
  });

  function toggleAllergy(allergy: string) {
    setProfile((prev) => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter((a) => a !== allergy)
        : [...prev.allergies, allergy],
    }));
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Mon profil</h1>
        <p className="mt-1 text-sm text-slate-500">Tes informations et préférences de voyage</p>
      </div>

      {/* Infos */}
      <Card>
        <CardTitle>Informations personnelles</CardTitle>
        <div className="mt-4 space-y-4">
          <Input id="full_name" label="Nom complet" value={profile.full_name} onChange={(e) => setProfile((p) => ({ ...p, full_name: e.target.value }))} />
          <Input id="email" label="Email" type="email" value={profile.email} disabled />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Devise</label>
              <select
                value={profile.preferred_currency}
                onChange={(e) => setProfile((p) => ({ ...p, preferred_currency: e.target.value }))}
                className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Langue</label>
              <select
                value={profile.preferred_language}
                onChange={(e) => setProfile((p) => ({ ...p, preferred_language: e.target.value }))}
                className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Dietary */}
      <Card>
        <CardTitle>Préférences alimentaires</CardTitle>
        <p className="text-sm text-slate-500 mt-1">
          Ces infos permettent de filtrer les recommandations de restaurants.
        </p>
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">Régime</label>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map(([value, label]) => (
              <button
                key={value}
                onClick={() => setProfile((p) => ({ ...p, dietary_type: value }))}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-medium transition-all",
                  profile.dietary_type === value
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-slate-700 mb-2">Allergies</label>
          <div className="flex flex-wrap gap-2">
            {allergyOptions.map(([value, label]) => (
              <button
                key={value}
                onClick={() => toggleAllergy(value)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-medium transition-all",
                  profile.allergies.includes(value)
                    ? "border-red-400 bg-red-50 text-red-700"
                    : "border-slate-200 text-slate-600 hover:border-slate-300"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Button className="w-full">Enregistrer les modifications</Button>
    </div>
  );
}

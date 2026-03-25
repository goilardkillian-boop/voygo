"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { TRIP_TYPE_LABELS } from "@voygo/shared";
import { cn } from "@/lib/utils";

const tripTypes = Object.entries(TRIP_TYPE_LABELS).map(([value, label]) => ({
  value,
  label,
  icon: value === "weekend" ? "🌃" : value === "vacation" ? "🏖️" : value === "daytrip" ? "🚶" : value === "business" ? "💼" : "🚗",
}));

export default function NewTripPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    destination: "",
    destination_country: "",
    trip_type: "vacation",
    start_date: "",
    end_date: "",
    budget_target: "",
    budget_currency: "EUR",
  });

  function updateForm(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    // TODO: Supabase insert + generate checklist
    console.log("Creating trip:", form);
    router.push("/dashboard");
  }

  return (
    <div className="mx-auto max-w-lg">
      <Link
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Nouveau voyage</h1>
        <p className="mt-1 text-sm text-slate-500">
          Étape {step} sur 3
        </p>
        <div className="mt-3 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                s <= step ? "bg-primary-500" : "bg-slate-200"
              )}
            />
          ))}
        </div>
      </div>

      {step === 1 && (
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Où pars-tu ?</h2>
          <div className="space-y-4">
            <Input
              id="destination"
              label="Destination"
              placeholder="Ex : Lisbonne, Tokyo, Barcelone..."
              value={form.destination}
              onChange={(e) => updateForm("destination", e.target.value)}
              required
            />
            <Input
              id="destination_country"
              label="Pays"
              placeholder="Ex : Portugal, Japon, Espagne..."
              value={form.destination_country}
              onChange={(e) => updateForm("destination_country", e.target.value)}
              required
            />
            <Input
              id="title"
              label="Nom du voyage"
              placeholder="Ex : Week-end à Lisbonne"
              value={form.title}
              onChange={(e) => updateForm("title", e.target.value)}
              required
            />
            <Button
              className="w-full"
              onClick={() => setStep(2)}
              disabled={!form.destination || !form.title}
            >
              Continuer
            </Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Quel type de voyage ?</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {tripTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => updateForm("trip_type", type.value)}
                className={cn(
                  "flex items-center gap-2 rounded-xl border p-3 text-sm font-medium transition-all",
                  form.trip_type === type.value
                    ? "border-primary-500 bg-primary-50 text-primary-700"
                    : "border-slate-200 text-slate-700 hover:border-slate-300"
                )}
              >
                <span className="text-lg">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                id="start_date"
                label="Date de début"
                type="date"
                value={form.start_date}
                onChange={(e) => updateForm("start_date", e.target.value)}
                required
              />
              <Input
                id="end_date"
                label="Date de fin"
                type="date"
                value={form.end_date}
                onChange={(e) => updateForm("end_date", e.target.value)}
                required
              />
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setStep(1)}>
                Retour
              </Button>
              <Button
                className="flex-1"
                onClick={() => setStep(3)}
                disabled={!form.start_date || !form.end_date}
              >
                Continuer
              </Button>
            </div>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Budget (optionnel)</h2>
          <div className="space-y-4">
            <Input
              id="budget"
              label="Budget cible"
              type="number"
              placeholder="Ex : 1000"
              value={form.budget_target}
              onChange={(e) => updateForm("budget_target", e.target.value)}
            />
            <select
              value={form.budget_currency}
              onChange={(e) => updateForm("budget_currency", e.target.value)}
              className="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            >
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CHF">CHF</option>
            </select>

            {/* Summary */}
            <div className="rounded-xl bg-slate-50 p-4">
              <h3 className="text-sm font-medium text-slate-700 mb-2">Récapitulatif</h3>
              <div className="space-y-1 text-sm text-slate-500">
                <div className="flex justify-between">
                  <span>Destination</span>
                  <span className="font-medium text-slate-700">{form.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dates</span>
                  <span className="font-medium text-slate-700">
                    {form.start_date} → {form.end_date}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Type</span>
                  <span className="font-medium text-slate-700">
                    {TRIP_TYPE_LABELS[form.trip_type]}
                  </span>
                </div>
                {form.budget_target && (
                  <div className="flex justify-between">
                    <span>Budget</span>
                    <span className="font-medium text-slate-700">
                      {form.budget_target} {form.budget_currency}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={() => setStep(2)}>
                Retour
              </Button>
              <Button className="flex-1" onClick={handleSubmit}>
                <MapPin className="h-4 w-4" />
                Créer le voyage
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

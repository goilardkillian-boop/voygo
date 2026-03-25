"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Wallet,
  CheckCircle,
  Users,
  BookOpen,
  Globe,
  Plane,
  Clock,
  Share2,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn, formatCurrency, formatDate, daysUntil } from "@/lib/utils";
import {
  TRIP_TYPE_LABELS,
  EXPENSE_CATEGORY_LABELS,
  EXPENSE_CATEGORY_ICONS,
  CHECKLIST_TEMPLATES,
  DIETARY_LABELS,
  ALLERGY_LABELS,
} from "@voygo/shared";

// --- Demo Data ---
const trip = {
  id: "1",
  title: "Week-end à Lisbonne",
  destination: "Lisbonne",
  destination_country: "Portugal",
  trip_type: "weekend" as const,
  status: "upcoming" as const,
  start_date: "2026-04-18",
  end_date: "2026-04-20",
  budget_target: 600,
  budget_currency: "EUR",
  preparation_score: 72,
};

const checklist = [
  { id: "1", category: "before_departure", title: "Vérifier la météo", status: "completed" },
  { id: "2", category: "before_departure", title: "Réserver l'hébergement", status: "completed" },
  { id: "3", category: "before_departure", title: "Planifier le trajet", status: "pending" },
  { id: "4", category: "packing", title: "Chargeur de téléphone", status: "completed" },
  { id: "5", category: "packing", title: "Vêtements adaptés à la météo", status: "pending" },
  { id: "6", category: "packing", title: "Carte d'identité / Passeport", status: "completed" },
  { id: "7", category: "packing", title: "Médicaments si besoin", status: "pending" },
  { id: "8", category: "during", title: "Profiter ! 🎉", status: "pending" },
  { id: "9", category: "after_return", title: "Trier les photos", status: "pending" },
];

const expenses = [
  { id: "1", title: "Vol Paris-Lisbonne", amount: 180, category: "transport", date: "2026-04-18" },
  { id: "2", title: "Airbnb Alfama", amount: 220, category: "accommodation", date: "2026-04-18" },
  { id: "3", title: "Restaurant Time Out", amount: 45, category: "food", date: "2026-04-18" },
];

const restaurants = [
  { name: "The Food Temple", cuisine: "Méditerranéen", price: 2, rating: 4.5, dietary: ["vegetarian", "vegan"] },
  { name: "Cervejaria Ramiro", cuisine: "Local", price: 3, rating: 4.6, dietary: [] },
  { name: "Time Out Market", cuisine: "Varié", price: 2, rating: 4.3, dietary: ["vegetarian", "vegan"] },
];

const phrases = [
  { original: "Bonjour", translated: "Bom dia", phonetic: "Bom dia", category: "greeting" },
  { original: "Merci", translated: "Obrigado/a", phonetic: "Obrigadou/a", category: "greeting" },
  { original: "L'addition, s'il vous plaît", translated: "A conta, por favor", phonetic: "A conta, por favor", category: "restaurant" },
  { original: "Je suis allergique à...", translated: "Sou alérgico/a a...", phonetic: "So alérgico/a a...", category: "restaurant" },
  { original: "Où est la station de métro ?", translated: "Onde é a estação de metro?", phonetic: "Ondé é a estasão dé métro?", category: "transport" },
];

const destinationInfo = {
  currency: "EUR",
  language: "Portugais",
  plug_type: "Type C/F",
  emergency_number: "112",
  useful_info: "Très vallonné, prévoir des chaussures confortables. Le tram 28 est incontournable. Pastéis de nata obligatoires.",
};

// --- Tabs ---
const tabs = [
  { id: "overview", label: "Aperçu", icon: MapPin },
  { id: "checklist", label: "Checklist", icon: CheckCircle },
  { id: "budget", label: "Budget", icon: Wallet },
  { id: "restaurants", label: "Restaurants", icon: BookOpen },
  { id: "guide", label: "Guide", icon: Globe },
];

export default function TripDetailPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const days = daysUntil(trip.start_date);
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const completedTasks = checklist.filter((c) => c.status === "completed").length;
  const scoreColor = trip.preparation_score >= 80 ? "success" : trip.preparation_score >= 50 ? "warning" : "error";

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="mb-4 inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Mes voyages
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">{trip.title}</h1>
              <Badge variant="warning">
                {days > 0 ? `J-${days}` : days === 0 ? "C'est aujourd'hui !" : "Passé"}
              </Badge>
            </div>
            <div className="mt-1 flex items-center gap-3 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {trip.destination}, {trip.destination_country}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(trip.start_date, { day: "numeric", month: "short" })} — {formatDate(trip.end_date, { day: "numeric", month: "short" })}
              </span>
              <span className="text-xs text-slate-400">{TRIP_TYPE_LABELS[trip.trip_type]}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Share2 className="h-4 w-4" />
              Inviter
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 overflow-x-auto rounded-xl bg-slate-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-all",
              activeTab === tab.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          {/* Preparation score */}
          <Card>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>Score de préparation</CardTitle>
              <span className="text-2xl font-bold text-slate-900">{trip.preparation_score}%</span>
            </div>
            <Progress value={trip.preparation_score} color={scoreColor} />
            <p className="mt-2 text-sm text-slate-500">
              {completedTasks}/{checklist.length} tâches complétées
            </p>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Budget summary */}
            <Card>
              <CardTitle>Budget</CardTitle>
              <div className="mt-2">
                <div className="text-2xl font-bold text-slate-900">
                  {formatCurrency(totalSpent)} <span className="text-sm font-normal text-slate-400">/ {formatCurrency(trip.budget_target)}</span>
                </div>
                <Progress
                  value={totalSpent}
                  max={trip.budget_target}
                  color={totalSpent > trip.budget_target ? "error" : "primary"}
                  className="mt-2"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Reste {formatCurrency(trip.budget_target - totalSpent)}
                </p>
              </div>
            </Card>

            {/* Quick checklist */}
            <Card>
              <CardTitle>Prochaines tâches</CardTitle>
              <div className="mt-2 space-y-2">
                {checklist
                  .filter((c) => c.status === "pending")
                  .slice(0, 3)
                  .map((item) => (
                    <div key={item.id} className="flex items-center gap-2 text-sm">
                      <div className="h-4 w-4 rounded border border-slate-300" />
                      <span className="text-slate-700">{item.title}</span>
                    </div>
                  ))}
                <button
                  onClick={() => setActiveTab("checklist")}
                  className="text-xs font-medium text-primary-600 hover:text-primary-700"
                >
                  Voir tout →
                </button>
              </div>
            </Card>
          </div>

          {/* Destination info */}
          <Card>
            <CardTitle>Infos pratiques — {trip.destination}</CardTitle>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-xs text-slate-400">Devise</span>
                <p className="font-medium text-slate-700">{destinationInfo.currency}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-xs text-slate-400">Langue</span>
                <p className="font-medium text-slate-700">{destinationInfo.language}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-xs text-slate-400">Prise électrique</span>
                <p className="font-medium text-slate-700">{destinationInfo.plug_type}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-xs text-slate-400">Urgences</span>
                <p className="font-medium text-slate-700">{destinationInfo.emergency_number}</p>
              </div>
            </div>
            {destinationInfo.useful_info && (
              <p className="mt-3 text-sm text-slate-600 bg-amber-50 rounded-lg p-3 border border-amber-100">
                💡 {destinationInfo.useful_info}
              </p>
            )}
          </Card>
        </div>
      )}

      {activeTab === "checklist" && (
        <div className="space-y-6">
          {(["before_departure", "packing", "during", "after_return"] as const).map((cat) => {
            const items = checklist.filter((c) => c.category === cat);
            if (items.length === 0) return null;
            const categoryLabels: Record<string, string> = {
              before_departure: "Avant le départ",
              packing: "À emporter",
              during: "Pendant le voyage",
              after_return: "Au retour",
            };
            return (
              <Card key={cat}>
                <CardTitle>{categoryLabels[cat]}</CardTitle>
                <div className="mt-3 space-y-2">
                  {items.map((item) => (
                    <label
                      key={item.id}
                      className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={item.status === "completed"}
                        onChange={() => {}}
                        className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span
                        className={cn(
                          "text-sm",
                          item.status === "completed" ? "text-slate-400 line-through" : "text-slate-700"
                        )}
                      >
                        {item.title}
                      </span>
                    </label>
                  ))}
                </div>
              </Card>
            );
          })}
          <Button variant="secondary" className="w-full">
            + Ajouter une tâche
          </Button>
        </div>
      )}

      {activeTab === "budget" && (
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Dépensé</p>
                <p className="text-3xl font-bold text-slate-900">{formatCurrency(totalSpent)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">Budget</p>
                <p className="text-3xl font-bold text-slate-300">{formatCurrency(trip.budget_target)}</p>
              </div>
            </div>
            <Progress
              value={totalSpent}
              max={trip.budget_target}
              color={totalSpent > trip.budget_target ? "error" : "primary"}
              className="mt-4"
              showLabel
            />
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-green-50 p-3 text-center">
                <p className="text-xs text-green-600">Reste</p>
                <p className="text-lg font-bold text-green-700">{formatCurrency(trip.budget_target - totalSpent)}</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 text-center">
                <p className="text-xs text-blue-600">Par personne</p>
                <p className="text-lg font-bold text-blue-700">{formatCurrency(totalSpent / 2)}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 text-center">
                <p className="text-xs text-slate-500">Par jour</p>
                <p className="text-lg font-bold text-slate-700">{formatCurrency(totalSpent / 3)}</p>
              </div>
            </div>
          </Card>

          <Card>
            <CardTitle>Dépenses</CardTitle>
            <div className="mt-3 space-y-3">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between rounded-lg p-2 hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{EXPENSE_CATEGORY_ICONS[expense.category]}</span>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{expense.title}</p>
                      <p className="text-xs text-slate-400">{EXPENSE_CATEGORY_LABELS[expense.category]}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-slate-900">{formatCurrency(expense.amount)}</span>
                </div>
              ))}
            </div>
            <Button variant="secondary" className="mt-4 w-full">
              + Ajouter une dépense
            </Button>
          </Card>
        </div>
      )}

      {activeTab === "restaurants" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {restaurants.length} restaurants recommandés à {trip.destination}
            </p>
          </div>
          {restaurants.map((resto, i) => (
            <Card key={i} hover>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">{resto.name}</h3>
                  <p className="text-sm text-slate-500">{resto.cuisine}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-amber-500">{"★".repeat(Math.floor(resto.rating))}</span>
                    <span className="text-sm text-slate-500">{resto.rating}</span>
                    <span className="text-sm text-slate-300">·</span>
                    <span className="text-sm text-slate-500">{"€".repeat(resto.price)}</span>
                  </div>
                  {resto.dietary.length > 0 && (
                    <div className="mt-2 flex gap-1">
                      {resto.dietary.map((d) => (
                        <Badge key={d} variant="success">{DIETARY_LABELS[d] || d}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "guide" && (
        <div className="space-y-4">
          {/* Destination info */}
          <Card>
            <CardTitle>Infos pratiques — {trip.destination}</CardTitle>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-xs text-slate-400">Devise</span>
                <p className="font-medium text-slate-700">{destinationInfo.currency}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-xs text-slate-400">Langue</span>
                <p className="font-medium text-slate-700">{destinationInfo.language}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-xs text-slate-400">Prise électrique</span>
                <p className="font-medium text-slate-700">{destinationInfo.plug_type}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <span className="text-xs text-slate-400">N° urgences</span>
                <p className="font-medium text-slate-700">{destinationInfo.emergency_number}</p>
              </div>
            </div>
          </Card>

          {/* Useful phrases */}
          <Card>
            <CardTitle>Phrases utiles en portugais</CardTitle>
            <div className="mt-3 space-y-3">
              {phrases.map((phrase, i) => (
                <div key={i} className="rounded-lg bg-slate-50 p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-500">{phrase.original}</p>
                      <p className="font-medium text-slate-900">{phrase.translated}</p>
                      {phrase.phonetic && (
                        <p className="text-xs text-primary-600 italic mt-0.5">🔈 {phrase.phonetic}</p>
                      )}
                    </div>
                    <Badge>{phrase.category}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

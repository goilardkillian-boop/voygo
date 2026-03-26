"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
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
  DIETARY_LABELS,
} from "@voygo/shared";

// ============================================
// DEMO DATA — Two complete trips
// ============================================

const DEMO_TRIPS: Record<string, {
  trip: any;
  checklist: any[];
  expenses: any[];
  restaurants: any[];
  phrases: any[];
  destinationInfo: any;
}> = {
  "1": {
    trip: {
      id: "1",
      title: "Week-end à Lisbonne",
      destination: "Lisbonne",
      destination_country: "Portugal",
      trip_type: "weekend",
      status: "upcoming",
      start_date: "2026-04-18",
      end_date: "2026-04-20",
      budget_target: 600,
      budget_currency: "EUR",
      preparation_score: 72,
    },
    checklist: [
      { id: "1", category: "before_departure", title: "Vérifier la météo", status: "completed" },
      { id: "2", category: "before_departure", title: "Réserver l'hébergement", status: "completed" },
      { id: "3", category: "before_departure", title: "Planifier le trajet", status: "pending" },
      { id: "4", category: "packing", title: "Chargeur de téléphone", status: "completed" },
      { id: "5", category: "packing", title: "Vêtements adaptés à la météo", status: "pending" },
      { id: "6", category: "packing", title: "Carte d'identité / Passeport", status: "completed" },
      { id: "7", category: "packing", title: "Médicaments si besoin", status: "pending" },
      { id: "8", category: "during", title: "Profiter ! 🎉", status: "pending" },
      { id: "9", category: "after_return", title: "Trier les photos", status: "pending" },
    ],
    expenses: [
      { id: "1", title: "Vol Paris-Lisbonne", amount: 180, category: "transport", date: "2026-04-18" },
      { id: "2", title: "Airbnb Alfama", amount: 220, category: "accommodation", date: "2026-04-18" },
      { id: "3", title: "Restaurant Time Out Market", amount: 45, category: "food", date: "2026-04-18" },
    ],
    restaurants: [
      { name: "The Food Temple", cuisine: "Méditerranéen", price: 2, rating: 4.5, dietary: ["vegetarian", "vegan"], description: "Restaurant végétarien/végan dans l'Alfama. Menu qui change chaque jour." },
      { name: "Cervejaria Ramiro", cuisine: "Fruits de mer", price: 3, rating: 4.6, dietary: [], description: "Meilleurs fruits de mer de Lisbonne. Incontournable." },
      { name: "Time Out Market", cuisine: "Varié", price: 2, rating: 4.3, dietary: ["vegetarian", "vegan"], description: "Food hall avec de nombreux stands. Quelque chose pour tout le monde." },
    ],
    phrases: [
      { original: "Bonjour", translated: "Bom dia", phonetic: "Bom dia", category: "greeting" },
      { original: "Bonsoir", translated: "Boa noite", phonetic: "Boa noïtch", category: "greeting" },
      { original: "Merci", translated: "Obrigado / Obrigada", phonetic: "Obrigadou / Obrigada", category: "greeting" },
      { original: "S'il vous plaît", translated: "Por favor", phonetic: "Por favor", category: "greeting" },
      { original: "L'addition, s'il vous plaît", translated: "A conta, por favor", phonetic: "A conta, por favor", category: "restaurant" },
      { original: "Je suis allergique à...", translated: "Sou alérgico/a a...", phonetic: "So alérgico/a a...", category: "restaurant" },
      { original: "De l'eau, s'il vous plaît", translated: "Água, por favor", phonetic: "Agoua, por favor", category: "restaurant" },
      { original: "Où est la station de métro ?", translated: "Onde é a estação de metro?", phonetic: "Ondé é a estasão dé métro?", category: "transport" },
      { original: "J'ai besoin d'aide", translated: "Preciso de ajuda", phonetic: "Précizo dé ajouda", category: "emergency" },
    ],
    destinationInfo: {
      currency: "EUR (€)",
      language: "Portugais",
      plug_type: "Type C/F",
      emergency_number: "112",
      visa_info: "Schengen — pas de visa pour les citoyens UE",
      useful_info: "Très vallonné, prévoir des chaussures confortables. Le tram 28 est incontournable. Pastéis de nata obligatoires.",
    },
  },
  "2": {
    trip: {
      id: "2",
      title: "Vacances au Japon",
      destination: "Tokyo",
      destination_country: "Japon",
      trip_type: "vacation",
      status: "planning",
      start_date: "2026-07-10",
      end_date: "2026-07-24",
      budget_target: 4000,
      budget_currency: "EUR",
      preparation_score: 35,
    },
    checklist: [
      { id: "1", category: "before_departure", title: "Vérifier la validité du passeport", status: "completed" },
      { id: "2", category: "before_departure", title: "Réserver les vols", status: "pending" },
      { id: "3", category: "before_departure", title: "Réserver l'hébergement", status: "pending" },
      { id: "4", category: "before_departure", title: "Vérifier les exigences de visa", status: "completed" },
      { id: "5", category: "before_departure", title: "Souscrire une assurance voyage", status: "pending" },
      { id: "6", category: "before_departure", title: "Prévenir la banque du voyage", status: "pending" },
      { id: "7", category: "before_departure", title: "Planifier le budget", status: "completed" },
      { id: "8", category: "before_departure", title: "Vérifier les vaccinations nécessaires", status: "completed" },
      { id: "9", category: "packing", title: "Passeport", status: "pending" },
      { id: "10", category: "packing", title: "Adaptateur de prise électrique (Type A/B)", status: "pending" },
      { id: "11", category: "packing", title: "Chargeur de téléphone", status: "pending" },
      { id: "12", category: "packing", title: "Trousse de toilette", status: "pending" },
      { id: "13", category: "packing", title: "Médicaments habituels", status: "pending" },
      { id: "14", category: "packing", title: "Copie des documents importants", status: "pending" },
      { id: "15", category: "during", title: "Acheter une Suica card à l'aéroport", status: "pending" },
      { id: "16", category: "during", title: "Garder les reçus pour le budget", status: "pending" },
      { id: "17", category: "after_return", title: "Trier les photos", status: "pending" },
      { id: "18", category: "after_return", title: "Laisser un avis sur les logements", status: "pending" },
      { id: "19", category: "after_return", title: "Faire le bilan du budget", status: "pending" },
    ],
    expenses: [
      { id: "1", title: "Vol Paris-Tokyo (A/R)", amount: 850, category: "transport", date: "2026-07-10" },
      { id: "2", title: "JR Pass 14 jours", amount: 380, category: "transport", date: "2026-07-10" },
      { id: "3", title: "Assurance voyage Chapka", amount: 65, category: "insurance", date: "2026-03-15" },
    ],
    restaurants: [
      { name: "Ichiran Ramen", cuisine: "Japonais — Ramen", price: 1, rating: 4.5, dietary: [], description: "Ramen tonkotsu dans des box individuels. Expérience unique. Personnalisation totale." },
      { name: "Afuri", cuisine: "Japonais — Ramen", price: 2, rating: 4.4, dietary: [], description: "Ramen yuzu shio léger et raffiné. Options végétariennes disponibles." },
      { name: "T's TanTan", cuisine: "Japonais — Végan", price: 1, rating: 4.3, dietary: ["vegan", "vegetarian"], description: "Ramen végan en gare de Tokyo. Parfait entre deux trains." },
    ],
    phrases: [
      { original: "Bonjour", translated: "こんにちは (Konnichiwa)", phonetic: "Konnitchiwa", category: "greeting" },
      { original: "Merci", translated: "ありがとうございます (Arigatou gozaimasu)", phonetic: "Arigatô gozaïmass", category: "greeting" },
      { original: "S'il vous plaît", translated: "お願いします (Onegai shimasu)", phonetic: "Onégaï chimass", category: "greeting" },
      { original: "Excusez-moi", translated: "すみません (Sumimasen)", phonetic: "Soumimasséne", category: "greeting" },
      { original: "L'addition, s'il vous plaît", translated: "お会計お願いします (Okaikei onegai shimasu)", phonetic: "Okaïkéï onégaï chimass", category: "restaurant" },
      { original: "Je suis allergique à...", translated: "...アレルギーがあります (...arerugii ga arimasu)", phonetic: "...aréroguii ga arimass", category: "restaurant" },
      { original: "C'était délicieux", translated: "ごちそうさまでした (Gochisousama deshita)", phonetic: "Gotchisôssama déchta", category: "restaurant" },
      { original: "Où est la gare ?", translated: "駅はどこですか？(Eki wa doko desu ka?)", phonetic: "Éki wa doko déss ka?", category: "transport" },
      { original: "J'ai besoin d'aide", translated: "助けてください (Tasukete kudasai)", phonetic: "Tassketé koudassaï", category: "emergency" },
      { original: "Appelez une ambulance", translated: "救急車を呼んでください", phonetic: "Kioukyoucha wo yondé koudassaï", category: "emergency" },
    ],
    destinationInfo: {
      currency: "JPY (¥)",
      language: "Japonais",
      plug_type: "Type A/B",
      emergency_number: "110 (police) / 119 (ambulance)",
      visa_info: "Visa touriste 90 jours gratuit pour les citoyens UE",
      useful_info: "Le cash reste très utilisé. Suica/Pasmo card pour les transports. Respecter les files d'attente. Les pourboires ne se font pas au Japon.",
    },
  },
};

// --- Tabs ---
const tabs = [
  { id: "overview", label: "Aperçu", icon: MapPin },
  { id: "checklist", label: "Checklist", icon: CheckCircle },
  { id: "budget", label: "Budget", icon: Wallet },
  { id: "restaurants", label: "Restaurants", icon: BookOpen },
  { id: "guide", label: "Guide", icon: Globe },
];

const categoryLabels: Record<string, string> = {
  before_departure: "Avant le départ",
  packing: "À emporter",
  during: "Pendant le voyage",
  after_return: "Au retour",
};

export default function TripDetailPage() {
  const params = useParams();
  const tripId = params.id as string;
  const data = DEMO_TRIPS[tripId] || DEMO_TRIPS["1"];

  const { trip, checklist, expenses, restaurants, phrases, destinationInfo } = data;

  const [activeTab, setActiveTab] = useState("overview");
  const [checklistState, setChecklistState] = useState(checklist);

  const days = daysUntil(trip.start_date);
  const totalSpent = expenses.reduce((sum: number, e: any) => sum + e.amount, 0);
  const completedTasks = checklistState.filter((c: any) => c.status === "completed").length;
  const scoreColor = trip.preparation_score >= 80 ? "success" as const : trip.preparation_score >= 50 ? "warning" as const : "error" as const;

  function toggleChecklistItem(id: string) {
    setChecklistState((prev: any[]) =>
      prev.map((item: any) =>
        item.id === id
          ? { ...item, status: item.status === "completed" ? "pending" : "completed" }
          : item
      )
    );
  }

  const currentScore = Math.round((completedTasks / checklistState.length) * 100);

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
              <Badge variant={trip.status === "upcoming" ? "warning" : "info"}>
                {days > 0 ? `J-${days}` : days === 0 ? "C'est aujourd'hui !" : "Passé"}
              </Badge>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {trip.destination}, {trip.destination_country}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(trip.start_date, { day: "numeric", month: "short" })} — {formatDate(trip.end_date, { day: "numeric", month: "short", year: "numeric" })}
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

      {/* ==================== OVERVIEW ==================== */}
      {activeTab === "overview" && (
        <div className="space-y-4">
          <Card>
            <div className="flex items-center justify-between mb-2">
              <CardTitle>Score de préparation</CardTitle>
              <span className="text-2xl font-bold text-slate-900">{currentScore}%</span>
            </div>
            <Progress value={currentScore} color={currentScore >= 80 ? "success" : currentScore >= 50 ? "warning" : "error"} />
            <p className="mt-2 text-sm text-slate-500">
              {completedTasks}/{checklistState.length} tâches complétées
            </p>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
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

            <Card>
              <CardTitle>Prochaines tâches</CardTitle>
              <div className="mt-2 space-y-2">
                {checklistState
                  .filter((c: any) => c.status === "pending")
                  .slice(0, 3)
                  .map((item: any) => (
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

          {/* Bookings */}
          <Card>
            <CardTitle>Réservations</CardTitle>
            <div className="mt-3 space-y-3">
              {expenses.filter((e: any) => e.category === "transport" || e.category === "accommodation" || e.category === "insurance").map((booking: any) => (
                <div key={booking.id} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{EXPENSE_CATEGORY_ICONS[booking.category]}</span>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{booking.title}</p>
                      <p className="text-xs text-slate-400">{booking.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-slate-900">{formatCurrency(booking.amount)}</span>
                    <div><Badge variant="success">Confirmé</Badge></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

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
            {destinationInfo.visa_info && (
              <p className="mt-3 text-sm text-slate-600 bg-blue-50 rounded-lg p-3 border border-blue-100">
                🛂 {destinationInfo.visa_info}
              </p>
            )}
            {destinationInfo.useful_info && (
              <p className="mt-2 text-sm text-slate-600 bg-amber-50 rounded-lg p-3 border border-amber-100">
                💡 {destinationInfo.useful_info}
              </p>
            )}
          </Card>
        </div>
      )}

      {/* ==================== CHECKLIST ==================== */}
      {activeTab === "checklist" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {completedTasks}/{checklistState.length} tâches complétées
            </p>
            <Badge variant={currentScore >= 80 ? "success" : currentScore >= 50 ? "warning" : "error"}>
              {currentScore}%
            </Badge>
          </div>

          {(["before_departure", "packing", "during", "after_return"] as const).map((cat) => {
            const items = checklistState.filter((c: any) => c.category === cat);
            if (items.length === 0) return null;
            const catCompleted = items.filter((i: any) => i.status === "completed").length;
            return (
              <Card key={cat}>
                <div className="flex items-center justify-between">
                  <CardTitle>{categoryLabels[cat]}</CardTitle>
                  <span className="text-xs text-slate-400">{catCompleted}/{items.length}</span>
                </div>
                <div className="mt-3 space-y-1">
                  {items.map((item: any) => (
                    <label
                      key={item.id}
                      className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-slate-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={item.status === "completed"}
                        onChange={() => toggleChecklistItem(item.id)}
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

      {/* ==================== BUDGET ==================== */}
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
                <p className="text-lg font-bold text-slate-700">
                  {formatCurrency(totalSpent / Math.max(1, Math.ceil((new Date(trip.end_date).getTime() - new Date(trip.start_date).getTime()) / (1000 * 60 * 60 * 24))))}
                </p>
              </div>
            </div>
          </Card>

          {/* By category chart */}
          <Card>
            <CardTitle>Par catégorie</CardTitle>
            <div className="mt-3 space-y-3">
              {Object.entries(
                expenses.reduce((acc: Record<string, number>, e: any) => {
                  acc[e.category] = (acc[e.category] || 0) + e.amount;
                  return acc;
                }, {})
              ).map(([cat, amount]) => (
                <div key={cat}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">
                      <span>{EXPENSE_CATEGORY_ICONS[cat]}</span>
                      <span className="text-slate-700">{EXPENSE_CATEGORY_LABELS[cat]}</span>
                    </span>
                    <span className="font-medium text-slate-900">{formatCurrency(amount as number)}</span>
                  </div>
                  <Progress value={amount as number} max={totalSpent} color="primary" />
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardTitle>Toutes les dépenses</CardTitle>
            <div className="mt-3 space-y-3">
              {expenses.map((expense: any) => (
                <div key={expense.id} className="flex items-center justify-between rounded-lg p-2 hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{EXPENSE_CATEGORY_ICONS[expense.category]}</span>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{expense.title}</p>
                      <p className="text-xs text-slate-400">{EXPENSE_CATEGORY_LABELS[expense.category]} · {expense.date}</p>
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

      {/* ==================== RESTAURANTS ==================== */}
      {activeTab === "restaurants" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {restaurants.length} restaurants recommandés à {trip.destination}
            </p>
          </div>
          {restaurants.map((resto: any, i: number) => (
            <Card key={i} hover>
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-slate-900">{resto.name}</h3>
                  <span className="text-sm font-medium text-slate-500">{"€".repeat(resto.price)}</span>
                </div>
                <p className="text-sm text-slate-500">{resto.cuisine}</p>
                {resto.description && (
                  <p className="mt-1 text-sm text-slate-600">{resto.description}</p>
                )}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-amber-500">{"★".repeat(Math.floor(resto.rating))}</span>
                  <span className="text-sm text-slate-500">{resto.rating}/5</span>
                </div>
                {resto.dietary.length > 0 && (
                  <div className="mt-2 flex gap-1">
                    {resto.dietary.map((d: string) => (
                      <Badge key={d} variant="success">{DIETARY_LABELS[d] || d}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* ==================== GUIDE ==================== */}
      {activeTab === "guide" && (
        <div className="space-y-4">
          <Card>
            <CardTitle>Infos pratiques — {trip.destination}, {trip.destination_country}</CardTitle>
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
            {destinationInfo.visa_info && (
              <p className="mt-3 text-sm text-slate-600 bg-blue-50 rounded-lg p-3 border border-blue-100">
                🛂 {destinationInfo.visa_info}
              </p>
            )}
            {destinationInfo.useful_info && (
              <p className="mt-2 text-sm text-slate-600 bg-amber-50 rounded-lg p-3 border border-amber-100">
                💡 {destinationInfo.useful_info}
              </p>
            )}
          </Card>

          {/* Phrases by category */}
          {(["greeting", "restaurant", "transport", "emergency"] as const).map((cat) => {
            const catPhrases = phrases.filter((p: any) => p.category === cat);
            if (catPhrases.length === 0) return null;
            const catLabels: Record<string, string> = {
              greeting: "Salutations",
              restaurant: "Au restaurant",
              transport: "Transport",
              emergency: "Urgences",
            };
            const catIcons: Record<string, string> = {
              greeting: "👋",
              restaurant: "🍽️",
              transport: "🚇",
              emergency: "🚨",
            };
            return (
              <Card key={cat}>
                <CardTitle>{catIcons[cat]} {catLabels[cat]}</CardTitle>
                <div className="mt-3 space-y-2">
                  {catPhrases.map((phrase: any, i: number) => (
                    <div key={i} className="rounded-lg bg-slate-50 p-3">
                      <p className="text-sm text-slate-500">{phrase.original}</p>
                      <p className="font-medium text-slate-900">{phrase.translated}</p>
                      {phrase.phonetic && (
                        <p className="text-xs text-primary-600 italic mt-0.5">🔈 {phrase.phonetic}</p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { Plus, MapPin, Calendar, Wallet, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency, formatDate, daysUntil } from "@/lib/utils";
import { TRIP_TYPE_LABELS } from "@voygo/shared";
import type { Trip } from "@voygo/shared";

// Demo data — will be replaced by Supabase queries
const DEMO_TRIPS: Trip[] = [
  {
    id: "1",
    owner_id: "demo",
    title: "Week-end à Lisbonne",
    destination: "Lisbonne",
    destination_country: "Portugal",
    destination_lat: 38.7223,
    destination_lng: -9.1393,
    cover_image_url: null,
    trip_type: "weekend",
    status: "upcoming",
    start_date: "2026-04-18",
    end_date: "2026-04-20",
    budget_target: 600,
    budget_currency: "EUR",
    notes: null,
    preparation_score: 72,
    created_at: "2026-03-20T10:00:00Z",
    updated_at: "2026-03-25T10:00:00Z",
  },
  {
    id: "2",
    owner_id: "demo",
    title: "Vacances au Japon",
    destination: "Tokyo",
    destination_country: "Japon",
    destination_lat: 35.6762,
    destination_lng: 139.6503,
    cover_image_url: null,
    trip_type: "vacation",
    status: "planning",
    start_date: "2026-07-10",
    end_date: "2026-07-24",
    budget_target: 4000,
    budget_currency: "EUR",
    notes: null,
    preparation_score: 35,
    created_at: "2026-03-15T10:00:00Z",
    updated_at: "2026-03-24T10:00:00Z",
  },
];

const statusBadge = (status: string) => {
  switch (status) {
    case "planning":
      return <Badge variant="info">En préparation</Badge>;
    case "upcoming":
      return <Badge variant="warning">Bientôt</Badge>;
    case "ongoing":
      return <Badge variant="success">En cours</Badge>;
    case "completed":
      return <Badge>Terminé</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

function TripCard({ trip }: { trip: Trip }) {
  const days = daysUntil(trip.start_date);
  const scoreColor =
    trip.preparation_score >= 80 ? "success" : trip.preparation_score >= 50 ? "warning" : "error";

  return (
    <Link href={`/trips/${trip.id}`}>
      <Card hover className="group">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                {trip.title}
              </h3>
              {statusBadge(trip.status)}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {trip.destination}, {trip.destination_country}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(trip.start_date, { day: "numeric", month: "short" })} — {formatDate(trip.end_date, { day: "numeric", month: "short", year: "numeric" })}
              </span>
              {trip.budget_target && (
                <span className="flex items-center gap-1">
                  <Wallet className="h-3.5 w-3.5" />
                  {formatCurrency(trip.budget_target, trip.budget_currency)}
                </span>
              )}
            </div>
            <div className="mt-1 text-xs text-slate-400">
              {TRIP_TYPE_LABELS[trip.trip_type] || trip.trip_type}
              {days > 0 && ` · Dans ${days} jours`}
              {days === 0 && " · C'est aujourd'hui !"}
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-primary-500 transition-colors" />
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Préparation</span>
            <span className="font-medium">{trip.preparation_score}%</span>
          </div>
          <Progress value={trip.preparation_score} color={scoreColor} />
        </div>
      </Card>
    </Link>
  );
}

export default function DashboardPage() {
  const trips = DEMO_TRIPS; // Replace with useQuery

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Mes voyages</h1>
          <p className="mt-1 text-sm text-slate-500">
            {trips.length} voyage{trips.length > 1 ? "s" : ""} planifié{trips.length > 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/trips/new"
          className="flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          Nouveau voyage
        </Link>
      </div>

      {trips.length === 0 ? (
        <EmptyState
          icon={<MapPin className="h-8 w-8" />}
          title="Aucun voyage pour le moment"
          description="Crée ton premier voyage et commence à planifier une expérience inoubliable."
          action={{
            label: "Créer un voyage",
            onClick: () => (window.location.href = "/trips/new"),
          }}
        />
      ) : (
        <div className="mt-6 space-y-4">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}

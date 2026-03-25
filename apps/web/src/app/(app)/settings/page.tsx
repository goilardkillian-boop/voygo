"use client";

import { Bell, Shield, CreditCard, LogOut, ChevronRight } from "lucide-react";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PREMIUM_PRICE } from "@voygo/shared";

const settingsGroups = [
  {
    title: "Notifications",
    icon: Bell,
    description: "Rappels, invitations, mises à jour",
    href: "/settings/notifications",
  },
  {
    title: "Confidentialité & sécurité",
    icon: Shield,
    description: "Mot de passe, données, suppression de compte",
    href: "/settings/privacy",
  },
];

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Paramètres</h1>
        <p className="mt-1 text-sm text-slate-500">Gère ton compte et tes préférences</p>
      </div>

      {/* Premium */}
      <Card className="border-primary-200 bg-gradient-to-r from-primary-50 to-accent-50">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle>Voygo Premium</CardTitle>
              <Badge variant="info">Gratuit actuellement</Badge>
            </div>
            <p className="mt-1 text-sm text-slate-600">
              Collaboration multi, documents, export PDF, sync calendrier et plus encore.
            </p>
            <p className="mt-2 text-lg font-bold text-primary-700">
              {PREMIUM_PRICE.monthly}€/mois
              <span className="text-sm font-normal text-slate-500"> ou {PREMIUM_PRICE.yearly}€/an</span>
            </p>
          </div>
        </div>
        <Button className="mt-4 w-full">
          <CreditCard className="h-4 w-4" />
          Passer en Premium
        </Button>
      </Card>

      {/* Settings list */}
      <div className="space-y-2">
        {settingsGroups.map((group) => (
          <Card key={group.title} hover className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                <group.icon className="h-5 w-5 text-slate-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">{group.title}</p>
                <p className="text-xs text-slate-500">{group.description}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </div>
          </Card>
        ))}
      </div>

      {/* Logout */}
      <Button variant="ghost" className="w-full text-red-600 hover:text-red-700 hover:bg-red-50">
        <LogOut className="h-4 w-4" />
        Se déconnecter
      </Button>

      <p className="text-center text-xs text-slate-400">
        Voygo v0.1.0 — Fait avec soin
      </p>
    </div>
  );
}

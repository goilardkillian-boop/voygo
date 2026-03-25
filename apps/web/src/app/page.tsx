import Link from "next/link";
import { redirect } from "next/navigation";
import { MapPin, CheckCircle, Wallet, Users, BookOpen, Globe } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Checklist intelligente",
    description: "Des listes générées automatiquement selon ton type de voyage. Plus rien à oublier.",
  },
  {
    icon: Wallet,
    title: "Budget maîtrisé",
    description: "Budget cible, suivi des dépenses, répartition par personne et par catégorie.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Invite tes proches à co-organiser. Chacun voit les tâches, le budget et le planning.",
  },
  {
    icon: BookOpen,
    title: "Guide & restaurants",
    description: "Infos pratiques, restaurants adaptés à tes allergies et préférences alimentaires.",
  },
  {
    icon: Globe,
    title: "Phrases utiles",
    description: "Les expressions essentielles dans la langue locale, avec prononciation phonétique.",
  },
  {
    icon: MapPin,
    title: "Tout au même endroit",
    description: "Réservations, documents, planning, rappels — fini les 10 apps et onglets ouverts.",
  },
];

export default function LandingPage() {
  // Auto-redirect to dashboard in demo mode
  redirect("/dashboard");
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-100">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
              <MapPin className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">Voygo</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Connexion
            </Link>
            <Link
              href="/signup"
              className="rounded-xl bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700"
            >
              Commencer gratuitement
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
            Ton voyage,
            <br />
            <span className="text-primary-600">parfaitement organisé.</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 sm:text-xl">
            Planifie, organise et partage tes voyages sans stress.
            Checklist, budget, restaurants, guide et collaboration — tout au même endroit.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/signup"
              className="w-full rounded-xl bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-primary-700 sm:w-auto"
            >
              Commencer gratuitement
            </Link>
            <Link
              href="#features"
              className="w-full rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 sm:w-auto"
            >
              Découvrir les fonctionnalités
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Gratuit — Aucune carte bancaire requise
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-slate-100 bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Tout ce dont tu as besoin pour voyager sereinement
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Un assistant de voyage intelligent qui pense à tout pour toi.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50">
                  <feature.icon className="h-5 w-5 text-primary-600" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold text-slate-900">
            Prêt à organiser ton prochain voyage ?
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Rejoins Voygo et transforme la planification de tes voyages.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-block rounded-xl bg-primary-600 px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-primary-700"
          >
            Créer mon compte gratuitement
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary-600">
                <MapPin className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm font-semibold text-slate-900">Voygo</span>
            </div>
            <p className="text-sm text-slate-400">
              &copy; {new Date().getFullYear()} Voygo. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

# Voygo — Ton voyage, parfaitement organisé.

Voygo est un assistant de voyage intelligent qui centralise planification, collaboration, budget, contraintes personnelles et logistique dans une seule expérience fluide.

## Architecture

```
voygo/
├── apps/
│   ├── web/          # Next.js 15 (App Router)
│   └── mobile/       # Expo React Native (Expo Router)
├── packages/
│   ├── shared/       # Types, schemas Zod, constantes (partagés web/mobile)
│   └── db/           # Migrations SQL et seed data (Supabase/PostgreSQL)
├── turbo.json        # Turborepo config
└── package.json      # Workspace root
```

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Monorepo | Turborepo |
| Web | Next.js 15, Tailwind CSS v4, TypeScript |
| Mobile | Expo SDK 52, React Native, NativeWind |
| Backend & DB | Supabase (PostgreSQL, Auth, Storage, RLS) |
| Validation | Zod (partagé) |
| Data fetching | TanStack Query |
| State | Zustand |
| Auth | Supabase Auth (email + Google OAuth) |
| Paiement | Stripe (V2) |
| CI/CD | GitHub Actions |
| Déploiement web | Vercel |
| Déploiement mobile | EAS Build |

## Démarrage rapide

### Prérequis

- Node.js >= 20
- npm >= 10
- Compte [Supabase](https://supabase.com) (gratuit)

### Installation

```bash
# Cloner le repo
git clone https://github.com/goilardkillian-boop/voygo.git
cd voygo

# Installer les dépendances
npm install
```

### Configuration Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Copier les variables d'environnement :

```bash
cp apps/web/.env.example apps/web/.env.local
```

3. Remplir `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Exécuter les migrations dans l'éditeur SQL Supabase :
   - `packages/db/migrations/001_initial_schema.sql`
5. Exécuter les seed data :
   - `packages/db/seed/001_destinations.sql`
   - `packages/db/seed/002_useful_phrases.sql`
   - `packages/db/seed/003_restaurants.sql`

### Lancer le projet

```bash
# Web (Next.js)
npm run dev:web

# Mobile (Expo)
npm run dev:mobile
```

L'app web sera disponible sur `http://localhost:3000`.

## Fonctionnalités MVP

- **Création de voyage** — destination, dates, type, budget
- **Checklist intelligente** — générée automatiquement selon le type de voyage
- **Budget** — cible, dépenses par catégorie, répartition par personne
- **Préférences alimentaires** — allergies, régimes, goûts
- **Restaurants** — recommandations filtrées par préférences (données curatées)
- **Guide pratique** — infos pays, phrases utiles avec prononciation
- **Collaboration** — inviter 1 co-voyageur (gratuit)
- **Score de préparation** — suivi visuel de l'avancement
- **Réservations** — saisie manuelle des confirmations
- **Rappels** — avant départ et pendant le voyage

## Roadmap

| Phase | Contenu |
|-------|---------|
| **MVP** | Voyages, checklist, budget, restaurants, guide, collaboration (1 invité) |
| **V2** | Deep links transport/hébergement, sync Google Calendar, documents, export PDF, premium Stripe |
| **V3** | IA suggestions, codes promo affiliés, mode hors ligne, météo, carte interactive |

## Ce qui est mocké dans le MVP

- Données restaurants : base curatée manuelle (Google Places API en V2)
- Comparaison vols/hôtels : non présent, saisie manuelle des réservations
- Traduction : dictionnaire pré-établi par langue (API en V3)
- Codes promo : non présent en MVP

## Monétisation

| Plan | Fonctionnalités |
|------|----------------|
| **Gratuit** | Voyages illimités, 1 co-voyageur, toutes les features core |
| **Premium** (4.99€/mois) | Multi-participants (10), documents, export PDF, sync calendrier, mode hors ligne |

## Licence

Propriétaire — Tous droits réservés.

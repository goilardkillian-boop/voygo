// ============================================
// VOYGO — Constants & Seed Data
// ============================================

export const APP_NAME = "Voygo";
export const APP_TAGLINE = "Ton voyage, parfaitement organisé.";

export const CURRENCIES = [
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "USD", symbol: "$", name: "Dollar US" },
  { code: "GBP", symbol: "£", name: "Livre sterling" },
  { code: "CHF", symbol: "CHF", name: "Franc suisse" },
  { code: "CAD", symbol: "CA$", name: "Dollar canadien" },
  { code: "JPY", symbol: "¥", name: "Yen" },
  { code: "MAD", symbol: "MAD", name: "Dirham marocain" },
  { code: "TRY", symbol: "₺", name: "Livre turque" },
  { code: "THB", symbol: "฿", name: "Baht thaïlandais" },
] as const;

export const DIETARY_LABELS: Record<string, string> = {
  vegetarian: "Végétarien",
  vegan: "Végan",
  pescatarian: "Pescatarien",
  halal: "Halal",
  kosher: "Casher",
  gluten_free: "Sans gluten",
  lactose_free: "Sans lactose",
  none: "Aucun régime",
};

export const ALLERGY_LABELS: Record<string, string> = {
  gluten: "Gluten",
  nuts: "Fruits à coque",
  peanuts: "Arachides",
  dairy: "Produits laitiers",
  eggs: "Œufs",
  shellfish: "Crustacés",
  fish: "Poisson",
  soy: "Soja",
  sesame: "Sésame",
  other: "Autre",
};

export const EXPENSE_CATEGORY_LABELS: Record<string, string> = {
  transport: "Transport",
  accommodation: "Hébergement",
  food: "Restauration",
  activities: "Activités",
  shopping: "Shopping",
  insurance: "Assurance",
  visa: "Visa / Formalités",
  other: "Autre",
};

export const EXPENSE_CATEGORY_ICONS: Record<string, string> = {
  transport: "✈️",
  accommodation: "🏨",
  food: "🍽️",
  activities: "🎭",
  shopping: "🛍️",
  insurance: "🛡️",
  visa: "📋",
  other: "📌",
};

export const TRIP_TYPE_LABELS: Record<string, string> = {
  weekend: "Week-end",
  vacation: "Vacances",
  daytrip: "Sortie",
  business: "Voyage d'affaires",
  roadtrip: "Road trip",
};

export const BOOKING_TYPE_LABELS: Record<string, string> = {
  flight: "Vol",
  train: "Train",
  bus: "Bus",
  car_rental: "Location voiture",
  hotel: "Hôtel",
  apartment: "Appartement",
  activity: "Activité",
};

// Default checklist templates by trip type
export const CHECKLIST_TEMPLATES: Record<string, { category: string; title: string }[]> = {
  weekend: [
    { category: "before_departure", title: "Vérifier la météo" },
    { category: "before_departure", title: "Réserver l'hébergement" },
    { category: "before_departure", title: "Planifier le trajet" },
    { category: "packing", title: "Chargeur de téléphone" },
    { category: "packing", title: "Vêtements adaptés à la météo" },
    { category: "packing", title: "Carte d'identité / Passeport" },
    { category: "packing", title: "Médicaments si besoin" },
    { category: "during", title: "Profiter ! 🎉" },
    { category: "after_return", title: "Trier les photos" },
  ],
  vacation: [
    { category: "before_departure", title: "Vérifier la validité du passeport" },
    { category: "before_departure", title: "Réserver les vols" },
    { category: "before_departure", title: "Réserver l'hébergement" },
    { category: "before_departure", title: "Vérifier les exigences de visa" },
    { category: "before_departure", title: "Souscrire une assurance voyage" },
    { category: "before_departure", title: "Prévenir la banque du voyage" },
    { category: "before_departure", title: "Planifier le budget" },
    { category: "before_departure", title: "Vérifier les vaccinations nécessaires" },
    { category: "packing", title: "Passeport" },
    { category: "packing", title: "Billets d'avion / confirmations" },
    { category: "packing", title: "Adaptateur de prise électrique" },
    { category: "packing", title: "Chargeur de téléphone" },
    { category: "packing", title: "Vêtements (checklist séparée)" },
    { category: "packing", title: "Trousse de toilette" },
    { category: "packing", title: "Médicaments habituels" },
    { category: "packing", title: "Copie des documents importants" },
    { category: "during", title: "Garder les reçus pour le budget" },
    { category: "during", title: "Envoyer une carte postale ✉️" },
    { category: "after_return", title: "Trier les photos" },
    { category: "after_return", title: "Laisser un avis sur les logements" },
    { category: "after_return", title: "Faire le bilan du budget" },
  ],
  daytrip: [
    { category: "before_departure", title: "Vérifier la météo" },
    { category: "before_departure", title: "Planifier le trajet" },
    { category: "before_departure", title: "Réserver les activités" },
    { category: "packing", title: "Téléphone chargé" },
    { category: "packing", title: "Bouteille d'eau" },
    { category: "packing", title: "En-cas" },
    { category: "during", title: "Prendre des photos" },
  ],
  business: [
    { category: "before_departure", title: "Confirmer les réunions" },
    { category: "before_departure", title: "Réserver transport et hôtel" },
    { category: "before_departure", title: "Préparer les documents de travail" },
    { category: "packing", title: "Ordinateur portable + chargeur" },
    { category: "packing", title: "Tenue professionnelle" },
    { category: "packing", title: "Cartes de visite" },
    { category: "packing", title: "Adaptateur de prise" },
    { category: "after_return", title: "Note de frais" },
  ],
  roadtrip: [
    { category: "before_departure", title: "Faire réviser la voiture" },
    { category: "before_departure", title: "Planifier l'itinéraire" },
    { category: "before_departure", title: "Réserver les étapes clés" },
    { category: "before_departure", title: "Télécharger des playlists / podcasts" },
    { category: "packing", title: "Permis de conduire" },
    { category: "packing", title: "Câble AUX / Bluetooth" },
    { category: "packing", title: "Glacière + snacks" },
    { category: "packing", title: "Trousse de premiers secours" },
    { category: "packing", title: "Carte routière (backup)" },
    { category: "during", title: "Alterner les conducteurs" },
    { category: "during", title: "Faire des pauses régulières" },
    { category: "after_return", title: "Vérifier l'état de la voiture" },
  ],
};

// Free plan limits
export const FREE_PLAN_LIMITS = {
  max_trip_members: 2, // owner + 1 invited
  max_documents_per_trip: 0,
  can_export_pdf: false,
  can_sync_calendar: false,
  can_offline_mode: false,
} as const;

export const PREMIUM_PLAN_LIMITS = {
  max_trip_members: 10,
  max_documents_per_trip: 50,
  can_export_pdf: true,
  can_sync_calendar: true,
  can_offline_mode: true,
} as const;

export const PREMIUM_PRICE = {
  monthly: 4.99,
  yearly: 39.99,
  currency: "EUR",
} as const;

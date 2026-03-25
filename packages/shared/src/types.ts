// ============================================
// VOYGO — Core Domain Types
// ============================================

// --- Enums ---

export type TripType = "weekend" | "vacation" | "daytrip" | "business" | "roadtrip";

export type TripStatus = "planning" | "upcoming" | "ongoing" | "completed" | "cancelled";

export type MemberRole = "owner" | "editor" | "viewer";

export type ChecklistCategory = "before_departure" | "packing" | "during" | "after_return";

export type ChecklistItemStatus = "pending" | "completed" | "skipped";

export type ExpenseCategory =
  | "transport"
  | "accommodation"
  | "food"
  | "activities"
  | "shopping"
  | "insurance"
  | "visa"
  | "other";

export type BookingType = "flight" | "train" | "bus" | "car_rental" | "hotel" | "apartment" | "activity";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type DietaryType =
  | "vegetarian"
  | "vegan"
  | "pescatarian"
  | "halal"
  | "kosher"
  | "gluten_free"
  | "lactose_free"
  | "none";

export type AllergyType =
  | "gluten"
  | "nuts"
  | "peanuts"
  | "dairy"
  | "eggs"
  | "shellfish"
  | "fish"
  | "soy"
  | "sesame"
  | "other";

export type CuisineType =
  | "french"
  | "italian"
  | "japanese"
  | "chinese"
  | "indian"
  | "mexican"
  | "thai"
  | "mediterranean"
  | "american"
  | "korean"
  | "vietnamese"
  | "middle_eastern"
  | "african"
  | "local";

export type PhraseCategory = "greeting" | "restaurant" | "transport" | "emergency" | "shopping" | "directions" | "general";

// --- Entities ---

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  preferred_currency: string;
  preferred_language: string;
  dietary_type: DietaryType;
  allergies: AllergyType[];
  favorite_cuisines: CuisineType[];
  is_premium: boolean;
  created_at: string;
  updated_at: string;
}

export interface Trip {
  id: string;
  owner_id: string;
  title: string;
  destination: string;
  destination_country: string;
  destination_lat: number | null;
  destination_lng: number | null;
  cover_image_url: string | null;
  trip_type: TripType;
  status: TripStatus;
  start_date: string;
  end_date: string;
  budget_target: number | null;
  budget_currency: string;
  notes: string | null;
  preparation_score: number;
  created_at: string;
  updated_at: string;
}

export interface TripMember {
  id: string;
  trip_id: string;
  user_id: string;
  role: MemberRole;
  invited_email: string | null;
  accepted: boolean;
  created_at: string;
}

export interface ChecklistItem {
  id: string;
  trip_id: string;
  category: ChecklistCategory;
  title: string;
  description: string | null;
  status: ChecklistItemStatus;
  assigned_to: string | null;
  due_date: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Expense {
  id: string;
  trip_id: string;
  created_by: string;
  title: string;
  amount: number;
  currency: string;
  category: ExpenseCategory;
  paid_by: string | null;
  split_between: string[];
  date: string;
  notes: string | null;
  receipt_url: string | null;
  created_at: string;
}

export interface Booking {
  id: string;
  trip_id: string;
  type: BookingType;
  title: string;
  provider: string | null;
  confirmation_number: string | null;
  status: BookingStatus;
  start_datetime: string;
  end_datetime: string | null;
  location: string | null;
  price: number | null;
  currency: string;
  booking_url: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface CalendarEvent {
  id: string;
  trip_id: string;
  title: string;
  description: string | null;
  start_datetime: string;
  end_datetime: string;
  location: string | null;
  color: string | null;
  created_at: string;
}

export interface Restaurant {
  id: string;
  destination: string;
  name: string;
  cuisine_type: CuisineType;
  price_range: 1 | 2 | 3 | 4;
  rating: number;
  address: string;
  lat: number | null;
  lng: number | null;
  phone: string | null;
  website: string | null;
  maps_url: string | null;
  dietary_options: DietaryType[];
  allergen_friendly: AllergyType[];
  description: string | null;
  image_url: string | null;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  country_code: string;
  currency: string;
  language: string;
  timezone: string;
  plug_type: string | null;
  visa_info: string | null;
  emergency_number: string;
  useful_info: string | null;
  image_url: string | null;
  lat: number;
  lng: number;
}

export interface UsefulPhrase {
  id: string;
  language: string;
  category: PhraseCategory;
  original: string;
  translated: string;
  phonetic: string | null;
  sort_order: number;
}

export interface Reminder {
  id: string;
  trip_id: string;
  user_id: string;
  title: string;
  message: string | null;
  remind_at: string;
  is_sent: boolean;
  created_at: string;
}

// --- Computed / UI types ---

export interface TripWithMembers extends Trip {
  members: (TripMember & { profile: Pick<Profile, "full_name" | "avatar_url" | "email"> })[];
}

export interface BudgetSummary {
  target: number;
  spent: number;
  remaining: number;
  currency: string;
  by_category: Record<ExpenseCategory, number>;
  per_person: number;
  member_count: number;
}

export interface PreparationScore {
  score: number; // 0-100
  total_tasks: number;
  completed_tasks: number;
  has_bookings: boolean;
  has_budget: boolean;
  days_until_departure: number;
  missing_items: string[];
}

import { z } from "zod";

// ============================================
// VOYGO — Zod Validation Schemas
// ============================================

export const tripTypeSchema = z.enum(["weekend", "vacation", "daytrip", "business", "roadtrip"]);

export const expenseCategorySchema = z.enum([
  "transport", "accommodation", "food", "activities", "shopping", "insurance", "visa", "other",
]);

export const dietaryTypeSchema = z.enum([
  "vegetarian", "vegan", "pescatarian", "halal", "kosher", "gluten_free", "lactose_free", "none",
]);

export const allergyTypeSchema = z.enum([
  "gluten", "nuts", "peanuts", "dairy", "eggs", "shellfish", "fish", "soy", "sesame", "other",
]);

// --- Trip ---

export const createTripSchema = z.object({
  title: z.string().min(1, "Le titre est requis").max(100),
  destination: z.string().min(1, "La destination est requise").max(200),
  destination_country: z.string().min(1).max(100),
  destination_lat: z.number().nullable().optional(),
  destination_lng: z.number().nullable().optional(),
  trip_type: tripTypeSchema,
  start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide"),
  end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide"),
  budget_target: z.number().min(0).nullable().optional(),
  budget_currency: z.string().length(3).default("EUR"),
  notes: z.string().max(2000).nullable().optional(),
}).refine(
  (data) => new Date(data.end_date) >= new Date(data.start_date),
  { message: "La date de fin doit être après la date de début", path: ["end_date"] }
);

export const updateTripSchema = createTripSchema.partial();

// --- Expense ---

export const createExpenseSchema = z.object({
  trip_id: z.string().uuid(),
  title: z.string().min(1, "Le titre est requis").max(200),
  amount: z.number().min(0.01, "Le montant doit être positif"),
  currency: z.string().length(3).default("EUR"),
  category: expenseCategorySchema,
  paid_by: z.string().uuid().nullable().optional(),
  split_between: z.array(z.string().uuid()).optional().default([]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  notes: z.string().max(500).nullable().optional(),
});

// --- Checklist ---

export const createChecklistItemSchema = z.object({
  trip_id: z.string().uuid(),
  category: z.enum(["before_departure", "packing", "during", "after_return"]),
  title: z.string().min(1).max(200),
  description: z.string().max(500).nullable().optional(),
  assigned_to: z.string().uuid().nullable().optional(),
  due_date: z.string().nullable().optional(),
  sort_order: z.number().int().min(0).default(0),
});

// --- Booking ---

export const createBookingSchema = z.object({
  trip_id: z.string().uuid(),
  type: z.enum(["flight", "train", "bus", "car_rental", "hotel", "apartment", "activity"]),
  title: z.string().min(1).max(200),
  provider: z.string().max(100).nullable().optional(),
  confirmation_number: z.string().max(100).nullable().optional(),
  status: z.enum(["pending", "confirmed", "cancelled"]).default("pending"),
  start_datetime: z.string(),
  end_datetime: z.string().nullable().optional(),
  location: z.string().max(300).nullable().optional(),
  price: z.number().min(0).nullable().optional(),
  currency: z.string().length(3).default("EUR"),
  booking_url: z.string().url().nullable().optional(),
  notes: z.string().max(1000).nullable().optional(),
});

// --- Profile ---

export const updateProfileSchema = z.object({
  full_name: z.string().min(1).max(100).optional(),
  preferred_currency: z.string().length(3).optional(),
  preferred_language: z.string().min(2).max(5).optional(),
  dietary_type: dietaryTypeSchema.optional(),
  allergies: z.array(allergyTypeSchema).optional(),
  favorite_cuisines: z.array(z.string()).optional(),
});

// --- Invite ---

export const inviteMemberSchema = z.object({
  trip_id: z.string().uuid(),
  email: z.string().email("Email invalide"),
  role: z.enum(["editor", "viewer"]).default("editor"),
});

// --- Calendar Event ---

export const createCalendarEventSchema = z.object({
  trip_id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(1000).nullable().optional(),
  start_datetime: z.string(),
  end_datetime: z.string(),
  location: z.string().max(300).nullable().optional(),
  color: z.string().max(7).nullable().optional(),
});

// Schema types
export type CreateTripInput = z.infer<typeof createTripSchema>;
export type UpdateTripInput = z.infer<typeof updateTripSchema>;
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
export type CreateChecklistItemInput = z.infer<typeof createChecklistItemSchema>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type InviteMemberInput = z.infer<typeof inviteMemberSchema>;
export type CreateCalendarEventInput = z.infer<typeof createCalendarEventSchema>;

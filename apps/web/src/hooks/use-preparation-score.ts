import type { ChecklistItem, Booking, PreparationScore } from "@voygo/shared";

/**
 * Calculates trip preparation score based on checklist completion,
 * bookings status, and budget configuration.
 */
export function calculatePreparationScore({
  checklistItems,
  bookings,
  hasBudget,
  daysUntilDeparture,
}: {
  checklistItems: ChecklistItem[];
  bookings: Booking[];
  hasBudget: boolean;
  daysUntilDeparture: number;
}): PreparationScore {
  const totalTasks = checklistItems.length;
  const completedTasks = checklistItems.filter((i) => i.status === "completed").length;
  const hasBookings = bookings.some((b) => b.status === "confirmed");

  const missingItems: string[] = [];

  // Task completion: 60% weight
  const taskScore = totalTasks > 0 ? (completedTasks / totalTasks) * 60 : 0;

  // Bookings: 25% weight
  let bookingScore = 0;
  const hasTransport = bookings.some((b) => ["flight", "train", "bus", "car_rental"].includes(b.type) && b.status === "confirmed");
  const hasAccommodation = bookings.some((b) => ["hotel", "apartment"].includes(b.type) && b.status === "confirmed");

  if (hasTransport) bookingScore += 12.5;
  else missingItems.push("Réserver le transport");

  if (hasAccommodation) bookingScore += 12.5;
  else missingItems.push("Réserver l'hébergement");

  // Budget: 15% weight
  const budgetScore = hasBudget ? 15 : 0;
  if (!hasBudget) missingItems.push("Définir un budget");

  // Pending urgent tasks
  const pendingBeforeDeparture = checklistItems.filter(
    (i) => i.category === "before_departure" && i.status === "pending"
  );
  for (const task of pendingBeforeDeparture.slice(0, 3)) {
    missingItems.push(task.title);
  }

  const score = Math.round(taskScore + bookingScore + budgetScore);

  return {
    score: Math.min(score, 100),
    total_tasks: totalTasks,
    completed_tasks: completedTasks,
    has_bookings: hasBookings,
    has_budget: hasBudget,
    days_until_departure: daysUntilDeparture,
    missing_items: missingItems,
  };
}

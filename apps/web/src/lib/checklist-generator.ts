import { CHECKLIST_TEMPLATES } from "@voygo/shared";
import type { ChecklistCategory } from "@voygo/shared";

interface GeneratedChecklistItem {
  category: ChecklistCategory;
  title: string;
  sort_order: number;
}

/**
 * Generates a checklist from templates based on trip type.
 * Falls back to "vacation" template if trip type has no template.
 */
export function generateChecklist(tripType: string): GeneratedChecklistItem[] {
  const template = CHECKLIST_TEMPLATES[tripType] || CHECKLIST_TEMPLATES["vacation"];

  if (!template) return [];

  return template.map((item, index) => ({
    category: item.category as ChecklistCategory,
    title: item.title,
    sort_order: index,
  }));
}

/**
 * Merges a generated checklist with any custom items the user has added.
 * Preserves user items and avoids duplicates.
 */
export function mergeChecklists(
  generated: GeneratedChecklistItem[],
  existing: GeneratedChecklistItem[]
): GeneratedChecklistItem[] {
  const existingTitles = new Set(existing.map((item) => item.title.toLowerCase()));

  const newItems = generated.filter(
    (item) => !existingTitles.has(item.title.toLowerCase())
  );

  return [
    ...existing,
    ...newItems.map((item, i) => ({
      ...item,
      sort_order: existing.length + i,
    })),
  ];
}

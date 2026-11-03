import type { CampusEvent, Category } from "../types/campus-event";

export function searchEvents(
  events: CampusEvent[],
  text: string
): CampusEvent[] {
  const aranan = text.trim().toLocaleLowerCase("tr-TR");
  if (aranan === "") return events;
  return events.filter((e) =>
    [e.title, e.category, e.location, e.description]
      .join(" ")
      .toLocaleLowerCase("tr-TR")
      .includes(aranan)
  );
}

export function filterByCategory(
  events: CampusEvent[],
  category: Category | ""
): CampusEvent[] {
  if (category === "") return events;
  return events.filter((e) => e.category === category);
}
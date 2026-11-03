export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Konser" | "Spor";

export const categories: Category[] = [
  "Seminer",
  "Atölye",
  "Söyleşi",
  "Konser",
  "Spor",
];

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  date: string; // YYYY-AA-GG
  time: string; // SS:DD
  location: string;
  capacity: number;
  description: string;
}

// Form hep metin verir: capacity string, category boş olabilir, id yok
export interface EventFormData {
  title: string;
  category: Category | "";
  date: string;
  time: string;
  location: string;
  capacity: string;
  description: string;
}

export type EventFormErrors = Partial<Record<keyof EventFormData, string>>;
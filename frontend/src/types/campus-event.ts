export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  date: string; // YYYY-AA-GG
  time: string; // SS:DD
  location: string;
  capacity: number;
  description: string;
  image?: string;
}
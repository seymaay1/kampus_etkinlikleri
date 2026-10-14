// Tarih formatı: GG-AA-YYYY, saat: SS:DD
export const events = [
  {
    id: "event-1",
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "12-10-2026",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    capacity: 100,
    description: "Mezunlarla kariyer söyleşileri ve şirket standları.",
  },
  {
    id: "event-2",
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "20-10-2026",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    capacity: 20,
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi.",
  },
  {
    id: "event-3",
    title: "Siber Güvenlik Söyleşisi",
    category: "Söyleşi",
    date: "27-10-2026",
    time: "13:00",
    location: "B Blok Amfi 1",
    capacity: 50,
    description: "Sektörden bir uzmanla güvenlik kariyeri üzerine sohbet.",
  },
  {
    id: "event-4",
    title: "Web Tasarım Atölyesi",
    category: "Atölye",
    date: "03-11-2026",
    time: "15:00",
    location: "Bilgisayar Laboratuvarı 1",
    capacity: 30,
    description: "HTML ve CSS ile ilk kişisel sayfanı yap.",
  },
  {
    id: "event-5",
    title: "Yapay Zekaya Giriş",
    category: "Seminer",
    date: "10-11-2026",
    time: "11:00",
    location: "A Blok Konferans Salonu",
    capacity: 120,
    description: "Yapay zekanın temel kavramları ve günlük hayattaki örnekleri.",
  },
  {
    id: "event-6",
    title: "Bahar Futbol Turnuvası",
    category: "Spor",
    date: "17-11-2026",
    time: "16:30",
    location: "Kampüs Halı Saha",
    capacity: 64,
    description: "Bölümler arası 8 takımlı eleme usulü turnuva.",
  },
];

// GG-AA-YYYY -> YYYY-AA-GG (date input ve sıralama için)
export function toISO(date) {
  const [g, a, y] = date.split("-");
  return `${y}-${a}-${g}`;
}

// YYYY-AA-GG -> GG-AA-YYYY
export function fromISO(iso) {
  const [y, a, g] = iso.split("-");
  return `${g}-${a}-${y}`;
}

// "12 Ekim 2026"
export function formatDate(date) {
  return new Date(`${toISO(date)}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
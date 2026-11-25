// "15-10-2026" -> Date (geçersizse Invalid Date, Mongoose bunu hataya çevirir)
export function parseDate(value) {
  if (typeof value !== "string") return value;
  const m = /^(\d{2})-(\d{2})-(\d{4})$/.exec(value);
  if (!m) return new Date(NaN);
  const [, gun, ay, yil] = m.map(Number);
  const tarih = new Date(Date.UTC(yil, ay - 1, gun));
  // 31-02-2026 gibi taşan tarihleri reddet
  if (tarih.getUTCDate() !== gun || tarih.getUTCMonth() !== ay - 1) {
    return new Date(NaN);
  }
  return tarih;
}

// Date -> "15-10-2026"
export function formatDate(tarih) {
  if (!(tarih instanceof Date)) return tarih;
  const gun = String(tarih.getUTCDate()).padStart(2, "0");
  const ay = String(tarih.getUTCMonth() + 1).padStart(2, "0");
  return `${gun}-${ay}-${tarih.getUTCFullYear()}`;
}

// Bugünün başlangıcı (/upcoming için)
export function todayStart() {
  const s = new Date();
  return new Date(Date.UTC(s.getFullYear(), s.getMonth(), s.getDate()));
}
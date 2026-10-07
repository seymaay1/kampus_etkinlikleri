import { events, formatDate, toISO } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const filtreFormu = document.querySelector("#filtre-formu");
const arama = document.querySelector("#arama");
const kategoriSecim = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

function createCard(event) {
  return `<article class="kart">
    <h2>${event.title}</h2>
    <span class="kart-etiket">${event.category}</span>
    <p>Tarih: ${formatDate(event.date)}, ${event.time}</p>
    <p>Yer: ${event.location}</p>
    <p>Kontenjan: ${event.capacity} kişi</p>
    <p>${event.description}</p>
    <a href="etkinlik_detay.html?id=${event.id}">Detayları gör →</a>
  </article>`;
}

function render(dizi) {
  list.innerHTML = dizi.map(createCard).join("");
}

function filtrele() {
  const aranan = arama.value.trim().toLocaleLowerCase("tr-TR");
  const kategori = kategoriSecim.value;

  const sonuc = events.filter((e) => {
    const metin = [e.title, e.category, e.location, e.description]
      .join(" ")
      .toLocaleLowerCase("tr-TR");
    const metinUyuyor = metin.includes(aranan);
    const kategoriUyuyor = kategori === "" || e.category === kategori;
    return metinUyuyor && kategoriUyuyor;
  });

  render(sonuc);
  sonucSatiri.textContent =
    sonuc.length === 0
      ? "Aramanıza uygun etkinlik bulunamadı."
      : `${sonuc.length} etkinlik listeleniyor.`;
}

if (list.dataset.limit) {
  // Ana sayfa: tarihi en yakın N etkinlik (sort asıl diziyi bozmasın diye kopya)
  const yaklasan = [...events]
    .sort((a, b) =>
      `${toISO(a.date)} ${a.time}`.localeCompare(`${toISO(b.date)} ${b.time}`)
    )
    .slice(0, Number(list.dataset.limit));
  render(yaklasan);
} else {
  render(events);

  if (filtreFormu) {
    // Kategori seçeneklerini veriden üret (her biri bir kez)
    const kategoriler = [...new Set(events.map((e) => e.category))].sort((a, b) =>
      a.localeCompare(b, "tr")
    );
    kategoriSecim.insertAdjacentHTML(
      "beforeend",
      kategoriler.map((k) => `<option value="${k}">${k}</option>`).join("")
    );
    sonucSatiri.textContent = `${events.length} etkinlik listeleniyor.`;

    arama.addEventListener("input", filtrele);
    kategoriSecim.addEventListener("change", filtrele);
    filtreFormu.addEventListener("submit", (e) => e.preventDefault());
  }
}
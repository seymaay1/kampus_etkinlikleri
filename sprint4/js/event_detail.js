import { events, formatDate } from "./data.js";

const container = document.querySelector("#detay");
const baslik = document.querySelector("#sayfa-baslik");

const id = new URLSearchParams(location.search).get("id");
const event = events.find((e) => e.id === id);

if (!event) {
  document.title = "Etkinlik bulunamadı";
  baslik.textContent = "Etkinlik bulunamadı";
  container.innerHTML = `<div class="hata-kutusu" role="alert"></div>
    <a class="buton" href="etkinlikler.html">← Listeye dön</a>`;
  // id adres çubuğundan geldiği için innerHTML yerine textContent ile yazılır
  container.querySelector(".hata-kutusu").textContent = id
    ? `"${id}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.`
    : "Etkinlik numarası belirtilmedi. Listeden bir etkinlik seçin.";
} else {
  document.title = event.title;
  baslik.textContent = event.title;
  container.innerHTML = `<div class="detay">
      <figure>
        <div class="afis" role="img" aria-label="${event.title} etkinlik afişi">
          <strong>${event.title}</strong>
          <span>${formatDate(event.date)} · ${event.location}</span>
        </div>
        <figcaption>${event.title} afişi</figcaption>
      </figure>
      <dl class="kunye">
        <dt>Tarih</dt>
        <dd><time>${formatDate(event.date)}, ${event.time}</time></dd>
        <dt>Yer</dt>
        <dd>${event.location}</dd>
        <dt>Kategori</dt>
        <dd>${event.category}</dd>
        <dt>Kontenjan</dt>
        <dd>${event.capacity} kişi</dd>
      </dl>
    </div>
    <h2>Açıklama</h2>
    <p>${event.description}</p>
    <p class="butonlar">
      <a class="buton" href="etkinlikler.html">← Listeye dön</a>
      <a class="buton" href="etkinlik_guncelle.html?id=${event.id}">Bu etkinliği güncelle</a>
    </p>`;
}
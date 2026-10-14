import { events, toISO, fromISO } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");
const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan"];
const guncelleme = form.dataset.mode === "guncelle";

const id = new URLSearchParams(location.search).get("id");
const etkinlik = events.find((e) => e.id === id);

function hataGoster(alan, metin) {
  const girdi = form.elements[alan];
  document.querySelector(`#${alan}-hata`).textContent = metin;
  if (metin) girdi.setAttribute("aria-invalid", "true");
  else girdi.removeAttribute("aria-invalid");
}

function dogrula(data) {
  const errors = {};
  if (data.title.length < 3) errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
  if (!data.category) errors.kategori = "Bir kategori seçin.";
  if (!data.date) errors.tarih = "Tarih seçin.";
  if (!data.time) errors.saat = "Saat seçin.";
  if (!data.location) errors.yer = "Yer bilgisini yazın.";
  if (
    data.capacity !== null &&
    (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)
  ) {
    errors.kontenjan = "Kontenjan 1 ile 1000 arasında olmalı.";
  }
  return errors;
}

function gonder(e) {
  e.preventDefault();
  const fd = new FormData(form);
  const kontenjan = fd.get("kontenjan").trim();

  const data = {
    id: guncelleme ? etkinlik.id : `event-${events.length + 1}`,
    title: fd.get("ad").trim(),
    category: fd.get("kategori"),
    date: fd.get("tarih") ? fromISO(fd.get("tarih")) : "",
    time: fd.get("saat"),
    location: fd.get("yer").trim(),
    capacity: kontenjan === "" ? null : Number(kontenjan),
    description: fd.get("aciklama").trim(),
  };

  const errors = dogrula(data);
  alanlar.forEach((alan) => hataGoster(alan, errors[alan] || ""));

  if (Object.keys(errors).length > 0) {
    mesaj.className = "mesaj hata";
    mesaj.textContent = "Formda hatalı alanlar var.";
    form.elements[Object.keys(errors)[0]].focus();
    return;
  }

  mesaj.className = "mesaj basari";
  mesaj.innerHTML = "<p></p><pre></pre>";
  mesaj.querySelector("p").textContent = guncelleme
    ? "Etkinlik güncellendi (bu sprintte kaydedilmez):"
    : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";
  mesaj.querySelector("pre").textContent = JSON.stringify(data, null, 2);
}

if (guncelleme && !etkinlik) {
  // id yok ya da geçersiz: boş form yerine uyarı
  document.querySelector("#form-bilgi")?.remove();
  form.outerHTML = `<div class="hata-kutusu" role="alert">Güncellenecek etkinlik seçilmedi.
    Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle"
    butonunu kullanın.</div>
    <a class="buton" href="etkinlikler.html">Etkinliklere git</a>`;
} else {
  if (guncelleme) {
    form.elements.ad.value = etkinlik.title;
    form.elements.kategori.value = etkinlik.category;
    form.elements.tarih.value = toISO(etkinlik.date);
    form.elements.saat.value = etkinlik.time;
    form.elements.yer.value = etkinlik.location;
    form.elements.kontenjan.value = etkinlik.capacity ?? "";
    form.elements.aciklama.value = etkinlik.description;
  }
  form.addEventListener("submit", gonder);
  // Kullanıcı düzeltmeye başlayınca o alanın hatası silinsin
  form.addEventListener("input", (e) => {
    if (alanlar.includes(e.target.name)) hataGoster(e.target.name, "");
  });
}
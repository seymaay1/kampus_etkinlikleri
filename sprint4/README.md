https://kampus-etkinlikleri-beta.vercel.app/

# Kampüs Etkinlikleri

Kampüsteki etkinlikleri duyurmak ve öğrencilerin etkinlik takvimini kolayca takip etmesini sağlamak için hazırlanmış çok sayfalı bir web sitesidir.

**Öğrenci:** Şeyma Ay · 2416501059

## Sprint 3: JavaScript ve DOM

Bu sprintte sayfalar elle yazılmış HTML yerine tek bir veri dosyasından üretilmeye başlandı.

### Yapılanlar

- Etkinlikler `js/data.js` içinde tek bir dizide tutuluyor (6 etkinlik, 4 kategori).
- Ana sayfa ve etkinlik listesi kartları JavaScript ile üretiliyor. Ana sayfada tarihi en yakın 2 etkinlik gösteriliyor (`data-limit`).
- Etkinlikler sayfasında arama kutusu ve kategori filtresi birlikte çalışıyor. Sonuç yoksa "bulunamadı" mesajı çıkıyor.
- Detay sayfası adresteki `?id=` değerine göre doğru etkinliği gösteriyor. Geçersiz veya eksik id'de hata kutusu çıkıyor.
- Ekleme formu `novalidate` ile çalışıyor. Hatalı alanların altında kırmızı mesaj, başarıda yeşil kutuda oluşan nesne görünüyor.
- Güncelleme sayfası detaydaki "Bu etkinliği güncelle" butonuyla `?id=` alarak açılıyor ve form o etkinliğin bilgileriyle doluyor.

### Dosya yapısı

```
sprint3/
├── css/2416501059.css
├── js/
│   ├── data.js          # etkinlik verisi ve tarih yardımcıları
│   ├── event_list.js    # kart üretimi, ana sayfa limiti, arama ve filtre
│   ├── event_detail.js  # ?id= ile detay sayfası
│   └── event_form.js    # ekleme/güncelleme formu, doğrulama, mesajlar
├── index.html
├── etkinlikler.html
├── etkinlik_detay.html
├── etkinlik_ekle.html
└── etkinlik_guncelle.html
```

### Notlar

- Veri kaydedilmez; `localStorage`, framework ve jQuery kullanılmadı. Kalıcı kayıt backend sprintlerinde gelecek.
- Sayfalar ES modülleri (`type="module"`) kullandığı için `file://` ile açılmaz. Yerelde VS Code **Live Server** ile açılmalıdır.
- Kontrol için örnek adresler: `etkinlik_detay.html?id=event-3` (doğru etkinlik), `etkinlik_detay.html?id=event-99` (hata kutusu).

## Önceki sprintler

- **Sprint 2:** HTML ve CSS ile sayfa iskeleti, kartlar, tablo ve formlar.
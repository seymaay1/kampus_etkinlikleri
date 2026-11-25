# Kampüs Etkinlikleri API

Express ve Mongoose ile yazılmış REST API. Etkinlikler MongoDB Atlas'ta saklanır.

Öğrenci: Şeyma Ay · 2416501059

## Çalıştırma

```
cd backend
npm install
Copy-Item .env.example .env
npm run seed
npm run dev
```

macOS/Linux'ta `.env` oluşturmak için: `cp .env.example .env`

API `http://localhost:3000` adresinde çalışır. `npm run seed` 6 örnek etkinliği veritabanına ekler (her çalışmada önce siler).

## Ortam değişkenleri

| Değişken | Açıklama |
|---|---|
| PORT | Sunucu portu (3000) |
| MONGODB_URI | MongoDB bağlantı adresi (sonu `/kampus`) |

`.env` GitHub'a gönderilmez. `.env.example` dosyasını `.env` olarak kopyalayıp `MONGODB_URI` değerini kendi veritabanınla doldur.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /health | Sunucu ayakta mı | 200 | - | Çalışıyor |
| GET | /events | Liste (`?search=git`, `?category=Atölye`) | 200 | - | Çalışıyor |
| GET | /events/upcoming | Bugün ve sonrası, en yakın önce | 200 | - | Çalışıyor |
| GET | /events/:id | Tek etkinlik | 200 | 404 | Çalışıyor |
| POST | /events | Yeni etkinlik | 201 | 400 | Çalışıyor |
| PATCH | /events/:id | Gönderilen alanları günceller | 200 | 400, 404 | Çalışıyor |
| DELETE | /events/:id | Siler (gövde yok) | 204 | 404 | Çalışıyor |

Tarih her yerde `GG-AA-YYYY` biçimindedir (örn. `15-10-2026`). Geçersiz ya da olmayan id her yerde 404 döner. `?search` başlıkta büyük/küçük harf fark etmeden arar.

## Status code'lar

- 200 tamam
- 201 oluşturuldu
- 204 içerik yok (gövde boş)
- 400 eksik veya yanlış veri
- 404 bulunamadı

## Hata biçimi

```json
{ "error": { "message": "Event not found" } }
```

## POST /events gövdesi

`title`, `category` ve `date` zorunludur.

```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "date": "01-12-2026",
  "capacity": 30,
  "time": "14:00",
  "location": "Bilgisayar Laboratuvarı 1",
  "description": "Git ve GitHub ile ilk adımlar."
}
```

Kategori: Seminer, Atölye, Söyleşi, Konser, Spor. Kayıtlarda `id` yerine MongoDB `_id` döner.

## PATCH /events/:id

Yalnızca gönderilen alanlar değişir. Boş gövde 400, `_id`, `createdAt`, `updatedAt` değiştirilemez (400).

```json
{ "capacity": 55 }
```

## Postman koleksiyonu

- `requests/kampus-api.json`: Sprint 8'in 6 isteği
- `requests/run-results.json`: Sprint 9 hazır koleksiyonunun sonucu (18 istek, 45 test, 0 hata)

## Klasör yapısı

```
backend/
  src/
    config/database.js          MongoDB bağlantısı
    models/event-model.js       Event şeması
    utils/date.js               GG-AA-YYYY dönüşümleri
    controllers/event-controller.js
    routes/event-routes.js
    data/seed-events.js         Örnek veri
    seed.js  app.js  server.js
  requests/
  .env.example  .gitignore  package.json
```
# Kampüs Etkinlikleri API

Express ile yazılmış REST API. Veriler şimdilik bellekte tutulur; sunucu yeniden başlayınca POST ile eklenenler kaybolur.

Öğrenci: Şeyma Ay · 2416501059

## Çalıştırma

```
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

macOS/Linux'ta `.env` oluşturmak için: `cp .env.example .env`

API `http://localhost:3000` adresinde çalışır.

## Ortam değişkenleri

| Değişken | Açıklama | Varsayılan |
|---|---|---|
| PORT | Sunucunun dinleyeceği port | 3000 |

`.env` dosyası GitHub'a gönderilmez. Gerekli değişkenler `.env.example` dosyasında listelenir.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /health | Sunucu ayakta mı | 200 | - | Bu sprint |
| GET | /events | Listeyi getir (`?category=Atölye` ile filtre) | 200 | - | Bu sprint |
| GET | /events/:id | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | /events | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | /events/:id | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | /events/:id | Sil | 204 | 404 | Sprint 9 |

## Status code'lar

- 200 tamam
- 201 oluşturuldu
- 204 içerik yok
- 400 eksik veya yanlış veri
- 404 bulunamadı

## Hata biçimi

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

## GET /health yanıtı

```json
{
  "status": "ok",
  "time": "2026-11-11T08:47:26.826Z",
  "student": "2416501059"
}
```

## POST /events gövdesi

`title`, `category` ve `date` zorunludur. Diğer alanlar isteğe bağlıdır.

```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "date": "2026-12-01",
  "capacity": 30,
  "time": "14:00",
  "location": "Bilgisayar Laboratuvarı 1",
  "description": "Git ve GitHub ile ilk adımlar."
}
```

Başarılıysa 201 ve oluşturulan kayıt (yeni `id` ile) döner. Zorunlu alan eksikse 400 döner:

```json
{ "error": { "message": "title, category and date are required" } }
```

## Postman koleksiyonu

6 istek `requests/kampus-api.json` dosyasındadır (Postman'de Import ile açılır):

| # | İstek | Beklenen |
|---|---|---|
| 1 | GET /health | 200 |
| 2 | GET /events | 200, 6 kayıt |
| 3 | GET /events/event-2 | 200 |
| 4 | GET /events/yok | 404 |
| 5 | POST /events (tam gövde) | 201 |
| 6 | POST /events (sadece title) | 400 |

## Klasör yapısı

```
backend/
  src/
    app.js                      Express uygulaması, middleware, route'lar
    server.js                   .env'i okur, portu dinler
    routes/event-routes.js      Hangi adres hangi fonksiyona gider
    controllers/event-controller.js   İsteği işler, yanıtı döndürür
    data/events.js              Bellek içi etkinlik dizisi
  requests/kampus-api.json      Postman koleksiyonu
  .env.example
  .gitignore
  package.json
```
```
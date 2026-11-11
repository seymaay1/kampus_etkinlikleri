# Kampüs Etkinlikleri API

Express ile yazılmış REST API. Veriler şimdilik bellekte tutulur, sunucu yeniden başlayınca POST ile eklenenler kaybolur.

Öğrenci: Şeyma Ay · 2416501059

## Çalıştırma

```
cd backend
npm install
cp .env.example .env
npm run dev
```

Windows PowerShell'de `.env` oluşturmak için: `Copy-Item .env.example .env`

API `http://localhost:3000` adresinde çalışır.

## Ortam değişkenleri

| Değişken | Açıklama | Varsayılan |
|---|---|---|
| PORT | Sunucunun dinleyeceği port | 3000 |

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

## POST /events gövdesi

`title`, `category` ve `date` zorunludur.

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
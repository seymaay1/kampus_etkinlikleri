# Kampüs Etkinlikleri

Kampüsteki seminer, atölye, söyleşi, konser ve spor etkinliklerini listeleyen; etkinlik ekleme, güncelleme ve silme işlemlerinin yapılabildiği React uygulaması ve bu uygulamaya veri sağlayacak Express REST API.

**Canlı adres (frontend):** https://seymaay-frontend.vercel.app

Öğrenci: Şeyma Ay · 2416501059

## Repo yapısı

```
kampus_etkinlik/
  frontend/   React + TypeScript + Vite (Sprint 6)
  backend/    Node + Express REST API (Sprint 7)
  sprint1/ ... sprint4/   Eski HTML/CSS/JS sürümleri
```

## Frontend (Sprint 6)

### Kurulum

```
git clone https://github.com/seymaay1/kampus_etkinlikleri.git
cd kampus_etkinlikleri/frontend
npm install
npm run dev
```

<<<<<<< HEAD
Uygulama `http://localhost:5173` adresinde açılır. Yayın için derleme: `npm run build`.

### Kullanılan teknolojiler

- React + TypeScript (Vite)
- React Router (`react-router-dom`)
- Context API (`EventsContext`)

### Route listesi

| Adres | Sayfa |
|---|---|
| `/` | HomePage |
| `/events` | EventsPage |
| `/events/:id` | EventDetailPage |
| `/login` | LoginPage |
| `/register` | RegisterPage |
| `/forgot-password` | ForgotPasswordPage |
| `/admin` | AdminPage |
| `/admin/new` | AddEventPage |
| `/admin/:id/edit` | EditEventPage |
| `*` | NotFoundPage |

### Özellikler

- Etkinlik listesi, arama ve kategori filtresi
- Etkinlik detay sayfası
- Yönetim sayfasında etkinlik ekleme, güncelleme ve silme (silmeden önce onay)
- Değişiklikler Context ile tüm sayfalara yansır
- Etkinlik, giriş, kayıt ve şifremi unuttum formlarında doğrulama
- Masaüstünde tablo, telefonda kart görünümü

## Backend (Sprint 7)

`backend/` klasöründe Express ile yazılmış REST API var. Veriler şimdilik bellekte tutulur. Çalıştırma komutları, PORT değişkeni ve REST sözleşmesi için `backend/README.md` dosyasına bakın.

```
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

API `http://localhost:3000` adresinde çalışır.

| Method | Endpoint | Açıklama |
|---|---|---|
| GET | `/health` | Sunucu durumu |
| GET | `/events` | Etkinlik listesi (`?category=` ile filtre) |
| GET | `/events/:id` | Tek etkinlik (yoksa 404) |
| POST | `/events` | Yeni etkinlik (eksik veri 400, başarılı 201) |

Postman koleksiyonu: `backend/requests/kampus-api.json`

## Notlar

- Frontend verileri henüz backend'e bağlı değildir (Sprint 11'de bağlanacak); sayfa yenilenince başlangıç verisine dönülür.
- Giriş, kayıt ve şifremi unuttum sayfaları şimdilik sadece arayüzdür.
- `.env` dosyası GitHub'a gönderilmez, örnek için `backend/.env.example` kullanılır.
=======
Sprint 1-4 klasörlerinde eski HTML/CSS/JS sürümleri durur.
>>>>>>> d34567cff40ba7339c7b2339cac6636007b2d8cc

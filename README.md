# Kampüs Etkinlikleri

Kampüsteki seminer, atölye, söyleşi, konser ve spor etkinliklerini listeleyen, etkinlik ekleme, güncelleme ve silme işlemlerinin yapılabildiği React uygulaması.

**Canlı adres:** https://seymaay-frontend.vercel.app

Şeyma Ay · 2416501059

## Kurulum

```
git clone <repository-adresi>
cd frontend
npm install
npm run dev
```

Uygulama `http://localhost:5173` adresinde açılır. Yayın için derleme: `npm run build`.

## Kullanılan teknolojiler

- React + TypeScript (Vite)
- React Router (`react-router-dom`)
- Context API (`EventsContext`)

## Route listesi

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

## Özellikler

- Etkinlik listesi, arama ve kategori filtresi
- Etkinlik detay sayfası
- Yönetim sayfasında etkinlik ekleme, güncelleme ve silme (silmeden önce onay)
- Yapılan değişiklikler Context ile tüm sayfalara yansır
- Etkinlik, giriş, kayıt ve şifremi unuttum formlarında doğrulama
- Masaüstünde tablo, telefonda kart görünümü

## Notlar

- Veriler henüz bir sunucuya kaydedilmez; sayfa yenilenince başlangıç verisine dönülür.
- Giriş, kayıt ve şifremi unuttum sayfaları şimdilik sadece arayüzdür.
import { useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import { findEventById } from "../../data/events";
import type { CampusEvent } from "../../types/campus-event";

interface HeaderInfo {
  heading: string;
  subtitle: string;
}

function getHeaderInfo(pathname: string, events: CampusEvent[]): HeaderInfo {
  const detay = matchPath("/events/:id", pathname);
  const duzenle = matchPath("/admin/:id/edit", pathname);

  if (pathname === "/")
    return {
      heading: "Kampüs Etkinlikleri",
      subtitle: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
    };
  if (pathname === "/events")
    return {
      heading: "Tüm Etkinlikler",
      subtitle: "Kampüste düzenlenen tüm etkinlikler.",
    };
  if (pathname === "/login")
    return { heading: "Giriş Yap", subtitle: "Hesabınla giriş yap." };
  if (pathname === "/register")
    return { heading: "Kayıt Ol", subtitle: "Yeni hesap oluştur." };
  if (pathname === "/forgot-password")
    return {
      heading: "Şifremi Unuttum",
      subtitle: "Şifre yenileme bağlantısı iste.",
    };
  if (pathname === "/admin")
    return {
      heading: "Etkinlik Yönetimi",
      subtitle: "Etkinlikleri ekle, düzenle ve sil.",
    };
  if (pathname === "/admin/new")
    return { heading: "Etkinlik Ekle", subtitle: "Yeni bir etkinlik oluştur." };

  if (detay) {
    const event = findEventById(events, detay.params.id ?? "");
    if (event)
      return {
        heading: event.title,
        subtitle: `${event.category} · ${event.location}`,
      };
  }
  if (duzenle) {
    const event = findEventById(events, duzenle.params.id ?? "");
    if (event)
      return {
        heading: `${event.title} - Güncelle`,
        subtitle: `${event.category} · ${event.location}`,
      };
  }

  return {
    heading: "Sayfa bulunamadı",
    subtitle: "Aradığınız sayfa ya da etkinlik yok.",
  };
}

function Header() {
  const { pathname } = useLocation();
  const { events } = useEvents();
  const { heading, subtitle } = getHeaderInfo(pathname, events);

  useEffect(() => {
    document.title = heading;
  }, [heading]);

  return (
    <header className="site-header">
      <h1>{heading}</h1>
      <p>{subtitle}</p>
    </header>
  );
}

export default Header;
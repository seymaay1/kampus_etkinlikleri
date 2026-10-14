import "./App.css";
import { useEffect, useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

const allCategories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Ana sayfa: en yakın 2 etkinlik
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  // Etkinlikler sayfası: her çizimde hesaplanır (state değil)
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const categoryOptions = [...new Set(events.map((e) => e.category))].sort(
    (a, b) => a.localeCompare(b, "tr")
  );

  // Detay sayfası
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const titles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri",
    events: "Tüm Etkinlikler",
    detail: selected ? selected.title : "Etkinlik bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle",
  };
  const title = titles[page];

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <span className="kart-etiket">{event.category}</span>
        <p>
          Tarih: {formatDate(event.date)}, {event.time}
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör →
        </a>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>{title}</h1>
      </header>

      <nav>
        {menu.map((item) => (
          <a
            key={item.page}
            href="#"
            aria-current={page === item.page ? "page" : undefined}
            onClick={(e) => {
              e.preventDefault();
              go(item.page);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <main>
        {/* ===== ANA SAYFA ===== */}
        {page === "home" && (
          <>
            <p>
              Bu uygulama, kampüsteki etkinlikleri duyurmak ve öğrencilerin
              kolayca katılabileceği bir etkinlik takvimi oluşturmak amacıyla
              geliştirilmiştir.
            </p>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="kartlar etkinlik-listesi">
              {upcoming.map(renderCard)}
            </section>
            <p>
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör →
              </a>
            </p>
          </>
        )}

        {/* ===== ETKİNLİKLER ===== */}
        {page === "events" && (
          <>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div className="alan">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="alan">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categoryOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p id="sonuc" aria-live="polite">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="kartlar etkinlik-listesi">
              {filtered.map(renderCard)}
            </section>
          </>
        )}

        {/* ===== DETAY: bulunamadı ===== */}
        {page === "detail" && !selected && (
          <>
            <div className="hata-kutusu" role="alert">
              Etkinlik bulunamadı. Listeden bir etkinlik seçin.
            </div>
            <a
              className="buton"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              ← Listeye dön
            </a>
          </>
        )}

        {/* ===== DETAY: bulundu ===== */}
        {page === "detail" && selected && (
          <>
            <article className="detay">
              {selected.image && (
                <figure>
                  <img src={selected.image} alt={`${selected.title} afişi`} />
                  <figcaption>{selected.title} afişi</figcaption>
                </figure>
              )}
              <dl className="kunye">
                <dt>Tarih</dt>
                <dd>
                  <time dateTime={selected.date}>
                    {formatDate(selected.date)}, {selected.time}
                  </time>
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity} kişi</dd>
              </dl>
            </article>

            <h2>Açıklama</h2>
            <p>{selected.description}</p>

            <p className="butonlar">
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                ← Listeye dön
              </a>
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("update", selected.id);
                }}
              >
                Bu etkinliği güncelle
              </a>
            </p>
          </>
        )}

        {/* ===== EKLE / GÜNCELLE (sadece görünüm) ===== */}
        {(page === "add" || page === "update") && (
          <>
            <p>Bu sprintte form sadece görünümdür; kayıt yapılmaz.</p>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div className="alan">
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  id="title"
                  type="text"
                  maxLength={80}
                  placeholder="Örn. Kariyer Günleri 2026"
                />
              </div>
              <div className="alan">
                <label htmlFor="category">Kategori</label>
                <select id="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  {allCategories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="alan">
                <label htmlFor="date">Tarih</label>
                <input id="date" type="date" />
              </div>
              <div className="alan">
                <label htmlFor="time">Saat</label>
                <input id="time" type="time" />
              </div>
              <div className="alan">
                <label htmlFor="location">Yer</label>
                <input
                  id="location"
                  type="text"
                  placeholder="Örn. A Blok Konferans Salonu"
                />
              </div>
              <div className="alan">
                <label htmlFor="capacity">Kontenjan</label>
                <input id="capacity" type="number" min={1} max={1000} />
              </div>
              <div className="alan">
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" rows={5} />
              </div>
              <button type="submit">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </>
        )}
      </main>

      <footer>
        <p>Şeyma Ay · 2416501059 · 2026</p>
      </footer>
    </>
  );
}

export default App;
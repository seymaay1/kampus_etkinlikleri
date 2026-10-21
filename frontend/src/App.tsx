import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  function showDetail(id: string) {
    go("detail", id);
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

  return (
    <>
      <Header title={title} />
      <Navigation current={page} onNavigate={go} />

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
            <EventList events={upcoming} onShowDetail={showDetail} />
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
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categoryOptions}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filtered.length > 0 && (
              <p id="sonuc" aria-live="polite">
                {filtered.length} etkinlik listeleniyor.
              </p>
            )}
            <EventList
              events={filtered}
              onShowDetail={showDetail}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
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
          <EventDetail
            event={selected}
            onBack={() => go("events")}
            onEdit={(id) => go("update", id)}
          />
        )}

        {/* ===== EKLE / GÜNCELLE ===== */}
        {(page === "add" || page === "update") && (
          <EventForm
            submitLabel={page === "add" ? "Kaydet" : "Güncelle"}
            onSubmit={() => window.scrollTo(0, 0)}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
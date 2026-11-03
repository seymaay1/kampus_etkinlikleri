import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface Props {
  event: CampusEvent;
}

function EventDetail({ event }: Props) {
  return (
    <article>
      <div className="detay">
        <figure>
          <div
            className="afis"
            role="img"
            aria-label={`${event.title} etkinlik afişi`}
          >
            <strong>{event.title}</strong>
            <span>
              {formatDate(event.date)} · {event.location}
            </span>
          </div>
          <figcaption>{event.title} afişi</figcaption>
        </figure>
        <dl className="kunye">
          <dt>Tarih</dt>
          <dd>
            <time>
              {formatDate(event.date)}, {event.time}
            </time>
          </dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
      </div>
      <h3>Açıklama</h3>
      <p>{event.description}</p>
      <p className="butonlar">
        <Link className="buton" to="/events">
          ← Listeye dön
        </Link>
        <Link className="buton" to={`/admin/${event.id}/edit`}>
          Güncelle
        </Link>
      </p>
    </article>
  );
}

export default EventDetail;
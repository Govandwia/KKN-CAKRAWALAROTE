import { useState } from 'react';
import { Link } from 'react-router-dom';

import siteContent from '../../data/site-content.json';
import { Icon } from '../shared/Icons';
import { SectionHeading } from '../shared/SectionHeading';

type SiteContent = typeof siteContent;
type IconName = Parameters<typeof Icon>[0]['name'];

export function DestinationsSection({ destinations }: Pick<SiteContent, 'destinations'>) {
  return (
    <section id="destinations" className="content-section content-section--dark">
      <SectionHeading eyebrow={destinations.eyebrow} title={destinations.title} accent="Rote" />
      <div className="dest-grid">
        {destinations.cards.map((card, index) => (
          <article key={card.title} className={`dest-card reveal reveal-delay-${Math.min(index, 3)}`}>
            <img src={card.image} alt={card.title} />
            <div className="dest-card-overlay">
              <span className="dest-card-tag">{card.tag}</span>
              <h3 className="dest-card-title">{card.title}</h3>
              <p className="dest-card-sub">{card.sub}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AboutSection({ about }: Pick<SiteContent, 'about'>) {
  return (
    <section id="about" className="content-section content-section--light about-section">
      <div className="about-copy">
        <SectionHeading eyebrow={about.eyebrow} title={about.title} accent="Indonesia's" />
        <p className="about-text reveal">{about.text}</p>
        <a href="#tourism" className="btn-primary reveal reveal-delay-1">
          {about.button}
        </a>
      </div>

      <div className="about-image-stack reveal">
        <img className="about-img-main" src={about.images[0]} alt="Rote landscape" />
        <img className="about-img-accent" src={about.images[1]} alt="Sasando" />
        <div className="about-badge">
          <div className="num">{about.badge.value}</div>
          <div className="txt">{about.badge.label}</div>
        </div>
      </div>
    </section>
  );
}

export function TourismSection({ tourism }: Pick<SiteContent, 'tourism'>) {
  const [activeFilter, setActiveFilter] = useState('All');
  const normalizedFilter = activeFilter.toLowerCase();

  const filteredCards =
    activeFilter === 'All'
      ? tourism.cards
      : tourism.cards.filter((card) => {
          const tag = card.tag.toLowerCase();
          const title = card.title.toLowerCase();

          if (normalizedFilter === 'beaches') return tag.includes('beach') || title.includes('beach') || title.includes('pantai');
          if (normalizedFilter === 'hills') return title.includes('bukit') || tag.includes('viewpoint') || tag.includes('nature');
          if (normalizedFilter === 'villages') return title.includes('nembrala') || tag.includes('village');
          if (normalizedFilter === 'surfing') return tag.includes('surf');
          if (normalizedFilter === 'diving') return tag.includes('diving') || tag.includes('marine');
          return true;
        });

  return (
    <section id="tourism" className="content-section content-section--dark tourism-section">
      <div className="tourism-intro">
        <SectionHeading eyebrow={tourism.eyebrow} title={tourism.title} accent="Every Corner" />
        <div className="filter-pills">
          {tourism.filters.map((filter) => (
            <button key={filter} type="button" className={filter === activeFilter ? 'pill active' : 'pill'} onClick={() => setActiveFilter(filter)}>
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="tourism-scroll reveal">
        {filteredCards.map((card) => (
          <article key={card.title} className="t-card">
            <img src={card.image} alt={card.title} />
            <div className="t-card-overlay">
              <span className="t-card-tag">{card.tag}</span>
              <h3 className="t-card-title">{card.title}</h3>
              <div className="t-card-meta">
                <span className="t-card-dist">{card.sub}</span>
                <div className="t-card-arrow">→</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CultureSection({ culture }: Pick<SiteContent, 'culture'>) {
  return (
    <section id="culture" className="content-section content-section--forest culture-section">
      <SectionHeading eyebrow={culture.eyebrow} title={culture.title} accent="Traditions" />

      <div className="culture-grid">
        <div className="culture-items">
          {culture.items.map((item, index) => (
            <article key={item.title} className={`culture-item reveal reveal-delay-${Math.min(index, 3)}`}>
              <div className="culture-icon">
                <Icon name={item.icon as IconName} />
              </div>
              <div>
                <h3 className="culture-item-title">{item.title}</h3>
                <p className="culture-item-desc">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="culture-image reveal">
          <img src={culture.image} alt="Sasando traditional music" />
          <div className="culture-image-label">
            <p>Traditional Heritage</p>
            <strong>Sasando — Spirit of Rote</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export function UmkmSection({ umkm }: Pick<SiteContent, 'umkm'>) {
  return (
    <section id="umkm" className="content-section content-section--light umkm-section">
      <SectionHeading eyebrow={umkm.eyebrow} title={umkm.title} accent="Local Products" />

      <div className="umkm-grid">
        {umkm.cards.map((card, index) => (
          <article key={card.title} className={`umkm-card reveal reveal-delay-${Math.min(index, 3)}`}>
            <div className="umkm-card-img">
              <img src={card.image} alt={card.title} />
              <span className="umkm-cat-badge">{card.category}</span>
            </div>
            <div className="umkm-card-body">
              <h3 className="umkm-card-title">{card.title}</h3>
              <p className="umkm-card-desc">{card.desc}</p>
              <a href="#contact" className="umkm-card-link">
                {card.cta} →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EventsSection({ events }: Pick<SiteContent, 'events'>) {
  return (
    <section id="events" className="content-section content-section--dark events-section">
      <SectionHeading eyebrow={events.eyebrow} title={events.title} accent="Events" />

      <div className="events-layout">
        <article className="event-featured reveal">
          <img src={events.featured.image} alt={events.featured.title} />
          <div className="event-featured-overlay">
            <span className="event-date-badge">{events.featured.tag}</span>
            <h3 className="event-featured-title">{events.featured.title}</h3>
            <p className="event-featured-desc">{events.featured.desc}</p>
            <a href="#contact" className="btn-primary btn-primary--inline">
              Register Now
            </a>
          </div>
        </article>

        <div className="event-list reveal reveal-delay-1">
          {events.items.map((event) => (
            <article key={event.title} className="event-list-item">
              <div className="event-list-date">
                <div className="day">{event.day}</div>
                <div className="month">{event.month}</div>
              </div>
              <div className="event-list-divider" />
              <div className="event-list-info">
                <div className="event-list-title">{event.title}</div>
                <div className="event-list-sub">{event.sub}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function YouthSection({ youth }: Pick<SiteContent, 'youth'>) {
  return (
    <section id="youth" className="content-section content-section--forest youth-section">
      <SectionHeading eyebrow={youth.eyebrow} title={youth.title} accent="Movement" />

      <div className="youth-bento">
        {youth.cards.map((card, index) => (
          <article key={card.title} className={`bento-card reveal reveal-delay-${Math.min(index, 3)}`}>
            <img src={card.image} alt={card.title} />
            <div className="bento-card-overlay">
              <span className="bento-tag">{card.tag}</span>
              <h3 className="bento-title">{card.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  const stats = [
    { num: '4.9', label: 'Average Rating' },
    { num: '2,400+', label: 'Visitors This Year' },
    { num: '98%', label: 'Would Return' },
    { num: '47', label: 'Countries Represented' },
  ];

  const testimonials = [
    { text: 'Rote completely changed how I see Indonesia. I came for a week and stayed for three.', name: 'Marcus T.', origin: 'Sydney, Australia', tag: 'Surfing · 3 weeks · Dry Season' },
    { text: "Rote's golden hour is unlike anything I've captured before.", name: 'Yuki H.', origin: 'Tokyo, Japan', tag: 'Photography · 10 days · Dry Season' },
    { text: "We came as a family and left with memories we'll talk about forever.", name: 'Amara & Kofi O.', origin: 'London, UK', tag: 'Family · 12 days · June' },
    { text: 'Empty beaches at dawn, the freshest fish, and extraordinary hospitality.', name: 'Elena V.', origin: 'Barcelona, Spain', tag: 'Culture · 8 days · October' },
  ];

  const pressLogos = ['Condé Nast Traveller', 'National Geographic', 'Lonely Planet', 'The Telegraph Travel', 'Kompas Travel'];

  return (
    <section id="testimonials" className="content-section content-section--light testimonials-section">
      <SectionHeading eyebrow="Visitor Stories" title="Voices from Rote" accent="Rote" />

      <div className="testi-stats reveal">
        {stats.map((stat, index) => (
          <div key={stat.label} className="testi-stat">
            <div className="testi-stat-num">{stat.num}</div>
            <div className="testi-stat-label">{stat.label}</div>
            {index < stats.length - 1 ? <div className="testi-stat-divider" /> : null}
          </div>
        ))}
      </div>

      <div className="testi-grid reveal">
        <article className="testi-card testi-featured">
          <span className="testi-quote-mark">"</span>
          <p className="testi-text">{testimonials[0].text}</p>
          <div className="testi-author">
            <div className="testi-avatar testi-avatar--teal">
              <Icon name="users" />
            </div>
            <div className="testi-author-info">
              <div className="testi-name">{testimonials[0].name}</div>
              <div className="testi-origin">{testimonials[0].origin}</div>
            </div>
          </div>
          <div className="testi-tag">{testimonials[0].tag}</div>
        </article>

        {testimonials.slice(1).map((testimonial) => (
          <article key={testimonial.name} className="testi-card">
            <span className="testi-quote-mark">"</span>
            <p className="testi-text">{testimonial.text}</p>
            <div className="testi-author">
              <div className="testi-avatar testi-avatar--sand">
                <Icon name="users" />
              </div>
              <div className="testi-author-info">
                <div className="testi-name">{testimonial.name}</div>
                <div className="testi-origin">{testimonial.origin}</div>
              </div>
            </div>
            <div className="testi-tag">{testimonial.tag}</div>
          </article>
        ))}
      </div>

      <div className="testi-press reveal reveal-delay-1">
        <div className="testi-press-label">As featured in</div>
        <div className="testi-press-logos">
          {pressLogos.map((press, index) => (
            <span key={press}>
              <span className="press-logo">{press}</span>
              {index < pressLogos.length - 1 ? <span className="press-sep">·</span> : null}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection({ contact }: Pick<SiteContent, 'contact'>) {
  return (
    <section id="contact" className="content-section content-section--light contact-section">
      <SectionHeading eyebrow={contact.eyebrow} title={contact.title} accent="Rote Journey" />

      <div className="contact-layout">
        <div className="contact-info reveal">
          <p>{contact.intro}</p>

          <div className="contact-detail">
            {contact.details.map((detail) => (
              <div key={detail.label} className="contact-detail-item">
                <div className="contact-detail-icon">{detail.icon}</div>
                <div className="contact-detail-text">
                  <p>{detail.label}</p>
                  <strong>{detail.value}</strong>
                </div>
              </div>
            ))}
          </div>

          <div className="social-links">
            {contact.socials.map((symbol) => (
              <a key={symbol} href="#" className="social-link" aria-label={symbol}>
                {symbol}
              </a>
            ))}
          </div>
        </div>

        <form className="contact-form reveal reveal-delay-1">
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input type="text" placeholder="Last name" />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="your@email.com" />
          </div>

          <div className="form-group">
            <label>I'm interested in</label>
            <select>
              {contact.interestOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea placeholder="Tell us about your visit or inquiry…" />
          </div>

          <button className="form-submit" type="button">
            Send Message →
          </button>
        </form>
      </div>
    </section>
  );
}

export function ArticleSection({ articles }: Pick<SiteContent, 'articles'>) {
  if (!articles.cards || articles.cards.length === 0) return null;
  
  const featured = articles.cards[0];
  const list = articles.cards.slice(1);

  return (
    <section id="articles" className="content-section content-section--light articles-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
        <SectionHeading eyebrow={articles.eyebrow} title={articles.title} accent="Articles" />
        <div className="filter-pills">
          <button type="button" className="pill active">All</button>
          <button type="button" className="pill">Culture</button>
          <button type="button" className="pill">Nature</button>
          <button type="button" className="pill">Surfing</button>
        </div>
      </div>

      <div className="news-native-layout">
        <article className="news-native-featured reveal">
          <div className="news-native-featured-content">
            <span className="dest-card-tag" style={{ position: 'relative', color: 'var(--ocean)', borderColor: 'var(--ocean)', backgroundColor: 'transparent', marginBottom: '24px' }}>Trending</span>
            <h3 className="section-title" style={{ fontSize: '2.8rem', marginBottom: '20px', marginTop: '10px' }}>{featured.title}</h3>
            <p className="about-text" style={{ marginBottom: '32px', fontSize: '1.1rem' }}>{featured.excerpt}</p>
            <Link to={`/article/${featured.id}`} className="btn-primary btn-primary--inline">
              Read Story
            </Link>
          </div>
          <div className="news-native-featured-img">
            <img src={featured.image} alt={featured.title} style={{ borderRadius: '24px', width: '100%', height: '100%', objectFit: 'cover', boxShadow: 'var(--shadow)' }} />
          </div>
        </article>

        <div className="news-native-list reveal reveal-delay-1">
          {list.map((card) => (
            <Link to={`/article/${card.id}`} key={card.id} className="news-native-list-item">
              <img src={card.image} alt={card.title} />
              <div className="news-native-list-info">
                <h4 className="culture-item-title">{card.title}</h4>
                <p className="culture-item-desc">{card.excerpt}</p>
              </div>
              <div className="t-card-arrow" style={{ color: 'var(--teal)', fontSize: '1.5rem', marginLeft: 'auto' }}>→</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

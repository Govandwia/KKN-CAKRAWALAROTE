import { useEffect, useMemo, useState } from 'react';

import siteContent from '../../data/site-content.json';
import { Icon } from '../shared/Icons';
import { SectionHeading } from '../shared/SectionHeading';

type SiteContent = typeof siteContent;

export function WeatherSection({ weather }: Pick<SiteContent, 'weather'>) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const localTime = useMemo(
    () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Makassar',
        hour12: false,
      }).format(now),
    [now],
  );

  const currentMonth = now.getMonth();
  const currentSeason = currentMonth >= 4 && currentMonth <= 9 ? (currentMonth >= 6 && currentMonth <= 8 ? 'Peak Window' : 'Dry Season') : 'Green Season';

  return (
    <section id="weather-section" className="content-section content-section--dark weather-section">
      <div className="wx-wrapper">
        <SectionHeading eyebrow={weather.eyebrow} title={weather.title} accent="Visit Rote" description={weather.subtitle} />

        <div className="wx-live-bar reveal">
          <div className="wx-live-item">
            <Icon name="clock" className="wx-live-icon" />
            <span>Local Time</span>
            <strong>{localTime}</strong>
          </div>
          <div className="wx-divider" />
          <div className="wx-live-item">
            <Icon name="map-pin" className="wx-live-icon" />
            <span>Location</span>
            <strong>10°44′S, 123°05′E</strong>
          </div>
          <div className="wx-divider" />
          <div className="wx-live-item">
            <Icon name="sun" className="wx-live-icon" />
            <span>Avg Temp</span>
            <strong>29°C / 84°F</strong>
          </div>
          <div className="wx-divider" />
          <div className="wx-live-item wx-season-badge">
            <Icon name="spark" className="wx-live-icon" />
            <span>Current Season</span>
            <strong>{currentSeason}</strong>
          </div>
        </div>

        <div className="wx-calendar reveal">
          <div className="wx-months">
            {weather.months.map((month, index) => {
              const isCurrent = index === currentMonth;
              return (
                <div key={month.name} className={`wx-month ${month.kind} ${isCurrent ? 'current' : ''}`}>
                  <div className="wx-month-name">{month.name}</div>
                  <div className="wx-month-icon">
                    <Icon name={month.kind === 'peak' ? 'spark' : month.kind === 'dry' ? 'sun' : 'route'} />
                  </div>
                  <div className="wx-month-bar" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="wx-seasons reveal">
          {weather.seasons.map((season, index) => (
            <article key={season.name} className={`wx-season-card ${index === 0 ? 'wx-dry' : index === 1 ? 'wx-wet' : 'wx-peak'}`}>
              <div className="wx-season-icon">
                <Icon name={index === 0 ? 'sun' : index === 1 ? 'route' : 'spark'} />
              </div>
              <h3 className="wx-season-name">{season.name}</h3>
              <div className="wx-season-months">{season.months}</div>
              <div className="wx-season-rating">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <span key={starIndex} className={starIndex < Math.floor(season.rating) ? 'wx-star filled' : season.rating % 1 && starIndex === Math.floor(season.rating) ? 'wx-star half' : 'wx-star'} />
                ))}
              </div>
              <p className="wx-season-desc">{season.desc}</p>
              <div className="wx-season-tags">
                {season.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

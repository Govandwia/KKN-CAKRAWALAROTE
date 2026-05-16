import { useMemo, useState } from 'react';

import itinerariesData from '../../data/itineraries.json';
import { Icon } from '../shared/Icons';
import { SectionHeading } from '../shared/SectionHeading';

type ItinerariesData = typeof itinerariesData;

type ModeKey = keyof ItinerariesData;

const modeOrder: ModeKey[] = ['adventure', 'luxury', 'backpacker', 'photo', 'family'];

export function ItinerarySection() {
  const [activeMode, setActiveMode] = useState<ModeKey>('adventure');
  const modeData = itinerariesData[activeMode];

  const modeButtons = useMemo(
    () =>
      modeOrder.map((mode) => ({
        key: mode,
        label: itinerariesData[mode].label,
        sub: mode === 'adventure' ? 'Explorer' : mode === 'luxury' ? 'Escape' : mode === 'backpacker' ? 'Budget' : mode === 'photo' ? 'Journey' : 'Vacation',
      })),
    [],
  );

  return (
    <section id="itinerary" className="content-section content-section--dark itinerary-section">
      <div className="iti-wrapper">
        <div className="iti-header reveal">
          <SectionHeading eyebrow="Plan Your Visit" title="Build Your Rote Journey" accent="Rote Journey" />
          <p className="iti-subtitle">Choose your travel style. We craft the perfect island itinerary — every detail considered.</p>
        </div>

        <div className="iti-modes reveal">
          {modeButtons.map((mode) => (
            <button key={mode.key} className={mode.key === activeMode ? 'iti-mode-btn active' : 'iti-mode-btn'} type="button" onClick={() => setActiveMode(mode.key)}>
              <div className="iti-mode-icon">
                <Icon name={mode.key === 'adventure' ? 'spark' : mode.key === 'luxury' ? 'star' : mode.key === 'backpacker' ? 'users' : mode.key === 'photo' ? 'camera' : 'home'} />
              </div>
              <div className="iti-mode-label">{mode.label}</div>
              <div className="iti-mode-sub">{mode.sub}</div>
            </button>
          ))}
        </div>

        <div className="iti-content reveal reveal-delay-1">
          <div className="iti-info-panel">
            <div className="itin-mode-card">
              <img src={modeData.img} alt={modeData.label} />
              <div className="itin-mode-card-overlay">
                <div className="itin-mode-label">{modeData.label}</div>
                <div className="itin-mode-title">{modeData.title}</div>
                <div className="itin-mode-desc">{modeData.desc}</div>
              </div>
            </div>

            <div className="itin-stats">
              <div className="itin-stat">
                <div className="itin-stat-value">{modeData.days}</div>
                <div className="itin-stat-label">Days</div>
              </div>
              <div className="itin-stat">
                <div className="itin-stat-value">{modeData.budget}</div>
                <div className="itin-stat-label">Est. Budget/day</div>
              </div>
              <div className="itin-stat">
                <div className="itin-stat-value">{modeData.dest}</div>
                <div className="itin-stat-label">Destinations</div>
              </div>
              <div className="itin-stat">
                <div className="itin-stat-value">{modeData.level}</div>
                <div className="itin-stat-label">Activity Level</div>
              </div>
            </div>

            <div className="itin-tags">
              {modeData.tags.map((tag) => (
                <span key={tag} className="itin-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="iti-days-panel">
            <div className="iti-days-title">Day Timeline</div>
            <div className="iti-days-list">
              {modeData.days_data.map((day, dayIndex) => (
                <article key={day.title} className="iti-day">
                  <div className="iti-day-num">D{dayIndex + 1}</div>
                  <div className="iti-day-content">
                    <div className="iti-day-title">{day.title}</div>
                    <div className="iti-day-region">{day.region}</div>
                    <div className="iti-day-activities">
                      {day.stops.map((stop) => (
                        <div key={stop.name} className="iti-activity">
                          <Icon name={stop.icon as React.ComponentProps<typeof Icon>['name']} />
                          <span>
                            {stop.time} · {stop.name}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="itin-day-photos">
                      {day.photos.map((photo) => (
                        <img key={photo} src={photo} alt="" loading="lazy" />
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="itin-cta-bar reveal">
          <div className="itin-cta-text">
            <strong>Ready to explore Rote?</strong>
            <span>Download this itinerary as PDF or share with your travel group.</span>
          </div>
          <div className="itin-cta-actions">
            <a href="#contact" className="btn-ghost">
              Save Itinerary
            </a>
            <a href="#contact" className="btn-primary">
              Plan My Trip →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

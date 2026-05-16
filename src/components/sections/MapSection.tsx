import { useMemo, useState } from 'react';

import siteContent from '../../data/site-content.json';
import { Icon } from '../shared/Icons';
import { SectionHeading } from '../shared/SectionHeading';

type SiteContent = typeof siteContent;

export function MapSection({ map }: Pick<SiteContent, 'map'>) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(map.destinations[0]?.id ?? '');

  const filteredDestinations = useMemo(() => {
    return activeFilter === 'all' ? map.destinations : map.destinations.filter((destination) => destination.category === activeFilter);
  }, [activeFilter, map.destinations]);

  const selectedDestination = filteredDestinations.find((destination) => destination.id === selectedId) ?? filteredDestinations[0] ?? map.destinations[0];

  return (
    <section id="map-section" className="content-section content-section--forest map-section">
      <div className="map-wrapper">
        <div className="map-header reveal">
          <SectionHeading eyebrow={map.eyebrow} title={map.title} accent="Landscape" />
          <p className="map-subtitle">{map.subtitle}</p>
        </div>

        <div className="map-layout reveal">
          <aside className="map-sidebar">
            <div className="map-filter-title">Filter by Category</div>
            <div className="map-filters-list">
              {map.filters.map((filter) => (
                <button
                  key={filter.key}
                  className={filter.key === activeFilter ? 'map-filter-btn active' : 'map-filter-btn'}
                  type="button"
                  onClick={() => {
                    setActiveFilter(filter.key);
                    const firstMatch = filter.key === 'all' ? map.destinations[0] : map.destinations.find((destination) => destination.category === filter.key);
                    if (firstMatch) {
                      setSelectedId(firstMatch.id);
                    }
                  }}
                >
                  <Icon name={filter.key === 'beach' ? 'beach' : filter.key === 'surf' ? 'waves' : filter.key === 'culture' ? 'culture' : filter.key === 'nature' ? 'nature' : 'map-pin'} />
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="map-dest-list">
              {filteredDestinations.map((destination) => (
                <button
                  key={destination.id}
                  type="button"
                  className={destination.id === selectedId ? 'map-dest-item active' : 'map-dest-item'}
                  onClick={() => setSelectedId(destination.id)}
                >
                  <span className="map-dest-dot" />
                  <span>
                    <span className="map-dest-name">{destination.name}</span>
                    <span className="map-dest-cat">{destination.category}</span>
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <div className="map-canvas-wrap">
            <div className="map-island-graphic" />
            {filteredDestinations.map((destination) => (
              <button
                key={destination.id}
                type="button"
                className={destination.id === selectedId ? 'map-marker active' : 'map-marker'}
                style={{ left: `${destination.x}%`, top: `${destination.y}%` }}
                onClick={() => setSelectedId(destination.id)}
              >
                <span />
              </button>
            ))}

            {selectedDestination ? (
              <aside className="map-tooltip visible" style={{ left: '24px', bottom: '24px' }}>
                <div className="map-tooltip-img">
                  <img src={selectedDestination.image} alt={selectedDestination.name} />
                </div>
                <div className="map-tooltip-body">
                  <div className="map-tooltip-cat">{selectedDestination.category}</div>
                  <div className="map-tooltip-name">{selectedDestination.name}</div>
                  <div className="map-tooltip-desc">{selectedDestination.desc}</div>
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

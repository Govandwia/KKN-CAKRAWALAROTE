import { useMemo, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import siteContent from '../../data/site-content.json';
import { Icon } from '../shared/Icons';
import { SectionHeading } from '../shared/SectionHeading';

const createCustomIcon = (isActive: boolean) => L.divIcon({
  className: 'custom-leaflet-marker',
  html: `<div style="width: 16px; height: 16px; background-color: ${isActive ? '#5EEAD4' : '#CCB27B'}; border-radius: 50%; box-shadow: 0 0 0 6px ${isActive ? 'rgba(94, 234, 212, 0.2)' : 'rgba(204, 178, 123, 0.2)'}; border: 2px solid #0a1914; transition: all 0.3s ease;"></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14]
});

function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), { duration: 1.5 });
  }, [center, map]);
  return null;
}

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

          <div className="map-canvas-wrap" style={{ position: 'relative', overflow: 'hidden', padding: 0 }}>
            <MapContainer 
              center={[selectedDestination.lat, selectedDestination.lng]} 
              zoom={11} 
              style={{ width: '100%', height: '100%', background: '#0a1914', borderRadius: 'inherit' }}
              zoomControl={true}
              scrollWheelZoom={true}
              attributionControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; OpenStreetMap contributors &copy; CARTO'
              />
              <MapUpdater center={[selectedDestination.lat, selectedDestination.lng]} />
              
              {filteredDestinations.map((destination) => (
                <Marker 
                  key={destination.id}
                  position={[destination.lat, destination.lng]}
                  icon={createCustomIcon(destination.id === selectedId)}
                  eventHandlers={{
                    click: () => setSelectedId(destination.id),
                  }}
                />
              ))}
            </MapContainer>

            {selectedDestination ? (
              <aside className="map-tooltip visible" style={{ left: '24px', bottom: '24px', zIndex: 1000 }}>
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

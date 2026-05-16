import { useEffect, useMemo, useState } from 'react';

import galleryData from '../../data/gallery.json';

type GalleryData = typeof galleryData;

export function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<GalleryData['filters'][number]>('all');
  const [fanIndex, setFanIndex] = useState(0);

  const filteredItems = useMemo(() => {
    return activeFilter === 'all' ? galleryData.items : galleryData.items.filter((item) => item.cat === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    setFanIndex(0);
  }, [activeFilter]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        setFanIndex((current) => (current - 1 + filteredItems.length) % filteredItems.length);
      }
      if (event.key === 'ArrowRight') {
        setFanIndex((current) => (current + 1) % filteredItems.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredItems.length]);

  const visibleCards = [-2, -1, 0, 1, 2].map((offset) => {
    const total = filteredItems.length;
    const index = (fanIndex + offset + total) % total;
    return { offset, item: filteredItems[index], index };
  });

  return (
    <section id="gallery" className="content-section content-section--dark gallery-section">
      <div className="gallery-header reveal">
        <div className="section-eyebrow section-eyebrow--center">Visual Diary</div>
        <h2 className="section-title section-title--center">
          Gallery <em>Rote</em>
        </h2>
        <p className="gallery-subtitle">See Rote through every lens</p>
      </div>

      <div className="gallery-filters reveal">
        {galleryData.filters.map((filter) => (
          <button key={filter} className={filter === activeFilter ? 'pill active' : 'pill'} onClick={() => setActiveFilter(filter)}>
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      <div className="gallery-fan-wrap reveal">
        <div className="gallery-fan-track">
          {visibleCards.map(({ offset, item, index }) => (
            <button
              key={`${item.label}-${index}`}
              type="button"
              className="fan-card"
              data-pos={offset}
              onClick={() => {
                if (offset !== 0) {
                  setFanIndex(index);
                }
              }}
            >
              <img src={item.src} alt={item.label} loading="lazy" />
              <div className="fan-card-play">
                <div className="fan-card-play-btn">▶</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="gallery-nav reveal">
        <button className="gallery-nav-btn" type="button" onClick={() => setFanIndex((current) => (current - 1 + filteredItems.length) % filteredItems.length)}>
          ←
        </button>
        <div className="gallery-nav-dots">
          {filteredItems.map((item, index) => (
            <button key={item.label} type="button" className={index === fanIndex ? 'gallery-dot active' : 'gallery-dot'} onClick={() => setFanIndex(index)} />
          ))}
        </div>
        <button className="gallery-nav-btn" type="button" onClick={() => setFanIndex((current) => (current + 1) % filteredItems.length)}>
          →
        </button>
      </div>
    </section>
  );
}

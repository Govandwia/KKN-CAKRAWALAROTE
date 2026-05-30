import { useEffect, useState } from 'react';

import siteContent from '../data/site-content.json';
import { SiteFooter } from '../components/layout/SiteFooter';
import { SiteHeader } from '../components/layout/SiteHeader';
import { HeroSection } from '../components/sections/HeroSection';
import {
  AboutSection,
  ContactSection,
  CultureSection,
  DestinationsSection,
  EventsSection,
  TestimonialsSection,
  TourismSection,
  UmkmSection,
  YouthSection,
  ArticleSection,
} from '../components/sections/StaticSections';
import { GallerySection } from '../components/sections/GallerySection';
import { ItinerarySection } from '../components/sections/ItinerarySection';
import { MapSection } from '../components/sections/MapSection';
import { WeatherSection } from '../components/sections/WeatherSection';

type SiteContent = typeof siteContent;

export function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 60);
    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

    return () => {
      window.removeEventListener('scroll', updateScrolled);
      observer.disconnect();
    };
  }, []);

  const content = siteContent as SiteContent;

  return (
    <>
      <SiteHeader navItems={content.nav} scrolled={scrolled} brand={<>{content.footer.brand.split(' ')[0]} <span>{content.footer.brand.split(' ')[1]}</span></>} />
      <main>
        <HeroSection hero={content.hero} />
        <DestinationsSection destinations={content.destinations} />
        <AboutSection about={content.about} />
        <TourismSection tourism={content.tourism} />
        <CultureSection culture={content.culture} />
        <UmkmSection umkm={content.umkm} />
        <EventsSection events={content.events} />
        <GallerySection />
        <ArticleSection articles={content.articles} />
        <YouthSection youth={content.youth} />
        <WeatherSection weather={content.weather} />
        <MapSection map={content.map} />
        <ItinerarySection />
        <TestimonialsSection />
        <ContactSection contact={content.contact} />
      </main>
      <SiteFooter brand={content.footer.brand} desc={content.footer.desc} columns={content.footer.columns} copy={content.footer.copy} />
    </>
  );
}

export default HomePage;

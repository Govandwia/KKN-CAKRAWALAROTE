type HeroSectionProps = {
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    buttons: Array<{ label: string; href: string; variant: string }>;
    stats: Array<{ value: string; label: string }>;
    tags: string[];
  };
};

export function HeroSection({ hero }: HeroSectionProps) {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg" />
      <div className="hero-vignette" />
      <div className="hero-glow hero-glow--teal" />
      <svg className="hero-ornament hero-ornament--top" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="heroIkat" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <polygon points="10,1 19,10 10,19 1,10" fill="none" stroke="#c8a96e" strokeWidth="0.6" />
            <circle cx="10" cy="10" r="1.5" fill="rgba(200,169,110,0.5)" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#heroIkat)" />
      </svg>

      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-eyebrow reveal">{hero.eyebrow}</div>
          <h1 className="hero-title reveal reveal-delay-1">{hero.title}</h1>
          <p className="hero-subtitle reveal reveal-delay-2">{hero.subtitle}</p>
          <div className="hero-btns reveal reveal-delay-3">
            {hero.buttons.map((button) => (
              <a key={button.href} href={button.href} className={button.variant === 'primary' ? 'btn-primary' : 'btn-ghost'}>
                {button.variant === 'ghost' ? '▶ ' : ''}
                {button.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hero-right reveal reveal-delay-2">
          <div className="hero-stat-row">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="hero-stat-card">
                <div className="num">{stat.value}</div>
                <div className="lbl">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="hero-floating-cards">
            {hero.tags.map((tag) => (
              <div key={tag} className="float-card">
                <span className="icon">✦</span>
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

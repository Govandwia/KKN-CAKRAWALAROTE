import type { ReactNode } from 'react';

type NavItem = {
  label: string;
  href: string;
};

type SiteHeaderProps = {
  navItems: NavItem[];
  scrolled: boolean;
  brand: ReactNode;
};

export function SiteHeader({ navItems, scrolled, brand }: SiteHeaderProps) {
  return (
    <nav className={scrolled ? 'site-header is-scrolled' : 'site-header'}>
      <a href="#hero" className="nav-logo">
        {brand}
      </a>
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.href}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="nav-cta">
        Plan Your Visit
      </a>
    </nav>
  );
}

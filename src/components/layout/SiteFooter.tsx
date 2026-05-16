type FooterColumn = {
  title: string;
  links: string[];
};

type SiteFooterProps = {
  brand: string;
  desc: string;
  columns: FooterColumn[];
  copy: string;
};

export function SiteFooter({ brand, desc, columns, copy }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <div className="footer-brand-name">
            {brand.split(' ')[0]} <span>{brand.split(' ')[1]}</span>
          </div>
          <p className="footer-brand-desc">{desc}</p>
          <div className="social-links">
            {['📷', '🐦', '▶️', '📘'].map((symbol) => (
              <a key={symbol} href="#" className="social-link" aria-label={symbol}>
                {symbol}
              </a>
            ))}
          </div>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <div className="footer-col-title">{column.title}</div>
            <ul className="footer-links">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">{copy}</p>
        <a href="#hero" className="back-to-top">
          Back to top
          <span className="back-to-top-arrow">↑</span>
        </a>
      </div>
    </footer>
  );
}

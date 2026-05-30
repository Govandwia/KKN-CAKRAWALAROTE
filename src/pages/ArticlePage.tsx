import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import siteContent from '../data/site-content.json';
import { SiteFooter } from '../components/layout/SiteFooter';
import { SiteHeader } from '../components/layout/SiteHeader';

type SiteContent = typeof siteContent;

export function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<'en' | 'id'>('en');
  const content = siteContent as any; // Cast as any to bypass strict typing for the new ID fields

  useEffect(() => {
    window.scrollTo(0, 0);
    const updateScrolled = () => setScrolled(window.scrollY > 60);
    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrolled);
    };
  }, []);

  const article = content.articles.cards.find(a => a.id === id);

  return (
    <>
      <SiteHeader navItems={content.nav.map(nav => ({...nav, href: `/#${nav.href.split('#')[1]}`}))} scrolled={scrolled} brand={<>{content.footer.brand.split(' ')[0]} <span>{content.footer.brand.split(' ')[1]}</span></>} />
      
      <main className="content-section content-section--light" style={{ minHeight: '100vh', paddingTop: '160px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--ocean)', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', fontWeight: 600 }}>
              <span style={{ fontSize: '1.2rem' }}>←</span> {lang === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
            </Link>
            
            <div style={{ display: 'flex', background: 'rgba(13, 27, 40, 0.05)', borderRadius: '100px', padding: '4px' }}>
              <button 
                onClick={() => setLang('en')}
                style={{ border: 'none', background: lang === 'en' ? 'white' : 'transparent', padding: '6px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ocean)', cursor: 'pointer', transition: '0.2s', boxShadow: lang === 'en' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}>
                EN
              </button>
              <button 
                onClick={() => setLang('id')}
                style={{ border: 'none', background: lang === 'id' ? 'white' : 'transparent', padding: '6px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 600, color: 'var(--ocean)', cursor: 'pointer', transition: '0.2s', boxShadow: lang === 'id' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none' }}>
                ID
              </button>
            </div>
          </div>
          
          {article ? (
            <article className="reveal visible">
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <span className="dest-card-tag" style={{ position: 'relative', color: 'var(--ocean)', borderColor: 'var(--ocean)', backgroundColor: 'transparent', marginBottom: '20px' }}>Trending</span>
                <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: 'var(--ocean)', marginBottom: '20px' }}>
                  {lang === 'id' && article.title_id ? article.title_id : article.title}
                </h1>
                <div style={{ color: 'var(--sand)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
                  {article.date} · by Aldi Arya
                </div>
              </div>
              
              <img src={article.image} alt={article.title} style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: '24px', marginBottom: '60px', boxShadow: 'var(--shadow)' }} />
              
              <div style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'rgba(13, 27, 40, 0.85)' }}>
                {((lang === 'id' && article.content_id ? article.content_id : article.content) || '').length > 0 && (
                  <>
                    <span style={{ float: 'left', fontSize: '4.5rem', lineHeight: 0.8, paddingTop: '8px', paddingRight: '16px', fontFamily: "'Cormorant Garamond', serif", color: 'var(--teal)' }}>
                      {(lang === 'id' && article.content_id ? article.content_id : article.content).charAt(0)}
                    </span>
                    {(lang === 'id' && article.content_id ? article.content_id : article.content).substring(1)}
                  </>
                )}
              </div>
            </article>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--ocean)' }}>
              <h2 className="section-title">Article not found</h2>
              <p>The article you are looking for does not exist.</p>
            </div>
          )}
        </div>
      </main>
      
      <SiteFooter brand={content.footer.brand} desc={content.footer.desc} columns={content.footer.columns} copy={content.footer.copy} />
    </>
  );
}

export default ArticlePage;

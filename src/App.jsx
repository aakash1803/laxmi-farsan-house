import { useState } from 'react';
import './App.css';
import lfhLogo from './assets/lfh-logo.png';
import gathiyaHero from './assets/gathiya-without-bg.png';
import sevHero from './assets/sev-without-bg.png';
import chevdoHero from './assets/chevdo-without-bg.png';

const MENU_DATA = {
  "Gathiya": [
    { n: "Nylon Gathiya", img: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400&auto=format&fit=crop" },
    { n: "Tikha Gathiya" },
    { n: "Gada Tikha Gathiya" },
    { n: "Champakali Gathiya" },
    { n: "Mari Gathiya" },
    { n: "Fafdi Gathiya" },
  ],
  "Sev": [
    { n: "Regular Sev", img: "https://images.unsplash.com/photo-1589476993333-f55b84301219?q=80&w=400&auto=format&fit=crop" },
    { n: "Tikhi Sev" },
    { n: "Khatti Meethi Sev" },
    { n: "0 No. Sev" },
    { n: "Tomato Sev" },
  ],
  "Chevdo": [
    { n: "Golden Chevdo" },
    { n: "Khatta Meetha Chevdo" },
    { n: "Farali Chevdo" },
    { n: "Special Farali Chevdo" },
    { n: "Poha No Chevdo" },
  ],
  "Puri": [
    { n: "Farsi Puri", img: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400&auto=format&fit=crop" },
    { n: "Small Farsi Puri" },
    { n: "Chat Puri" },
    { n: "Gulab Puri" },
  ],
  "Sweets & Others": [
    { n: "Bhakerwadi" },
    { n: "Cholafali" },
    { n: "Moti chur laddu", img: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=400&auto=format&fit=crop" },
    { n: "Besan laddu" },
    { n: "Mohan thal" },
    { n: "Jalebi" },
    { n: "Shakarpara" },
    { n: "Corn Bites" },
    { n: "Salted Boondi" },
    { n: "Masala Boondi" },
    { n: "Masala Chana Dal" },
    { n: "Potato Chips" },
    { n: "Banana Chips" }
  ]
};

const HERO_IMAGES = [
  {
    thumbnail: gathiyaHero,
    full: gathiyaHero,
    alt: "Fresh Gathiya from Laxmi Farshan House"
  },
  {
    thumbnail: "https://images.unsplash.com/photo-1589476993333-f55b84301219?q=80&w=150&auto=format&fit=crop",
    full: "https://images.unsplash.com/photo-1589476993333-f55b84301219?q=80&w=800&auto=format&fit=crop",
    alt: "Nylon Fine Sev from Laxmi Farshan House"
  },
  {
    thumbnail: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=150&auto=format&fit=crop",
    full: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=800&auto=format&fit=crop",
    alt: "Festive Sweets & Laddus from Laxmi Farshan House"
  },
  {
    thumbnail: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=150&auto=format&fit=crop",
    full: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop",
    alt: "Crunchy Masala Snacks"
  }
];

function MenuItemCard({ item }) {
  return (
    <div className="item-card">
      {item.img ? (
        <div className="item-img-wrap">
          <img src={item.img} className="item-img" alt={item.n} />
        </div>
      ) : (
        <div className="item-img-placeholder"></div>
      )}
      <div className="item-name">{item.n}</div>
    </div>
  );
}

function App() {
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Gathiya");

  return (
    <>
      {/* TOPBAR */}
      <div className="topbar">
        <div className="brand-area">
          <img src={lfhLogo} className="brand-logo" alt="LFH Logo" />
          <div className="brand-text">LAXMI <span>FARSHAN</span></div>
        </div>
        <div className="nav-links">
          <a href="#featured">Home</a>
          <a href="#menu">Menu</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="pill" href="https://wa.me/917878828312?text=Hi%2C%20I%27d%20like%20to%20order%20from%20Laxmi%20Farshan%20House" target="_blank" rel="noopener noreferrer">Order Now</a>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-kicker">BHAVNAGAR'S OWN</div>
            <h1>Laxmi<br /><span>Farshan</span> House</h1>
            <p className="hero-tagline">Crispy. Fresh. Made right from our home recipes the way you've always remembered it.</p>
            <div className="hero-ctas">
              <a className="pill lg" href="tel:+917878828312">📞 Call to Order</a>
              <a className="pill lg outline" href="#menu">Full Menu ↓</a>
            </div>
            <div className="thumb-row">
              {HERO_IMAGES.map((img, idx) => (
                <img
                  key={idx}
                  src={img.thumbnail}
                  className={activeHeroIdx === idx ? 'active' : ''}
                  alt={img.alt}
                  onClick={() => setActiveHeroIdx(idx)}
                />
              ))}
            </div>
          </div>
          <div className="hero-img-wrap">
            {activeHeroIdx === 0 ? (
              <div className="layered-hero-wrap">
                <img
                  className="hero-product gathiya-front"
                  src={gathiyaHero}
                  alt="Fresh Gathiya from Laxmi Farshan House"
                />
                <img
                  className="hero-product-secondary sev-back"
                  src={sevHero}
                  alt="Sev from Laxmi Farshan House"
                />
                <img
                  className="hero-product-tertiary chevdo-back"
                  src={chevdoHero}
                  alt="Chevdo from Laxmi Farshan House"
                />
              </div>
            ) : (
              <img
                className="hero-product"
                src={HERO_IMAGES[activeHeroIdx].full}
                alt={HERO_IMAGES[activeHeroIdx].alt}
              />
            )}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured" id="featured">
        <div className="section-head">
          <div>
            <p className="kicker">What We're Known For</p>
            <h2>Our Bestsellers</h2>
          </div>
        </div>
        <div className="product-row">
          <div className="p-card">
            <img className="p-card-img" src="https://images.unsplash.com/photo-1589476993333-f55b84301219?q=80&w=400&auto=format&fit=crop" alt="Nylon Sev" />
            <div className="p-card-body">
              <div className="p-card-name">Nylon Sev</div>
              <div className="p-card-price">₹240/-</div>
              <div className="p-card-tag">Fan Favourite</div>
            </div>
          </div>
          <div className="p-card">
            <img className="p-card-img" src="https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400&auto=format&fit=crop" alt="Farsi Puri" />
            <div className="p-card-body">
              <div className="p-card-name">Farsi Puri</div>
              <div className="p-card-price">₹240/-</div>
              <div className="p-card-tag">Chai Partner</div>
            </div>
          </div>
          <div className="p-card">
            <img className="p-card-img" src="https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400&auto=format&fit=crop" alt="Bhavnagari Gathiya" />
            <div className="p-card-body">
              <div className="p-card-name">Bhavnagari Gathiya</div>
              <div className="p-card-price">₹240/-</div>
              <div className="p-card-tag">Classic</div>
            </div>
          </div>
          <div className="p-card">
            <img className="p-card-img" src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=400&auto=format&fit=crop" alt="Masala Chana Dal" />
            <div className="p-card-body">
              <div className="p-card-name">Masala Chana Dal</div>
              <div className="p-card-price">₹240/-</div>
              <div className="p-card-tag">Crunchy Hit</div>
            </div>
          </div>
          <div className="p-card">
            <img className="p-card-img" src="https://images.unsplash.com/photo-1589476993333-f55b84301219?q=80&w=400&auto=format&fit=crop" alt="Tikhi Sev" />
            <div className="p-card-body">
              <div className="p-card-name">Tikhi Sev</div>
              <div className="p-card-price">₹240/-</div>
              <div className="p-card-tag">Spice Lovers</div>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER CTA */}
      <div className="banner-cta">
        <img className="banner-cta-img" src="https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600&auto=format&fit=crop" alt="Fresh Festive Sweets and Laddus" />
        <div className="banner-cta-text">
          <h2>Festive Sweets & Bulk Boxes?</h2>
          <p>Moti chur laddu, Besan laddu, Mohan thal, Jalebi, and premium custom savouries. Custom packed for events, weddings, parties, or enterprise giftboxes.</p>
          <div>
            <a className="pill" href="https://wa.me/917878828312?text=Hi%2C%20I%20want%20to%20place%20a%20bulk%20order" target="_blank" rel="noopener noreferrer">WhatsApp for Bulk Orders →</a>
          </div>
        </div>
      </div>

      {/* SCROLLABLE STRIP */}
      <section className="strip-section">
        <div className="section-head">
          <div>
            <p className="kicker">Freshly Prepared</p>
            <h2>Straight from the Counter</h2>
          </div>
        </div>
        <div className="strip">
          <figure><img src="https://images.unsplash.com/photo-1589476993333-f55b84301219?q=80&w=300&auto=format&fit=crop" alt="Bhavnagari Sev" /><figcaption>Bhavnagari Sev</figcaption></figure>
          <figure><img src="https://images.unsplash.com/photo-1589476993333-f55b84301219?q=80&w=300&auto=format&fit=crop" alt="Nylon Sev" /><figcaption>Nylon Fine Sev</figcaption></figure>
          <figure><img src="https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=300&auto=format&fit=crop" alt="Farsi Puri" /><figcaption>Farsi Puri</figcaption></figure>
          <figure><img src="https://images.unsplash.com/photo-1589476993333-f55b84301219?q=80&w=300&auto=format&fit=crop" alt="Tikha Sev" /><figcaption>Tikha Sev</figcaption></figure>
          <figure><img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=300&auto=format&fit=crop" alt="Chana Dal" /><figcaption>Chana Dal</figcaption></figure>
          <figure><img src="https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=300&auto=format&fit=crop" alt="Sweets" /><figcaption>Festive Sweets</figcaption></figure>
        </div>
      </section>

      {/* FULL MENU */}
      <section className="menu-section" id="menu">
        <div className="section-head">
          <div>
            <p className="kicker">Fresh & Crispy Catalog</p>
            <h2>Explore Full Menu</h2>
          </div>
        </div>
        <div className="tabs" id="tabs">
          {Object.keys(MENU_DATA).map((cat) => (
            <button
              key={cat}
              className={`tab ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="menu-grid" id="menuGrid">
          {MENU_DATA[selectedCategory].map((item, idx) => (
            <MenuItemCard key={`${selectedCategory}-${item.n}-${idx}`} item={item} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <div className="foot-grid">
          <div className="foot-col">
            <div className="foot-brand">
              <img src={lfhLogo} alt="LFH Logo" />
              <div>
                <b style={{ fontSize: "1.1rem", letterSpacing: "0.02em" }}>Laxmi Farshan House</b>
              </div>
            </div>
          </div>
          <div className="foot-col">
            <h3>Store Address</h3>
            <p>Shop No.1, Airport Road<br />Opposite Patel Park<br />Bhavnagar, Gujarat</p>
          </div>
          <div className="foot-col">
            <h3>Quick Hotline</h3>
            <p>
              <a href="tel:+917878828312">📞 +91 78788 28312</a><br />
              <a href="https://wa.me/917878828312" target="_blank" rel="noopener noreferrer">💬 WhatsApp Instant Support</a>
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING BAR */}
      <div className="fab-row">
        <a className="pill outline" href="tel:+917878828312">📞 Call Shop</a>
        <a className="pill" style={{ background: "#25D366", color: "#fff" }} href="https://wa.me/917878828312" target="_blank" rel="noopener noreferrer">💬 WhatsApp Order</a>
      </div>
    </>
  );
}

export default App;

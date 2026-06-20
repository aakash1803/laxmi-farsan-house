import { useState, useEffect } from 'react';
import './App.css';
import lfhLogo from './assets/lfh-logo.png';
import gathiyaHero from './assets/gathiya-without-bg.png';
import sevHero from './assets/sev-without-bg.png';
import chevdoHero from './assets/chevdo-without-bg.png';

const WhatsAppIcon = ({ size = 16, style = {} }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    fill="currentColor" 
    viewBox="0 0 16 16"
    style={{ display: "inline-block", verticalAlign: "middle", ...style }}
  >
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.93a7.9 7.9 0 0 0 1.08 3.971L0 16l4.195-1.106a7.86 7.86 0 0 0 3.793.978h.004c4.368 0 7.928-3.559 7.93-7.93a7.9 7.9 0 0 0 -2.322-5.618H13.6zM7.994 14.521a6.57 6.57 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.618-4.961c-.195-.097-1.155-.57-1.336-.632-.18-.063-.31-.094-.44.1-.13.195-.5.616-.614.738-.116.124-.232.14-.428.045a5.244 5.244 0 0 1-1.593-1.037 5.857 5.857 0 0 1-1.102-1.37c-.116-.196-.012-.302.087-.401.089-.089.195-.224.293-.335.1-.11.13-.186.195-.31.066-.124.033-.232-.017-.331-.05-.1-.44-1.06-.604-1.458-.16-.387-.319-.335-.44-.341-.12-.007-.258-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
  </svg>
);

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

const AdminLogin = ({ onLoginSuccess, onGoHome }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Admin@LFH1234') {
      onLoginSuccess();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <h2>Admin Login</h2>
        <p className="admin-subtitle">Laxmi Farshan House Portal</p>
        <form onSubmit={handleSubmit}>
          {error && <div className="admin-error">{error}</div>}
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Enter username"
              required 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter password"
              required 
            />
          </div>
          <button type="submit" className="pill lg">Log In</button>
        </form>
        <button className="back-home-btn" onClick={onGoHome}>← Back to Store</button>
      </div>
    </div>
  );
};

const AdminDashboard = ({ onLogout }) => {
  return (
    <div className="admin-panel-wrapper">
      <div className="admin-sidebar">
        <div className="sidebar-brand">
          <span>LFH Admin</span>
        </div>
        <div className="sidebar-menu">
          <a href="#" className="active">Dashboard</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }}>Logout</a>
        </div>
      </div>
      <div className="admin-content">
        <header className="admin-header">
          <h2>Admin Dashboard</h2>
          <button className="pill outline" onClick={onLogout}>Logout</button>
        </header>
        <div className="admin-body">
          <div className="admin-empty-state">
            <p>Welcome to the Laxmi Farshan House Admin Panel.</p>
            <p className="subtext">Configure catalogs, edit items, and view inquiries (Interface is blank for now).</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('lfh_admin_auth') === 'true'
  );
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Gathiya");

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  useEffect(() => {
    if (currentPath === '/admin' && !isAuthenticated) {
      navigateTo('/admin/login');
    } else if (currentPath === '/admin/login' && isAuthenticated) {
      navigateTo('/admin');
    }
  }, [currentPath, isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    sessionStorage.setItem('lfh_admin_auth', 'true');
    navigateTo('/admin');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('lfh_admin_auth');
    navigateTo('/admin/login');
  };

  if (currentPath === '/admin/login') {
    return (
      <AdminLogin 
        onLoginSuccess={handleLoginSuccess} 
        onGoHome={() => navigateTo('/')} 
      />
    );
  }

  if (currentPath === '/admin') {
    if (!isAuthenticated) {
      return (
        <AdminLogin 
          onLoginSuccess={handleLoginSuccess} 
          onGoHome={() => navigateTo('/')} 
        />
      );
    }
    return (
      <AdminDashboard 
        onLogout={handleLogout} 
      />
    );
  }

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
              <div className="p-card-tag">Fan Favourite</div>
            </div>
          </div>
          <div className="p-card">
            <img className="p-card-img" src="https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400&auto=format&fit=crop" alt="Farsi Puri" />
            <div className="p-card-body">
              <div className="p-card-name">Farsi Puri</div>
              <div className="p-card-tag">Chai Partner</div>
            </div>
          </div>
          <div className="p-card">
            <img className="p-card-img" src="https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=400&auto=format&fit=crop" alt="Bhavnagari Gathiya" />
            <div className="p-card-body">
              <div className="p-card-name">Bhavnagari Gathiya</div>
              <div className="p-card-tag">Classic</div>
            </div>
          </div>
          <div className="p-card">
            <img className="p-card-img" src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=400&auto=format&fit=crop" alt="Masala Chana Dal" />
            <div className="p-card-body">
              <div className="p-card-name">Masala Chana Dal</div>
              <div className="p-card-tag">Crunchy Hit</div>
            </div>
          </div>
          <div className="p-card">
            <img className="p-card-img" src="https://images.unsplash.com/photo-1589476993333-f55b84301219?q=80&w=400&auto=format&fit=crop" alt="Tikhi Sev" />
            <div className="p-card-body">
              <div className="p-card-name">Tikhi Sev</div>
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
            <a className="pill" style={{ background: "#25D366", color: "#fff", display: "inline-flex", alignItems: "center", gap: "8px" }} href="https://wa.me/917878828312?text=Hi%2C%20I%20want%20to%20place%20a%20bulk%20order" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} /> WhatsApp for Bulk Orders →
            </a>
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
              <a href="https://wa.me/917878828312" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <WhatsAppIcon size={16} /> WhatsApp Instant Support
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING BAR */}
      <div className="fab-row">
        <a className="pill outline" href="tel:+917878828312">📞 Call Shop</a>
        <a className="pill" style={{ background: "#25D366", color: "#fff", display: "inline-flex", alignItems: "center", gap: "6px" }} href="https://wa.me/917878828312" target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={18} /> WhatsApp Order
        </a>
      </div>
    </>
  );
}

export default App;

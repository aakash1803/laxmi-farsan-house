import { useState, useEffect, useMemo } from 'react';
import './App.css';
import lfhLogo from './assets/lfh-logo.png';
import gathiyaHero from './assets/gathiya-without-bg.png';
import sevHero from './assets/sev-without-bg.png';
import chevdoHero from './assets/chevdo-without-bg.png';

// Firebase Firestore settings integration
import { db, isFirebaseEnabled } from './firebase';
import { doc, onSnapshot, setDoc, collection, addDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';

const WhatsAppIcon = ({ size = 16, style = {} }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    viewBox="0 0 16 16"
    style={{ display: "inline-block", verticalAlign: "middle", ...style }}
  >
    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.93a7.9 7.9 0 0 0 1.08 3.971L0 16l4.195-1.106a7.86 7.86 0 0 0 3.793.978h.004c4.368 0 7.928-3.559 7.93-7.93a7.9 7.9 0 0 0 -2.322-5.618H13.6zM7.994 14.521a6.57 6.57 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.618-4.961c-.195-.097-1.155-.57-1.336-.632-.18-.063-.31-.094-.44.1-.13.195-.5.616-.614.738-.116.124-.232.14-.428.045a5.244 5.244 0 0 1-1.593-1.037 5.857 5.857 0 0 1-1.102-1.37c-.116-.196-.012-.302.087-.401.089-.089.195-.224.293-.335.1-.11.13-.186.195-.31.066-.124.033-.232-.017-.331-.05-.1-.44-1.06-.604-1.458-.16-.387-.319-.335-.44-.341-.12-.007-.258-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
  </svg>
);

const INITIAL_BESTSELLERS = [
  {
    id: 1,
    n: "Nylon Sev",
    img: "",
    tag: "Fan Favourite"
  },
  {
    id: 2,
    n: "Farsi Puri",
    img: "",
    tag: "Chai Partner"
  },
  {
    id: 3,
    n: "Bhavnagari Gathiya",
    img: "",
    tag: "Classic"
  },
  {
    id: 4,
    n: "Masala Chana Dal",
    img: "",
    tag: "Crunchy Hit"
  },
  {
    id: 5,
    n: "Tikhi Sev",
    img: "",
    tag: "Spice Lovers"
  }
];

const INITIAL_COUNTER_ITEMS = [
  {
    id: 1,
    n: "Bhavnagari Sev",
    img: ""
  },
  {
    id: 2,
    n: "Nylon Fine Sev",
    img: ""
  },
  {
    id: 3,
    n: "Farsi Puri",
    img: ""
  },
  {
    id: 4,
    n: "Tikha Sev",
    img: ""
  },
  {
    id: 5,
    n: "Chana Dal",
    img: ""
  },
  {
    id: 6,
    n: "Festive Sweets",
    img: ""
  }
];

const DEFAULT_PHONE = "+91 78788 28312";
const DEFAULT_ADDRESS = "Shop No.1, Airport Road\nOpposite Patel Park\nBhavnagar, Gujarat";

const MENU_DATA = {
  "Gathiya": [
    { n: "Nylon Gathiya", img: "" },
    { n: "Tikha Gathiya" },
    { n: "Gada Tikha Gathiya" },
    { n: "Champakali Gathiya" },
    { n: "Mari Gathiya" },
    { n: "Fafdi Gathiya" },
  ],
  "Sev": [
    { n: "Regular Sev", img: "" },
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
    { n: "Farsi Puri", img: "" },
    { n: "Small Farsi Puri" },
    { n: "Chat Puri" },
    { n: "Gulab Puri" },
  ],
  "Sweets & Others": [
    { n: "Bhakerwadi" },
    { n: "Cholafali" },
    { n: "Moti chur laddu", img: "" },
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

// HERO_IMAGES is dynamically generated within the App component.

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

const AdminDashboard = ({
  onLogout,
  bestsellers,
  onAddBestseller,
  onDeleteBestseller,
  counterItems,
  onAddCounterItem,
  onDeleteCounterItem,
  menuData,
  onAddMenuItem,
  onDeleteMenuItem,
  storePhone,
  storeAddress,
  onUpdateSettings,
  festiveItems,
  onAddFestiveItem,
  onDeleteFestiveItem
}) => {
  const [activeTab, setActiveTab] = useState('bestsellers');

  // Bestsellers Form State
  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [tag, setTag] = useState('');

  // Counter Form State
  const [cName, setCName] = useState('');
  const [cImgUrl, setCImgUrl] = useState('');

  // Menu Form State
  const [menuCat, setMenuCat] = useState('Gathiya');
  const [menuName, setMenuName] = useState('');
  const [menuImg, setMenuImg] = useState('');

  // Store Settings State
  const [tempPhone, setTempPhone] = useState(storePhone);
  const [tempAddress, setTempAddress] = useState(storeAddress);

  // Festive Form State
  const [fTitle, setFTitle] = useState('');
  const [fDesc, setFDesc] = useState('');
  const [fImgUrl, setFImgUrl] = useState('');

  useEffect(() => {
    setTempPhone(storePhone);
  }, [storePhone]);

  useEffect(() => {
    setTempAddress(storeAddress);
  }, [storeAddress]);

  const handleAddBestsellerForm = (e) => {
    e.preventDefault();
    if (!name || !imgUrl || !tag) return;
    onAddBestseller({
      id: Date.now(),
      n: name,
      img: imgUrl,
      tag: tag
    });
    setName('');
    setImgUrl('');
    setTag('');
  };

  const handleAddCounterForm = (e) => {
    e.preventDefault();
    if (!cName || !cImgUrl) return;
    onAddCounterItem({
      id: Date.now(),
      n: cName,
      img: cImgUrl
    });
    setCName('');
    setCImgUrl('');
  };

  const handleAddMenuForm = (e) => {
    e.preventDefault();
    if (!menuName) return;
    onAddMenuItem(menuCat, menuName, menuImg);
    setMenuName('');
    setMenuImg('');
  };

  const handleAddFestiveForm = (e) => {
    e.preventDefault();
    if (!fTitle || !fDesc) return;
    onAddFestiveItem(fTitle, fDesc, fImgUrl);
    setFTitle('');
    setFDesc('');
    setFImgUrl('');
  };

  return (
    <div className="admin-panel-wrapper">
      <div className="admin-sidebar">
        <div className="sidebar-brand">
          <span>LFH Admin</span>
        </div>
        <div className="sidebar-menu">
          <a
            href="#"
            className={activeTab === 'bestsellers' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setActiveTab('bestsellers'); }}
          >
            Bestsellers Manager
          </a>
          <a
            href="#"
            className={activeTab === 'counter' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setActiveTab('counter'); }}
          >
            Counter Manager
          </a>
          <a
            href="#"
            className={activeTab === 'menu' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setActiveTab('menu'); }}
          >
            Menu Manager
          </a>
          <a
            href="#"
            className={activeTab === 'festive' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setActiveTab('festive'); }}
          >
            Festive & Bulk Manager
          </a>
          <a
            href="#"
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); setActiveTab('settings'); }}
          >
            Store Settings
          </a>
          <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }}>Logout</a>
        </div>
      </div>
      <div className="admin-content">
        <header className="admin-header">
          <h2>
            {activeTab === 'bestsellers'
              ? 'Bestsellers Manager'
              : activeTab === 'counter'
                ? 'Counter Manager'
                : activeTab === 'menu'
                  ? 'Menu Manager'
                  : activeTab === 'festive'
                    ? 'Festive & Bulk Manager'
                    : 'Store Settings'}
          </h2>
          <button className="pill outline" onClick={onLogout}>Logout</button>
        </header>
        <div className="admin-body-scrollable">
          {activeTab === 'bestsellers' ? (
            <div className="admin-grid-layout">
              {/* Form Panel */}
              <div className="admin-form-panel">
                <h3>Add New Bestseller</h3>
                <form onSubmit={handleAddBestsellerForm}>
                  <div className="input-group">
                    <label>Product Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Special Nylon Sev"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Image URL</label>
                    <input
                      type="url"
                      placeholder="e.g. https://images.unsplash.com/..."
                      value={imgUrl}
                      onChange={e => setImgUrl(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Tag / Badge</label>
                    <input
                      type="text"
                      placeholder="e.g. Fan Favourite"
                      value={tag}
                      onChange={e => setTag(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="pill lg admin-add-btn">Add to Bestsellers</button>
                </form>
              </div>

              {/* List Panel */}
              <div className="admin-list-panel">
                <h3>Current Bestsellers</h3>
                {bestsellers.length === 0 ? (
                  <div className="admin-list-empty">
                    No bestsellers added yet. Add one from the form on the left.
                  </div>
                ) : (
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Product Info</th>
                          <th>Tag</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bestsellers.map(item => (
                          <tr key={item.id}>
                            <td>
                              <img className="admin-table-thumb" src={item.img} alt={item.n} />
                            </td>
                            <td>
                              <div className="admin-table-name">{item.n}</div>
                            </td>
                            <td>
                              <span className="p-card-tag" style={{ position: "static", display: "inline-block" }}>
                                {item.tag}
                              </span>
                            </td>
                            <td>
                              <button
                                className="admin-delete-btn"
                                onClick={() => onDeleteBestseller(item.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'counter' ? (
            <div className="admin-grid-layout">
              {/* Counter Form Panel */}
              <div className="admin-form-panel">
                <h3>Add New Counter Item</h3>
                <form onSubmit={handleAddCounterForm}>
                  <div className="input-group">
                    <label>Caption / Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Special Gathiya"
                      value={cName}
                      onChange={e => setCName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Image URL</label>
                    <input
                      type="url"
                      placeholder="e.g. https://images.unsplash.com/..."
                      value={cImgUrl}
                      onChange={e => setCImgUrl(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="pill lg admin-add-btn">Add to Counter</button>
                </form>
              </div>

              {/* Counter List Panel */}
              <div className="admin-list-panel">
                <h3>Current Counter Items</h3>
                {counterItems.length === 0 ? (
                  <div className="admin-list-empty">
                    No counter items added yet. Add one from the form on the left.
                  </div>
                ) : (
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Caption / Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {counterItems.map(item => (
                          <tr key={item.id}>
                            <td>
                              <img className="admin-table-thumb" src={item.img} alt={item.n} />
                            </td>
                            <td>
                              <div className="admin-table-name">{item.n}</div>
                            </td>
                            <td>
                              <button
                                className="admin-delete-btn"
                                onClick={() => onDeleteCounterItem(item.id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'menu' ? (
            <div className="admin-grid-layout">
              {/* Menu Form Panel */}
              <div className="admin-form-panel">
                <h3>Add New Menu Item</h3>
                <form onSubmit={handleAddMenuForm}>
                  <div className="input-group">
                    <label>Category</label>
                    <select
                      value={menuCat}
                      onChange={e => setMenuCat(e.target.value)}
                      style={{
                        background: 'rgba(0, 0, 0, 0.25)',
                        border: '1px solid var(--line-light)',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        color: 'var(--cream)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        marginTop: '4px',
                        width: '100%',
                        cursor: 'pointer'
                      }}
                    >
                      {Object.keys(menuData).map(cat => (
                        <option key={cat} value={cat} style={{ background: '#1c1c1f', color: '#fff' }}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Item Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Special Nylon Gathiya"
                      value={menuName}
                      onChange={e => setMenuName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Image URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="e.g. https://images.unsplash.com/..."
                      value={menuImg}
                      onChange={e => setMenuImg(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="pill lg admin-add-btn">Add to Menu</button>
                </form>
              </div>

              {/* Menu List Panel */}
              <div className="admin-list-panel">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <h3 style={{ margin: 0 }}>Current Menu Items</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--cream-dim)' }}>Filter by Category:</span>
                    <select
                      value={menuCat}
                      onChange={e => setMenuCat(e.target.value)}
                      style={{
                        background: 'rgba(0, 0, 0, 0.25)',
                        border: '1px solid var(--line-light)',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        color: 'var(--cream)',
                        fontSize: '0.85rem',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {Object.keys(menuData).map(cat => (
                        <option key={cat} value={cat} style={{ background: '#1c1c1f', color: '#fff' }}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {(!menuData[menuCat] || menuData[menuCat].length === 0) ? (
                  <div className="admin-list-empty">
                    No items in this category yet. Add one from the form on the left.
                  </div>
                ) : (
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Item Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {menuData[menuCat].map((item, idx) => (
                          <tr key={`${item.n}-${idx}`}>
                            <td>
                              {item.img ? (
                                <img className="admin-table-thumb" src={item.img} alt={item.n} />
                              ) : (
                                <div style={{ width: '48px', height: '48px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px dashed var(--line)' }} />
                              )}
                            </td>
                            <td>
                              <div className="admin-table-name">{item.n}</div>
                            </td>
                            <td>
                              <button
                                className="admin-delete-btn"
                                onClick={() => onDeleteMenuItem(menuCat, idx)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'festive' ? (
            <div className="admin-grid-layout">
              {/* Form Panel */}
              <div className="admin-form-panel">
                <h3>Add New Festive Sweet / Bulk Box</h3>
                <form onSubmit={handleAddFestiveForm}>
                  <div className="input-group">
                    <label>Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Festive Sweets & Bulk Boxes?"
                      value={fTitle}
                      onChange={e => setFTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Description</label>
                    <textarea
                      placeholder="e.g. Besan laddu, Mohan thal, Jalebi..."
                      value={fDesc}
                      onChange={e => setFDesc(e.target.value)}
                      rows={3}
                      style={{
                        background: 'rgba(0, 0, 0, 0.25)',
                        border: '1px solid var(--line-light)',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        color: 'var(--cream)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        marginTop: '4px',
                        width: '100%',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Image URL</label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/..."
                      value={fImgUrl}
                      onChange={e => setFImgUrl(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="pill lg admin-add-btn">Add Festive Item</button>
                </form>
              </div>

              {/* List Panel */}
              <div className="admin-list-panel">
                <h3>Current Festive Items</h3>
                {festiveItems.length === 0 ? (
                  <div className="admin-list-empty">No items yet. Add one from the form on the left.</div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title / Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {festiveItems.map((item, idx) => (
                        <tr key={item.docId || item.id || idx}>
                          <td>
                            {item.img ? (
                              <img className="admin-table-thumb" src={item.img} alt={item.title} />
                            ) : (
                              <div style={{ width: '48px', height: '48px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', border: '1px dashed var(--line)' }} />
                            )}
                          </td>
                          <td>
                            <div className="admin-table-name" style={{ fontWeight: 'bold' }}>{item.title}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--cream-dim)', marginTop: '4px' }}>{item.description}</div>
                          </td>
                          <td>
                            <button
                              className="admin-delete-btn"
                              onClick={() => onDeleteFestiveItem(item.docId || item.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ) : (
            <div className="admin-grid-layout" style={{ gridTemplateColumns: "1fr" }}>
              {/* Settings Form Panel */}
              <div className="admin-form-panel" style={{ maxWidth: "600px", margin: "0 auto", width: "100%" }}>
                <h3>Update Store Settings</h3>
                <form onSubmit={(e) => { e.preventDefault(); onUpdateSettings(tempPhone, tempAddress); alert('Settings saved successfully!'); }}>
                  <div className="input-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      placeholder="e.g. +91 78788 28312"
                      value={tempPhone}
                      onChange={e => setTempPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Store Address</label>
                    <textarea
                      placeholder="Enter shop address..."
                      value={tempAddress}
                      onChange={e => setTempAddress(e.target.value)}
                      rows={4}
                      style={{
                        background: 'rgba(0, 0, 0, 0.25)',
                        border: '1px solid var(--line-light)',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        color: 'var(--cream)',
                        fontSize: '0.95rem',
                        outline: 'none',
                        marginTop: '4px',
                        width: '100%',
                        resize: 'vertical',
                        fontFamily: 'inherit'
                      }}
                      required
                    />
                  </div>
                  <button type="submit" className="pill lg admin-add-btn">Save Settings</button>
                </form>
              </div>
            </div>
          )}
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
  const [bestsellers, setBestsellers] = useState(() => {
    if (isFirebaseEnabled) return [];
    const saved = localStorage.getItem('lfh_bestsellers');
    return saved ? JSON.parse(saved) : INITIAL_BESTSELLERS;
  });

  const [counterItems, setCounterItems] = useState(() => {
    if (isFirebaseEnabled) return [];
    const saved = localStorage.getItem('lfh_counter_items');
    return saved ? JSON.parse(saved) : INITIAL_COUNTER_ITEMS;
  });

  const [menuData, setMenuData] = useState(() => {
    if (isFirebaseEnabled) return {};
    const saved = localStorage.getItem('lfh_menu_data');
    return saved ? JSON.parse(saved) : MENU_DATA;
  });

  const [festiveItems, setFestiveItems] = useState(() => {
    if (isFirebaseEnabled) return [];
    const saved = localStorage.getItem('lfh_festive_items');
    return saved ? JSON.parse(saved) : [
      {
        id: 'initial-festive',
        title: "Festive Sweets & Bulk Boxes?",
        description: "Moti chur laddu, Besan laddu, Mohan thal, Jalebi, and premium custom savouries. Custom packed for events, weddings, parties, or enterprise giftboxes.",
        img: ""
      }
    ];
  });

  const [storePhone, setStorePhone] = useState(() => {
    return localStorage.getItem('lfh_store_phone') || DEFAULT_PHONE;
  });

  const [storeAddress, setStoreAddress] = useState(() => {
    return localStorage.getItem('lfh_store_address') || DEFAULT_ADDRESS;
  });

  const [loadingBestsellers, setLoadingBestsellers] = useState(isFirebaseEnabled);
  const [loadingCounter, setLoadingCounter] = useState(isFirebaseEnabled);
  const [loadingMenu, setLoadingMenu] = useState(isFirebaseEnabled);
  const [loadingFestive, setLoadingFestive] = useState(isFirebaseEnabled);
  const [loadingSettings, setLoadingSettings] = useState(isFirebaseEnabled);

  const isLoading = isFirebaseEnabled && (loadingBestsellers || loadingCounter || loadingMenu || loadingFestive || loadingSettings);

  useEffect(() => {
    if (!isFirebaseEnabled) return;
    const timer = setTimeout(() => {
      setLoadingBestsellers(false);
      setLoadingCounter(false);
      setLoadingMenu(false);
      setLoadingFestive(false);
      setLoadingSettings(false);
    }, 3000); // 3-second fallback timeout
    return () => clearTimeout(timer);
  }, []);

  const heroImages = useMemo(() => {
    const imgs = [
      {
        thumbnail: gathiyaHero,
        full: gathiyaHero,
        alt: "Fresh Gathiya from Laxmi Farshan House"
      }
    ];

    // 2. One from Our Bestsellers
    const bestsellersWithImg = bestsellers.filter(item => item.img);
    if (bestsellersWithImg.length > 0) {
      const randomIdx = Math.floor(Math.random() * bestsellersWithImg.length);
      const item = bestsellersWithImg[randomIdx];
      imgs.push({
        thumbnail: item.img,
        full: item.img,
        alt: item.n
      });
    }

    // 3. One from Straight from the Counter
    const counterWithImg = counterItems.filter(item => item.img);
    if (counterWithImg.length > 0) {
      const randomIdx = Math.floor(Math.random() * counterWithImg.length);
      const item = counterWithImg[randomIdx];
      imgs.push({
        thumbnail: item.img,
        full: item.img,
        alt: item.n
      });
    }

    // 4. One from Explore Full Menu (any category)
    const menuWithImg = Object.values(menuData).flat().filter(item => item.img);
    if (menuWithImg.length > 0) {
      const randomIdx = Math.floor(Math.random() * menuWithImg.length);
      const item = menuWithImg[randomIdx];
      imgs.push({
        thumbnail: item.img,
        full: item.img,
        alt: item.n
      });
    }

    return imgs;
  }, [bestsellers, counterItems, menuData]);

  const activeHeroImg = heroImages[activeHeroIdx] || heroImages[0] || { thumbnail: '', full: '', alt: '' };

  // Real-time Firestore sync for store settings
  useEffect(() => {
    if (!isFirebaseEnabled || !db) return;

    const unsubscribe = onSnapshot(doc(db, 'settings', 'store'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.phone) setStorePhone(data.phone);
        if (data.address) setStoreAddress(data.address);
      }
      setLoadingSettings(false);
    }, (error) => {
      console.error("Error fetching store settings from Firestore:", error);
      setLoadingSettings(false);
    });

    return () => unsubscribe();
  }, [isFirebaseEnabled]);

  // Real-time Firestore sync for menu items
  useEffect(() => {
    if (!isFirebaseEnabled || !db) return;

    const unsubscribe = onSnapshot(collection(db, 'menuItems'), (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ docId: doc.id, ...doc.data() });
      });

      const newMenuData = {
        "Gathiya": [],
        "Sev": [],
        "Chevdo": [],
        "Puri": [],
        "Sweets & Others": []
      };

      // Sort items by order (creation time) first, then name
      items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.n.localeCompare(b.n));

      items.forEach(item => {
        const cat = item.category || "Sweets & Others";
        if (!newMenuData[cat]) {
          newMenuData[cat] = [];
        }
        newMenuData[cat].push({ n: item.n, img: item.img || '', docId: item.docId });
      });
      setMenuData(newMenuData);
      setLoadingMenu(false);
    }, (error) => {
      console.error("Error fetching menu items from Firestore:", error);
      setLoadingMenu(false);
    });

    return () => unsubscribe();
  }, [isFirebaseEnabled]);

  // Real-time Firestore sync for counter items
  useEffect(() => {
    if (!isFirebaseEnabled || !db) return;

    const unsubscribe = onSnapshot(collection(db, 'counterItems'), (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ docId: doc.id, ...doc.data() });
      });
      list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || (a.id ?? 0) - (b.id ?? 0));
      setCounterItems(list);
      setLoadingCounter(false);
    }, (error) => {
      console.error("Error fetching counter items from Firestore:", error);
      setLoadingCounter(false);
    });

    return () => unsubscribe();
  }, [isFirebaseEnabled]);

  // Real-time Firestore sync for bestsellers
  useEffect(() => {
    if (!isFirebaseEnabled || !db) return;

    const unsubscribe = onSnapshot(collection(db, 'bestsellers'), (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ docId: doc.id, ...doc.data() });
      });
      list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || (a.id ?? 0) - (b.id ?? 0));
      setBestsellers(list);
      setLoadingBestsellers(false);
    }, (error) => {
      console.error("Error fetching bestsellers from Firestore:", error);
      setLoadingBestsellers(false);
    });

    return () => unsubscribe();
  }, [isFirebaseEnabled]);

  useEffect(() => {
    if (!isFirebaseEnabled) {
      localStorage.setItem('lfh_bestsellers', JSON.stringify(bestsellers));
    }
  }, [bestsellers, isFirebaseEnabled]);

  useEffect(() => {
    if (!isFirebaseEnabled) {
      localStorage.setItem('lfh_counter_items', JSON.stringify(counterItems));
    }
  }, [counterItems, isFirebaseEnabled]);

  useEffect(() => {
    if (!isFirebaseEnabled) {
      localStorage.setItem('lfh_menu_data', JSON.stringify(menuData));
    }
  }, [menuData, isFirebaseEnabled]);

  // Real-time Firestore sync for festive items
  useEffect(() => {
    if (!isFirebaseEnabled || !db) return;

    const unsubscribe = onSnapshot(collection(db, 'festiveItems'), (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ docId: doc.id, ...doc.data() });
      });
      list.sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title));
      setFestiveItems(list);
      setLoadingFestive(false);
    }, (error) => {
      console.error("Error fetching festive items from Firestore:", error);
      setLoadingFestive(false);
    });

    return () => unsubscribe();
  }, [isFirebaseEnabled]);

  useEffect(() => {
    if (!isFirebaseEnabled) {
      localStorage.setItem('lfh_festive_items', JSON.stringify(festiveItems));
    }
  }, [festiveItems, isFirebaseEnabled]);

  useEffect(() => {
    if (!isFirebaseEnabled) {
      localStorage.setItem('lfh_store_phone', storePhone);
    }
  }, [storePhone, isFirebaseEnabled]);

  useEffect(() => {
    if (!isFirebaseEnabled) {
      localStorage.setItem('lfh_store_address', storeAddress);
    }
  }, [storeAddress, isFirebaseEnabled]);

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

  const handleAddBestseller = async (item) => {
    if (isFirebaseEnabled && db) {
      try {
        await addDoc(collection(db, 'bestsellers'), {
          id: item.id,
          n: item.n,
          img: item.img,
          tag: item.tag || '',
          order: bestsellers.length
        });
      } catch (err) {
        console.error("Error adding bestseller to Firestore:", err);
        alert("Error adding bestseller: " + err.message);
      }
    } else {
      setBestsellers(prev => [...prev, item]);
    }
  };

  const handleDeleteBestseller = async (id) => {
    if (isFirebaseEnabled && db) {
      try {
        const item = bestsellers.find(b => b.id === id);
        if (item && item.docId) {
          await deleteDoc(doc(db, 'bestsellers', item.docId));
        } else {
          const q = query(collection(db, 'bestsellers'), where('id', '==', id));
          const snapshot = await getDocs(q);
          snapshot.forEach(async (d) => {
            await deleteDoc(d.ref);
          });
        }
      } catch (err) {
        console.error("Error deleting bestseller from Firestore:", err);
        alert("Error deleting bestseller: " + err.message);
      }
    } else {
      setBestsellers(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleAddCounterItem = async (item) => {
    if (isFirebaseEnabled && db) {
      try {
        await addDoc(collection(db, 'counterItems'), {
          id: item.id,
          n: item.n,
          img: item.img,
          order: counterItems.length
        });
      } catch (err) {
        console.error("Error adding counter item to Firestore:", err);
        alert("Error adding counter item: " + err.message);
      }
    } else {
      setCounterItems(prev => [...prev, item]);
    }
  };

  const handleDeleteCounterItem = async (id) => {
    if (isFirebaseEnabled && db) {
      try {
        const item = counterItems.find(c => c.id === id);
        if (item && item.docId) {
          await deleteDoc(doc(db, 'counterItems', item.docId));
        } else {
          const q = query(collection(db, 'counterItems'), where('id', '==', id));
          const snapshot = await getDocs(q);
          snapshot.forEach(async (d) => {
            await deleteDoc(d.ref);
          });
        }
      } catch (err) {
        console.error("Error deleting counter item from Firestore:", err);
        alert("Error deleting counter item: " + err.message);
      }
    } else {
      setCounterItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleAddMenuItem = async (category, itemName, imgUrl) => {
    if (isFirebaseEnabled && db) {
      try {
        await addDoc(collection(db, 'menuItems'), {
          category,
          n: itemName,
          img: imgUrl || '',
          order: Date.now()
        });
      } catch (err) {
        console.error("Error adding menu item to Firestore:", err);
        alert("Error adding menu item: " + err.message);
      }
    } else {
      setMenuData(prev => {
        const updatedCatList = [...(prev[category] || [])];
        const newItem = { n: itemName };
        if (imgUrl) {
          newItem.img = imgUrl;
        }
        updatedCatList.push(newItem);
        return {
          ...prev,
          [category]: updatedCatList
        };
      });
    }
  };

  const handleDeleteMenuItem = async (category, index) => {
    if (isFirebaseEnabled && db) {
      try {
        const item = menuData[category]?.[index];
        if (item && item.docId) {
          await deleteDoc(doc(db, 'menuItems', item.docId));
        }
      } catch (err) {
        console.error("Error deleting menu item from Firestore:", err);
        alert("Error deleting menu item: " + err.message);
      }
    } else {
      setMenuData(prev => {
        const updatedCatList = (prev[category] || []).filter((_, idx) => idx !== index);
        return {
          ...prev,
          [category]: updatedCatList
        };
      });
    }
  };

  const handleUpdateSettings = async (phone, address) => {
    if (isFirebaseEnabled && db) {
      try {
        await setDoc(doc(db, 'settings', 'store'), {
          phone,
          address
        }, { merge: true });
      } catch (err) {
        console.error("Error saving settings to Firestore:", err);
        alert("Error saving settings to Firebase: " + err.message);
      }
    } else {
      setStorePhone(phone);
      setStoreAddress(address);
    }
  };

  const handleAddFestiveItem = async (title, description, imgUrl) => {
    if (isFirebaseEnabled && db) {
      try {
        await addDoc(collection(db, 'festiveItems'), {
          title,
          description,
          img: imgUrl || '',
          order: Date.now()
        });
      } catch (err) {
        console.error("Error adding festive item to Firestore:", err);
        alert("Error adding festive item: " + err.message);
      }
    } else {
      setFestiveItems(prev => [...prev, {
        id: Date.now().toString(),
        title,
        description,
        img: imgUrl || ''
      }]);
    }
  };

  const handleDeleteFestiveItem = async (idOrDocId) => {
    if (isFirebaseEnabled && db) {
      try {
        const item = festiveItems.find(f => f.docId === idOrDocId || f.id === idOrDocId);
        const docId = item?.docId;
        if (docId) {
          await deleteDoc(doc(db, 'festiveItems', docId));
        } else {
          const q = query(collection(db, 'festiveItems'), where('title', '==', item?.title || ''));
          const snapshot = await getDocs(q);
          snapshot.forEach(async (d) => {
            await deleteDoc(d.ref);
          });
        }
      } catch (err) {
        console.error("Error deleting festive item from Firestore:", err);
        alert("Error deleting festive item: " + err.message);
      }
    } else {
      setFestiveItems(prev => prev.filter(f => (f.docId !== idOrDocId && f.id !== idOrDocId)));
    }
  };

  const getWaLink = (text = '') => {
    const clean = storePhone.replace(/\D/g, '');
    const num = clean.length === 10 ? `91${clean}` : clean;
    return `https://wa.me/${num}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
  };

  const getTelLink = () => {
    const clean = storePhone.replace(/\D/g, '');
    return `tel:${storePhone.trim().startsWith('+') ? storePhone.trim().replace(/\s+/g, '') : `+91${clean}`}`;
  };

  if (isLoading) {
    return (
      <div className="loading-overlay">
        <div className="loader-container">
          <div className="spinner"></div>
          <div className="loader-brand">LAXMI <span>FARSHAN</span></div>
        </div>
      </div>
    );
  }

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
        bestsellers={bestsellers}
        onAddBestseller={handleAddBestseller}
        onDeleteBestseller={handleDeleteBestseller}
        counterItems={counterItems}
        onAddCounterItem={handleAddCounterItem}
        onDeleteCounterItem={handleDeleteCounterItem}
        menuData={menuData}
        onAddMenuItem={handleAddMenuItem}
        onDeleteMenuItem={handleDeleteMenuItem}
        storePhone={storePhone}
        storeAddress={storeAddress}
        onUpdateSettings={handleUpdateSettings}
        festiveItems={festiveItems}
        onAddFestiveItem={handleAddFestiveItem}
        onDeleteFestiveItem={handleDeleteFestiveItem}
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
        <a className="pill" href={getWaLink("Hi, I'd like to order from Laxmi Farshan House")} target="_blank" rel="noopener noreferrer">Order Now</a>
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-kicker">BHAVNAGAR'S OWN</div>
            <h1>Laxmi<br /><span>Farshan</span> House</h1>
            <p className="hero-tagline">Crispy. Fresh. Made right from our home recipes the way you've always remembered it.</p>
            <div className="hero-ctas">
              <a className="pill lg" href={getTelLink()}>📞 Call to Order</a>
              <a className="pill lg outline" href="#menu">Full Menu ↓</a>
            </div>
            <div className="thumb-row">
              {heroImages.map((img, idx) => (
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
                src={activeHeroImg.full}
                alt={activeHeroImg.alt}
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
          {bestsellers.map((item) => (
            <div className="p-card" key={item.id}>
              <img className="p-card-img" src={item.img} alt={item.n} />
              <div className="p-card-body">
                <div className="p-card-name">{item.n}</div>
                {item.tag && <div className="p-card-tag">{item.tag}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER CTA */}
      {festiveItems.map((item, idx) => (
        <div key={item.docId || item.id || idx} className="banner-cta">
          <img className="banner-cta-img" src={item.img || "https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600&auto=format&fit=crop"} alt={item.title} />
          <div className="banner-cta-text">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <div>
              <a className="pill" style={{ background: "#25D366", color: "#fff", display: "inline-flex", alignItems: "center", gap: "8px" }} href={getWaLink(`Hi, I want to place a bulk order for ${item.title}`)} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={18} /> WhatsApp for Bulk Orders →
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* SCROLLABLE STRIP */}
      <section className="strip-section">
        <div className="section-head">
          <div>
            <p className="kicker">Freshly Prepared</p>
            <h2>Straight from the Counter</h2>
          </div>
        </div>
        <div className="strip">
          {counterItems.map((item) => (
            <figure key={item.id}>
              <img src={item.img} alt={item.n} />
              <figcaption>{item.n}</figcaption>
            </figure>
          ))}
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
          {Object.keys(menuData).map((cat) => (
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
          {(menuData[selectedCategory] || []).map((item, idx) => (
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
            <p style={{ whiteSpace: "pre-line" }}>{storeAddress}</p>
          </div>
          <div className="foot-col">
            <h3>Quick Hotline</h3>
            <p>
              <a href={getTelLink()}>📞 {storePhone}</a><br />
              <a href={getWaLink()} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <WhatsAppIcon size={16} /> WhatsApp Instant Support
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING BAR */}
      <div className="fab-row">
        <a className="pill outline" href={getTelLink()}>📞 Call Shop</a>
        <a className="pill" style={{ background: "#25D366", color: "#fff", display: "inline-flex", alignItems: "center", gap: "6px" }} href={getWaLink()} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={18} /> WhatsApp Order
        </a>
      </div>
    </>
  );
}

export default App;

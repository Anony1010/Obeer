/* ============ FIREBASE ============ */
const firebaseConfig = {
  apiKey: "AIzaSyDnbN3yJfuHejYqTv5HsisJMec0QjpaJzg",
  authDomain: "chatog-94528.firebaseapp.com",
  databaseURL: "https://chatog-94528-default-rtdb.firebaseio.com",
  projectId: "chatog-94528",
  storageBucket: "chatog-94528.firebasestorage.app",
  messagingSenderId: "877401186095",
  appId: "1:877401186095:web:04d181fbbf2aaebb64cbda"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
try { firebase.database().setPersistenceEnabled(true); } catch (e) {}
db.goOnline();

const $ = (id) => document.getElementById(id);
const Icon = (name, size) => (window.BeeroIcons ? window.BeeroIcons.svg(name, size) : '');

/* ============ THEME ============ */
const Theme = {
  init() {
    const saved = localStorage_safe_get('beero-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    this.paintIcon(saved);
    $('theme-toggle').addEventListener('click', () => this.toggle());
  },
  toggle() {
    const cur = document.documentElement.getAttribute('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage_safe_set('beero-theme', next);
    this.paintIcon(next);
  },
  paintIcon(theme) {
    const el = $('theme-icon');
    if (el) el.innerHTML = Icon(theme === 'dark' ? 'moon' : 'sun', 20);
  }
};
// Safe localStorage wrappers (works in normal browser hosting; falls back silently)
function localStorage_safe_get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function localStorage_safe_set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

/* ============ SYNC BADGE ============ */
const Sync = {
  set(online) {
    const el = $('sync-badge'); const txt = $('sync-text');
    if (online) { el.classList.add('online'); el.classList.remove('offline'); txt.textContent = 'Canlı bağlantı'; }
    else { el.classList.remove('online'); el.classList.add('offline'); txt.textContent = 'Bağlantı yoxdur'; }
  },
  init() { db.ref('.info/connected').on('value', snap => this.set(snap.val() === true)); }
};

/* ============ LOGO (plain text, no particle effect) ============ */
const Logo = {
  init() {},
  redraw() {}
};

/* ============ STATIC UI ICONS ============ */
function paintStaticIcons() {
  const searchIcon = document.querySelector('.search-box > .ic');
  if (searchIcon) searchIcon.innerHTML = Icon('search', 18);
  const clearIcon = document.querySelector('#search-clear .ic');
  if (clearIcon) clearIcon.innerHTML = Icon('close', 14);
  const emptyIcon = document.querySelector('#empty-state .empty-icon .ic');
  if (emptyIcon) emptyIcon.innerHTML = Icon('beer', 32);
}

/* ============ SEARCH ============ */
const Search = {
  query: '',
  init() {
    const input = $('search-input');
    const clearBtn = $('search-clear');
    input.addEventListener('input', (e) => {
      const val = e.target.value;
      this.query = val.trim().toLowerCase();
      clearBtn.classList.toggle('hidden', val.length === 0);

      // Secret admin trigger
      if (this.query === "daily") {
        window.location.href = "daily.html";
        return;
      }
      if (this.query === 'gasham') {
        window.location.href = 'admin.html';
        return;
      }
      Products.render();
    });
    clearBtn.addEventListener('click', () => {
      input.value = '';
      this.query = '';
      clearBtn.classList.add('hidden');
      Products.render();
      input.focus();
    });
  },
  matches(product) {
    if (!this.query) return true;
    const hay = ((product.title || '') + ' ' + (product.description || '')).toLowerCase();
    return hay.includes(this.query);
  }
};

/* ============ PRODUCTS (REALTIME) ============ */
const Products = {
  all: [],
  loaded: false,

  init() {
    this.renderSkeleton();
    db.ref('products').on('value', (snap) => {
      const val = snap.val();
      let items = [];
      if (val) {
        items = Object.keys(val).map(k => ({ id: k, ...val[k] }));
      }
      items = items.filter(p => p.active !== false); // show unless explicitly deactivated
      items.sort((a, b) => (typeof a.order === 'number' ? a.order : 9999) - (typeof b.order === 'number' ? b.order : 9999));
      this.all = items;
      this.loaded = true;
      this.render();
    }, (err) => {
      console.error('Products listener error:', err);
      this.loaded = true;
      this.render();
    });
  },

  renderSkeleton() {
    const grid = $('skeleton-grid');
    let html = '';
    for (let i = 0; i < 8; i++) {
      html += '<div class="skel-card"><div class="skel-img skel-shimmer"></div><div class="skel-line skel-shimmer"></div><div class="skel-line skel-shimmer short"></div></div>';
    }
    grid.innerHTML = html;
  },

  formatPrice(price) {
    if (price === undefined || price === null || price === '') return '—';
    const num = Number(price);
    if (isNaN(num)) return escapeHtml(String(price));
    return num.toLocaleString('az-AZ', { maximumFractionDigits: 2 }) + ' ₼';
  },

  render() {
    const grid = $('product-grid');
    const skeleton = $('skeleton-grid');
    const emptyState = $('empty-state');
    const emptyText = $('empty-text');

    if (!this.loaded) return;
    skeleton.classList.add('hidden');
    grid.classList.remove('hidden');

    const filtered = this.all.filter(p => Search.matches(p));

    if (filtered.length === 0) {
      grid.innerHTML = '';
      emptyState.classList.remove('hidden');
      emptyText.textContent = Search.query ? 'Axtarışa uyğun məhsul tapılmadı.' : 'Hələ heç bir məhsul əlavə edilməyib.';
      return;
    }
    emptyState.classList.add('hidden');

    grid.innerHTML = filtered.map((p, i) => this.cardHtml(p, i)).join('');
    this.setupLazyImages();
  },

  cardHtml(p, index) {
    const title = escapeHtml(p.title || 'Adsız məhsul');
    const desc = p.description ? escapeHtml(p.description) : '';
    const price = this.formatPrice(p.price);
    const img = p.image || '';
    return `<article class="card" style="animation-delay:${Math.min(index * 0.04, 0.4)}s">
      <div class="card-img-wrap">
        ${img ? `<img data-src="${img}" alt="${title}" loading="lazy">` : `<div class="card-img-fallback">${Icon('beer', 44)}</div>`}
        <span class="card-price-tag">${price}</span>
      </div>
      <div class="card-body">
        <div class="card-title">${title}</div>
        ${desc ? `<div class="card-desc">${desc}</div>` : ''}
      </div>
    </article>`;
  },

  setupLazyImages() {
    const imgs = document.querySelectorAll('#product-grid img[data-src]');
    if (!('IntersectionObserver' in window)) {
      imgs.forEach(img => { img.src = img.dataset.src; img.classList.add('loaded'); });
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '150px' });
    imgs.forEach(img => io.observe(img));
  }
};

function escapeHtml(text) {
  const d = document.createElement('div');
  d.textContent = text || '';
  return d.innerHTML;
}

/* ============ RIPPLE EFFECT ============ */
function initRipple() {
  document.addEventListener('click', (e) => {
    const target = e.target.closest('#theme-toggle, .search-clear');
    if (!target) return;
    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    target.style.position = "relative";
    target.style.overflow = "hidden";
    target.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
}

/* ============ INIT ============ */
document.addEventListener('DOMContentLoaded', () => {
  $('year').textContent = new Date().getFullYear();
  paintStaticIcons();
  Theme.init();
  Logo.init();
  Sync.init();
  Search.init();
  Products.init();
  initRipple();
});

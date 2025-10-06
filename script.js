// ===================
//   CONFIG / ELEMENTS
// ===================
const menuGrid = document.getElementById("menu-grid");
const chips = document.getElementById("category-chips");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("Address");
const addressWarn = document.getElementById("address-warn");
const ctaWhatsapp = document.getElementById("cta-whatsapp");

// Config (fácil de trocar no portfolio)
const WHATS_PHONE = "+5571992620696";
const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

// ===================
//        DATA
// ===================
const PRODUCTS = [
  {
    id: 1,
    name: "Clássico da Casa",
    price: 24.9,
    image: "assets/hamb-1.png",
    category: "Burgers",
    desc: "Pão brioche, blend 150g, queijo, alface e tomate.",
  },
  {
    id: 2,
    name: "Duplo Smash",
    price: 31.9,
    image: "assets/hamb-2.png",
    category: "Burgers",
    desc: "Dois smash 90g, cheddar duplo e picles.",
  },
  {
    id: 3,
    name: "Chicken Crispy",
    price: 27.9,
    image: "assets/hamb-3.png",
    category: "Burgers",
    desc: "Frango empanado, maionese da casa e alface.",
  },
  {
    id: 4,
    name: "Veggie Green",
    price: 26.0,
    image: "assets/hamb-4.png",
    category: "Veggie",
    desc: "Grão-de-bico, abacate e molho tahine.",
  },
  {
    id: 5,
    name: "Batata Rústica",
    price: 14.0,
    image: "assets/batatas-rustica.jpg",
    category: "Acompanhamentos",
    desc: "Batatas com páprica e alecrim.",
  },
  {
    id: 6,
    name: "Onion Rings",
    price: 16.0,
    image: "assets/onion-rings.jpg",
    category: "Acompanhamentos",
    desc: "Crocantes e douradas.",
  },
  {
    id: 7,
    name: "Refrigerante Lata",
    price: 7.0,
    image: "assets/refri-1.png",
    category: "Bebidas",
    desc: "350ml",
  },
  {
    id: 8,
    name: "Suco Natural",
    price: 9.0,
    image: "assets/suco-natural.png",
    category: "Bebidas",
    desc: "Laranja ou limão.",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Cliente 1",
    role: "Hamburgueria do Bairro",
    text: "Ficou lindo no celular e aumentou nossos pedidos em 30%!",
    avatar: "assets/avatars/cliente-1.jpg",
  },
  {
    id: 2,
    name: "Cliente 2",
    role: "Food Truck 71",
    text: "Fácil de editar e publicar, perfeito pra eventos!",
    avatar: "assets/avatars/cliente-2.jpg",
  },
  {
    id: 3,
    name: "Cliente 3",
    role: "Pizzaria da Praça",
    text: "Integração com WhatsApp agilizou muito o atendimento.",
    avatar: "assets/avatars/cliente-3.jpg",
  },
];

// ===================
//    STATE/HELPERS
// ===================

let activeCategory = "Todos";
let cart = [];
// ---- Reveal on scroll (compat + fallback) ----
var observer = (function () {
  if (!('IntersectionObserver' in window)) {
    // Sem suporte? não quebra nada.
    return { observe: function(){}, unobserve: function(){} };
  }
  return new IntersectionObserver(function (entries, obs) {
    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (entry.isIntersecting) {
        var type = entry.target.dataset.animate || 'fade-up';
        entry.target.classList.add('animate-' + type, 'will');
        obs.unobserve(entry.target);
      }
    }
  }, { threshold: 0.15 });
})();

// observar elementos que já estão na página (títulos, cards, etc)
document.querySelectorAll('[data-animate]').forEach(function(el){
  observer.observe(el);
});

ctaWhatsapp.href = `https://wa.me/${WHATS_PHONE.replace(/\D/g, "")}`;

const CATEGORIES = [
  "Todos",
  ...Array.from(new Set(PRODUCTS.map((p) => p.category))),
];

// ===================
//  CATEGORY CHIPS (animated)
// ===================
function renderChips() {
  chips.innerHTML = CATEGORIES.map(
    (cat) => `
    <button
      class="chip smooth will hover:-translate-y-0.5 active:scale-95 ${
        cat === activeCategory ? "border-brand bg-white/10" : ""
      }"
      data-cat="${cat}"
    >${cat}</button>
  `
  ).join("");
}
renderChips();

function filtered() {
  return activeCategory === "Todos"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);
}

// ===================
//  GRID (reveal + hover)
// ===================
function renderGrid() {
  const items = filtered()
    .map(
      (p) => `
    <article class="card group smooth will hover:-translate-y-1 hover:shadow-lg" data-animate="fade-up">
      <div class="w-full aspect-[4/3] bg-white/5 grid place-items-center overflow-hidden">
        <img src="${p.image}" alt="${p.name}" loading="lazy"
             class="opacity-0 max-h-full max-w-full object-contain p-2 smooth t-slow group-hover:scale-105"
             onload="this.classList.add('opacity-100')">
      </div>
      <div class="p-4">
        <div class="flex items-start justify-between gap-3">
          <h3 class="font-semibold">${p.name}</h3>
          <span class="text-brand font-semibold">${currency.format(
            p.price
          )}</span>
        </div>
        <p class="text-sm text-white/70 mt-1">${p.desc || ""}</p>
        <div class="mt-3 flex items-center justify-between">
          <span class="text-xs text-white/50">${p.category}</span>
          <button class="btn smooth hover:-translate-y-0.5" data-ripple onclick="addToCart(${
            p.id
          })">
            <i class="fa-solid fa-plus"></i> Adicionar
          </button>
        </div>
      </div>
    </article>
  `
    )
    .join("");
  menuGrid.innerHTML = items;
  // observar para animar ao entrar
  menuGrid
    .querySelectorAll("[data-animate]")
    .forEach((el) => observer.observe(el));
}
renderGrid();

// categoria com transição
chips.addEventListener("click", (e) => {
  const el = e.target.closest("button[data-cat]");
  if (!el) return;
  activeCategory = el.dataset.cat;
  renderChips();
  menuGrid.classList.add("animate-fade-in");
  renderGrid();
  menuGrid.addEventListener(
    "animationend",
    () => menuGrid.classList.remove("animate-fade-in"),
    { once: true }
  );
});

// ===================
//       CART
// ===================
function addToCart(id) {
  const product = PRODUCTS.find((p) => p.id === id);
  const idx = cart.findIndex((i) => i.id === id);
  if (idx >= 0) cart[idx].qty += 1;
  else cart.push({ ...product, qty: 1 });
  updateCart();

  // pulsar o contador
  cartCounter.classList.remove("animate-pulse-soft");
  void cartCounter.offsetWidth; // reflow
  cartCounter.classList.add("animate-pulse-soft");

  Toastify({
    text: `${product.name} adicionado!`,
    duration: 1500,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    backgroundColor: "#16a34a",
  }).showToast();
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  updateCart();
}

function changeQty(id, delta) {
  const it = cart.find((i) => i.id === id);
  if (!it) return;
  it.qty += delta;
  if (it.qty <= 0) return removeFromCart(id);
  updateCart();
}

function updateCart() {
  cartCounter.textContent = cart.reduce((s, i) => s + i.qty, 0);
  cartItemsContainer.innerHTML = cart.length
    ? cart
        .map(
          (i) => `
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <img src="${i.image}" alt="${
            i.name
          }" class="size-12 rounded-lg object-cover">
        <div>
          <p class="font-medium">${i.name}</p>
          <p class="text-xs text-white/60">${currency.format(i.price)}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button class="btn-ghost" data-ripple onclick="changeQty(${
          i.id
        }, -1)"><i class="fa-solid fa-minus"></i></button>
        <span class="w-6 text-center">${i.qty}</span>
        <button class="btn-ghost" data-ripple onclick="changeQty(${
          i.id
        }, 1)"><i class="fa-solid fa-plus"></i></button>
        <span class="w-20 text-right font-semibold">${currency.format(
          i.price * i.qty
        )}</span>
        <button class="btn-ghost" data-ripple onclick="removeFromCart(${
          i.id
        })"><i class="fa-solid fa-trash"></i></button>
      </div>
    </div>
  `
        )
        .join("")
    : `<p class="text-white/70">Seu carrinho está vazio.</p>`;

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  cartTotal.textContent = currency.format(total);
}

// ===================
//     MODAL (pop)
// ===================
const cartOverlay =
  cartModal.querySelector("#cart-overlay") ||
  cartModal.querySelector(".absolute.inset-0");
const cartPanel =
  cartModal.querySelector("#cart-panel") || cartModal.querySelector(".card");

function openCart() {
  cartModal.classList.remove("hidden");
  cartOverlay?.classList.remove("animate-fade-out");
  cartPanel?.classList.remove("animate-pop-out");
  cartOverlay?.classList.add("animate-fade-in");
  cartPanel?.classList.add("animate-pop");
}
function closeCart() {
  cartOverlay?.classList.remove("animate-fade-in");
  cartPanel?.classList.remove("animate-pop");
  cartOverlay?.classList.add("animate-fade-out");
  cartPanel?.classList.add("animate-pop-out");
  (cartPanel || cartModal).addEventListener(
    "animationend",
    () => cartModal.classList.add("hidden"),
    { once: true }
  );
}

cartBtn.addEventListener("click", openCart);
closeModalBtn.addEventListener("click", closeCart);
cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal || e.target === cartOverlay) closeCart();
});

// ===================
//      CHECKOUT
// ===================
function buildMessage() {
  const items = cart
    .map((i) => `• ${i.qty}× ${i.name} — ${currency.format(i.price * i.qty)}`)
    .join("%0A");
  const total = currency.format(cart.reduce((s, i) => s + i.price * i.qty, 0));
  const address = addressInput.value.trim();
  const header = `Pedido via Cardápio Demo`;
  return `${header}%0A%0A${items}%0A%0ATotal: ${total}%0AEndereço/Obs: ${encodeURIComponent(
    address
  )}`;
}

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0)
    return Toastify({ text: "Carrinho vazio.", duration: 1800 }).showToast();
  if (addressInput.value.trim().length < 5) {
    addressWarn.classList.remove("hidden");
    addressInput.focus();
    return;
  }
  addressWarn.classList.add("hidden");
  const url = `https://wa.me/${WHATS_PHONE.replace(
    /\D/g,
    ""
  )}?text=${buildMessage()}`;
  window.open(url, "_blank");
  cart = [];
  updateCart();
  Toastify({
    text: "Pedido enviado!",
    duration: 2000,
    backgroundColor: "#16a34a",
  }).showToast();
});

// ===================
//   DEPOIMENTOS (fade + avatar pulse)
// ===================
const depoAvatars = document.getElementById("depo-avatars");
const depoPlaceholder = document.getElementById("depo-placeholder");
const depoContent = document.getElementById("depo-content");
const depoText = document.getElementById("depo-text");
const depoName = document.getElementById("depo-name");
const depoRole = document.getElementById("depo-role");
let depoSelected = null;

function renderDepoAvatars() {
  if (!depoAvatars) return;
  depoAvatars.innerHTML = TESTIMONIALS.map(
    (t) => `
    <button type="button" class="group relative" data-id="${t.id}" aria-label="Ver depoimento de ${t.name}">
      <div class="size-14 md:size-16 rounded-full overflow-hidden ring-1 ring-white/10 bg-white/10 grid place-items-center group-[.active]:ring-2 group-[.active]:ring-brand">
        <img src="${t.avatar}" alt="${t.name}" class="w-full h-full object-cover"
             onerror="this.parentElement.classList.add('bg-white/10'); this.remove();">
      </div>
      <span class="block text-xs text-white/60 mt-1 text-center">${t.name}</span>
    </button>
  `
  ).join("");

  depoAvatars.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () =>
      selectTestimonial(Number(btn.dataset.id))
    );
  });
}

function selectTestimonial(id) {
  const t = TESTIMONIALS.find((x) => x.id === id);
  if (!t) return;

  depoSelected = id;

  depoPlaceholder.classList.add("hidden");
  depoContent.classList.remove("hidden");

  // re-animar texto
  depoContent.classList.remove("animate-fade-in");
  void depoContent.offsetWidth;
  depoText.textContent = `"${t.text}"`;
  depoName.textContent = t.name;
  depoRole.textContent = t.role;
  depoContent.classList.add("animate-fade-in");

  // destacar avatar ativo
  depoAvatars
    .querySelectorAll("button")
    .forEach((b) => b.classList.remove("active"));
  depoAvatars.querySelectorAll("button > div").forEach((w) => {
    w.classList.remove("animate-pulse-soft", "ring-2", "ring-brand");
    w.classList.add("ring-1", "ring-white/10");
  });
  const active = depoAvatars.querySelector(`[data-id="${id}"]`);
  if (active) {
    active.classList.add("active");
    const wrap = active.querySelector("div");
    wrap.classList.remove("ring-white/10");
    wrap.classList.add("animate-pulse-soft", "ring-2", "ring-brand");
  }
}

// ===================
//  REVEAL + RIPPLE + HEADER ON SCROLL
// ===================
document
  .querySelectorAll("[data-animate]")
  .forEach((el) => observer.observe(el));

// ripple para .btn/.btn-ghost/[data-ripple]
(function initRipple(root = document) {
  root.querySelectorAll(".btn, .btn-ghost, [data-ripple]").forEach((btn) => {
    if (btn._rippleInit) return;
    btn._rippleInit = true;
    btn.classList.add("relative", "overflow-hidden");
    btn.addEventListener("click", (e) => {
      const r = document.createElement("span");
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.width = r.style.height = size + "px";
      r.style.left = e.clientX - rect.left - size / 2 + "px";
      r.style.top = e.clientY - rect.top - size / 2 + "px";
      r.className =
        "pointer-events-none absolute rounded-full bg-white/20 animate-ripple";
      btn.appendChild(r);
      r.addEventListener("animationend", () => r.remove(), { once: true });
    });
  });
})();

// header muda ao rolar
const header = document.querySelector("header.sticky");
if (header) {
  window.addEventListener("scroll", () => {
    const scrolled = (window.scrollY || 0) > 8;
    header.classList.toggle("shadow-lg", scrolled);
    header.classList.toggle("bg-white/10", scrolled);
    header.classList.toggle("backdrop-blur-md", scrolled);
  });
}

// ===== HERO PRESENTATION =====
(function heroIntro(){
  const h = document.querySelector('[data-hero-title]');
  if(!h) return;

  // wrap por palavra preservando spans internos
  let delay = 0;
  function wrap(node) {
    if (node.nodeType === 3) {
      const frag = document.createDocumentFragment();
      (node.textContent || "").split(/(\s+)/).forEach((part) => {
        if (/^\s+$/.test(part)) {
          frag.appendChild(document.createTextNode(part));
          return;
        }
        if (!part) return;
        const s = document.createElement("span");
        s.className = "w";
        s.textContent = part + " ";
        s.style.setProperty("--d", (delay += 55) + "ms");
        frag.appendChild(s);
      });
      node.replaceWith(frag);
    } else if (node.nodeType === 1) {
      // se for o destaque, não embrulha os filhos
      if (node.classList && node.classList.contains("hero-accent")) return;
      Array.from(node.childNodes).forEach(wrap);
    }
  }
  h.classList.add('hero-stagger');
  Array.from(h.childNodes).forEach(wrap);

  // sub e CTAs
  const sub = document.querySelector('.hero-sub');
  const cta = document.querySelector('[data-hero-cta]');
  setTimeout(()=>{ sub && (sub.style.willChange='opacity'); }, 50);

  // anima CTAs com atraso progressivo
  if (cta){
    cta.classList.add('is-in');
    cta.querySelectorAll('a').forEach((a,i)=> a.style.setProperty('--d', (400 + i*120) + 'ms'));
  }

  // leve parallax do background do hero
  const hero = document.querySelector('section.bg-hero');
  if(hero){
    let raf = 0;
    hero.addEventListener('mousemove', (e)=>{
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(()=>{
        const r = hero.getBoundingClientRect();
        const px = (e.clientX - r.left)/r.width - .5;
        const py = (e.clientY - r.top)/r.height - .5;
        hero.style.backgroundPosition = `${50 + px*4}% ${50 + py*3}%`;
      });
    });
    hero.addEventListener('mouseleave', ()=> hero.style.backgroundPosition = '50% 50%');
  }
})();

(function () {
  const strength = 12;
  document.querySelectorAll("[data-magnet]").forEach((btn) => {
    let af = 0;
    btn.addEventListener("mousemove", (e) => {
      cancelAnimationFrame(af);
      af = requestAnimationFrame(() => {
        const r = btn.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width - 0.5) * strength;
        const y = ((e.clientY - r.top) / r.height - 0.5) * strength;
        btn.style.transform = `translate(${x}px,${y}px)`;
      });
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0,0)";
    });
  });
})();
// ===================
//   INIT
// ===================
renderDepoAvatars();
updateCart();

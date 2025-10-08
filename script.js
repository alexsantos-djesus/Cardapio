// ===================
//   CONFIG / ELEMENTS
// ===================
const menuGrid = document.getElementById("menu-grid");
const chips = document.getElementById("category-chips");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const closeModalBtn = document.getElementById("close-modal-btn");
const cartCounter = document.getElementById("cart-count");
const ctaWhatsapp = document.getElementById("cta-whatsapp");

// Steps do checkout e formulário
const step1 = document.getElementById("cart-step-1");
const step2 = document.getElementById("cart-step-2");
const continueBtn = document.getElementById("continue-btn");
const backBtn = document.getElementById("back-to-cart");
const nameInput = document.getElementById("inp-name");
const phoneInput = document.getElementById("inp-phone");
const cepInput = document.getElementById("inp-cep");
const cepBtn = document.getElementById("btn-cep");
const streetInput = document.getElementById("inp-street");
const neighInput = document.getElementById("inp-neighborhood");
const cityInput = document.getElementById("inp-city");
const ufInput = document.getElementById("inp-uf");
const numberInput = document.getElementById("inp-number");
const compInput = document.getElementById("inp-complement");
const refInput = document.getElementById("inp-reference");

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
ctaWhatsapp.href = `https://wa.me/${WHATS_PHONE.replace(/\D/g, "")}`;

// Reveal on scroll (com fallback)
var observer = (function () {
  if (!("IntersectionObserver" in window))
    return { observe() {}, unobserve() {} };
  return new IntersectionObserver(
    function (entries, obs) {
      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        if (entry.isIntersecting) {
          var type = entry.target.dataset.animate || "fade-up";
          entry.target.classList.add("animate-" + type, "will");
          obs.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );
})();
document
  .querySelectorAll("[data-animate]")
  .forEach((el) => observer.observe(el));

const CATEGORIES = [
  "Todos",
  ...Array.from(new Set(PRODUCTS.map((p) => p.category))),
];

// ===================
//  CATEGORY CHIPS
// ===================
function renderChips() {
  chips.innerHTML = CATEGORIES.map(
    (cat) => `
    <button class="chip smooth will hover:-translate-y-0.5 active:scale-95 ${
      cat === activeCategory ? "border-brand bg-white/10" : ""
    }" data-cat="${cat}">
      ${cat}
    </button>
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
//  GRID
// ===================
function renderGrid() {
  const items = filtered()
    .map(
      (p) => `
    <article class="card group smooth will hover:-translate-y-1 hover:shadow-lg" data-animate="fade-up">
      <div class="w-full aspect-[4/3] bg-white/5 grid place-items-center overflow-hidden">
        <img src="${p.image}" alt="${
        p.name
      }" loading="lazy" class="opacity-0 max-h-full max-w-full object-contain p-2 smooth t-slow group-hover:scale-105" onload="this.classList.add('opacity-100')">
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
  menuGrid
    .querySelectorAll("[data-animate]")
    .forEach((el) => observer.observe(el));
}
renderGrid();

// trocar de categoria
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

  cartCounter.classList.remove("animate-pulse-soft");
  void cartCounter.offsetWidth;
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

  // botão continuar habilita/desabilita
  if (continueBtn) continueBtn.disabled = cart.length === 0;
}

// ===================
//     MODAL (pop)
// ===================
const cartOverlay =
  cartModal.querySelector("#cart-overlay") ||
  cartModal.querySelector(".absolute.inset-0");
const cartPanel =
  cartModal.querySelector("#cart-panel") || cartModal.querySelector(".card");

function goToStep(n) {
  if (n === 1) {
    step1.classList.remove("hidden");
    step2.classList.add("hidden");
  } else {
    step1.classList.add("hidden");
    step2.classList.remove("hidden");
  }
}

function openCart() {
  cartModal.classList.remove("hidden");
  cartOverlay?.classList.remove("animate-fade-out");
  cartPanel?.classList.remove("animate-pop-out");
  cartOverlay?.classList.add("animate-fade-in");
  cartPanel?.classList.add("animate-pop");
  goToStep(1);
}
function closeCart() {
  cartOverlay?.classList.remove("animate-fade-in");
  cartPanel?.classList.remove("animate-pop");
  cartOverlay?.classList.add("animate-fade-out");
  cartPanel?.classList.add("animate-pop-out");
  let finished = false;
  (cartPanel || cartModal).addEventListener(
    "animationend",
    () => {
      finished = true;
      cartModal.classList.add("hidden");
    },
    { once: true }
  );
  setTimeout(() => {
    if (!finished) cartModal.classList.add("hidden");
  }, 300);
}

// abre/fecha
cartBtn.addEventListener("click", openCart);
document.addEventListener("click", (e) => {
  if (e.target.closest("#close-modal-btn")) closeCart();
});
cartModal.addEventListener("click", (e) => {
  if (e.target === cartModal || e.target === cartOverlay) closeCart();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !cartModal.classList.contains("hidden"))
    closeCart();
});

// navegar entre etapas
continueBtn?.addEventListener("click", () => {
  if (cart.length === 0)
    return Toastify({ text: "Carrinho vazio.", duration: 1800 }).showToast();
  goToStep(2);
});
backBtn?.addEventListener("click", () => goToStep(1));

// ===================
//   FORM/CEP/MÁSCARAS
// ===================
const digits = (v) => (v || "").replace(/\D/g, "");
function formatPhone(v) {
  v = digits(v).slice(0, 11);
  if (v.length > 6) return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  if (v.length > 2) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
  return v;
}
phoneInput?.addEventListener(
  "input",
  (e) => (e.target.value = formatPhone(e.target.value))
);
function formatCEP(v) {
  v = digits(v).slice(0, 8);
  return v.length > 5 ? v.slice(0, 5) + "-" + v.slice(5) : v;
}
cepInput?.addEventListener(
  "input",
  (e) => (e.target.value = formatCEP(e.target.value))
);

async function lookupCep() {
  const cep = digits(cepInput.value);
  const warn = document.getElementById("cep-warn");
  if (cep.length !== 8) {
    warn.textContent = "CEP inválido.";
    warn.classList.remove("hidden");
    return;
  }
  try {
    const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const d = await r.json();
    if (d.erro) {
      warn.textContent = "CEP não encontrado.";
      warn.classList.remove("hidden");
      return;
    }
    warn.classList.add("hidden");
    streetInput.value = d.logradouro || "";
    neighInput.value = d.bairro || "";
    cityInput.value = d.localidade || "";
    ufInput.value = (d.uf || "").toUpperCase();
    numberInput.focus();
  } catch {
    warn.textContent = "Falha ao buscar CEP.";
    warn.classList.remove("hidden");
  }
}
cepBtn?.addEventListener("click", lookupCep);
cepInput?.addEventListener(
  "blur",
  () => digits(cepInput.value).length === 8 && lookupCep()
);

// ===================
//   CHECKOUT (WA)
// ===================
function validateForm() {
  const req = [
    [nameInput, "Informe seu nome."],
    [phoneInput, "Informe seu WhatsApp."],
    [cepInput, "Informe o CEP."],
    [streetInput, "Informe a rua."],
    [neighInput, "Informe o bairro."],
    [cityInput, "Informe a cidade."],
    [ufInput, "Informe a UF."],
    [numberInput, "Informe o número."],
  ];
  for (const [el, msg] of req) {
    if (!el || !el.value.trim()) {
      Toastify({ text: msg, duration: 1800 }).showToast();
      el?.focus();
      return false;
    }
  }
  return true;
}

function buildMessage() {
  const items = cart
    .map((i) => `• ${i.qty}× ${i.name} — ${currency.format(i.price * i.qty)}`)
    .join("%0A");
  const total = currency.format(cart.reduce((s, i) => s + i.price * i.qty, 0));

  const name = (nameInput.value || "").trim();
  const phone = (phoneInput.value || "").trim();
  const cep = (cepInput.value || "").trim();
  const rua = (streetInput.value || "").trim();
  const num = (numberInput.value || "").trim();
  const comp = (compInput.value || "").trim();
  const bairro = (neighInput.value || "").trim();
  const cidade = (cityInput.value || "").trim();
  const uf = (ufInput.value || "").trim().toUpperCase();
  const ref = (refInput.value || "").trim();

  const header = `Pedido via Cardápio Demo`;
  const pessoa = `Cliente: ${name} — WhatsApp: ${phone}`;
  const end1 = `${rua}, ${num}${comp ? " - " + comp : ""}`;
  const end2 = `${bairro} — ${cidade}/${uf}`;
  const end3 = `CEP: ${cep}${ref ? " • Ref: " + ref : ""}`;
  const address = `Endereço:%0A${end1}%0A${end2}%0A${end3}`;

  return `${header}%0A%0A${items}%0A%0ATotal: ${total}%0A%0A${pessoa}%0A${address}`;
}

document.getElementById("checkout-btn")?.addEventListener("click", () => {
  if (!validateForm()) return;
  const url = `https://wa.me/${WHATS_PHONE.replace(
    /\D/g,
    ""
  )}?text=${buildMessage()}`;
  window.open(url, "_blank");
  cart = [];
  updateCart();
  closeCart();
  Toastify({
    text: "Pedido enviado!",
    duration: 2000,
    backgroundColor: "#16a34a",
  }).showToast();
});

// ===================
//  DEPOIMENTOS
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
        <img src="${t.avatar}" alt="${t.name}" class="w-full h-full object-cover" onerror="this.parentElement.classList.add('bg-white/10'); this.remove();">
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
  depoContent.classList.remove("animate-fade-in");
  void depoContent.offsetWidth;
  depoText.textContent = `"${t.text}"`;
  depoName.textContent = t.name;
  depoRole.textContent = t.role;
  depoContent.classList.add("animate-fade-in");
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
//  RIPPLE + HEADER
// ===================
document
  .querySelectorAll("[data-animate]")
  .forEach((el) => observer.observe(el));
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
const header = document.querySelector("header.sticky");
if (header)
  window.addEventListener("scroll", () => {
    const scrolled = (window.scrollY || 0) > 8;
    header.classList.toggle("shadow-lg", scrolled);
    header.classList.toggle("bg-white/10", scrolled);
    header.classList.toggle("backdrop-blur-md", scrolled);
  });

// ===== HERO PRESENTATION (stagger/parallax) =====
(function heroIntro() {
  const h = document.querySelector("[data-hero-title]");
  if (!h) return;
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
      if (node.classList && node.classList.contains("hero-accent")) return;
      Array.from(node.childNodes).forEach(wrap);
    }
  }
  h.classList.add("hero-stagger");
  Array.from(h.childNodes).forEach(wrap);
  const sub = document.querySelector(".hero-sub");
  const cta = document.querySelector("[data-hero-cta]");
  setTimeout(() => {
    sub && (sub.style.willChange = "opacity");
  }, 50);
  if (cta) {
    cta.classList.add("is-in");
    cta
      .querySelectorAll("a")
      .forEach((a, i) => a.style.setProperty("--d", 400 + i * 120 + "ms"));
  }
  const hero = document.querySelector("section.bg-hero");
  if (hero) {
    let raf = 0;
    hero.addEventListener("mousemove", (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        hero.style.backgroundPosition = `${50 + px * 4}% ${50 + py * 3}%`;
      });
    });
    hero.addEventListener(
      "mouseleave",
      () => (hero.style.backgroundPosition = "50% 50%")
    );
  }
})();

// ===================
//   INIT
// ===================
renderDepoAvatars();
updateCart();

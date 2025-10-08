// ===================
//   CONFIG / ELEMENTS
// ===================
const menuGrid = document.getElementById("menu-grid");
const chips = document.getElementById("category-chips");

const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartOverlay = document.getElementById("cart-overlay");
const cartPanel = document.getElementById("cart-panel");
const closeModalBtn = document.getElementById("close-modal-btn");

const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCounter = document.getElementById("cart-count");
const ctaWhatsapp = document.getElementById("cta-whatsapp");

// Frete simples (ajuste à vontade)
const DELIVERY_CONFIG = {
  defaultFee: 8, // R$ 8,00 de entrega
  freeAbove: 80, // frete grátis acima de R$ 80
};

// Steps do modal
const step1 = document.getElementById("cart-step-1");
const step2 = document.getElementById("cart-step-2");
const step3 = document.getElementById("cart-step-3");
const continueBtn = document.getElementById("continue-btn");
const backToCartBtn = document.getElementById("back-to-cart");
const toPaymentBtn = document.getElementById("to-payment");
const backToAddressBtn = document.getElementById("back-to-address");
const checkoutBtn = document.getElementById("checkout-btn");

// Inputs da etapa 2 (endereço)
const nameInput = document.getElementById("inp-name");
const phoneInput = document.getElementById("inp-phone");
const cepInput = document.getElementById("inp-cep");
const streetInput = document.getElementById("inp-street");
const neighInput = document.getElementById("inp-neighborhood");
const cityInput = document.getElementById("inp-city");
const ufInput = document.getElementById("inp-uf");
const numberInput = document.getElementById("inp-number");
const compInput = document.getElementById("inp-complement");
const refInput = document.getElementById("inp-reference");
const cepWarn = document.getElementById("cep-warn");

// Etapa 3 (pagamento/entrega)
const moneyChangeWrap = document.getElementById("money-change-wrap");
const changeInput = document.getElementById("inp-change");
const notesInput = document.getElementById("inp-notes");

// Resumo etapa 3
const elSubtotal = document.getElementById("checkout-subtotal");
const elFee = document.getElementById("checkout-fee");
const elGrand = document.getElementById("checkout-grand-total");

// Config do WhatsApp
const WHATS_PHONE = "+5571992620696";
const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
ctaWhatsapp &&
  (ctaWhatsapp.href = `https://wa.me/${WHATS_PHONE.replace(/\D/g, "")}`);

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
  if (!chips) return;
  chips.innerHTML = CATEGORIES.map(
    (cat) => `
    <button class="chip smooth will hover:-translate-y-0.5 active:scale-95 ${
      cat === activeCategory ? "border-brand bg-white/10" : ""
    }" data-cat="${cat}">
      ${cat}
    </button>`
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
  if (!menuGrid) return;
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
  menuGrid
    .querySelectorAll("[data-animate]")
    .forEach((el) => observer.observe(el));
}
renderGrid();

// trocar de categoria
chips?.addEventListener("click", (e) => {
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
window.addToCart = function (id) {
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
    backgroundColor: "#16a34a",
  }).showToast();
};
window.removeFromCart = function (id) {
  cart = cart.filter((i) => i.id !== id);
  updateCart();
};
window.changeQty = function (id, delta) {
  const it = cart.find((i) => i.id === id);
  if (!it) return;
  it.qty += delta;
  if (it.qty <= 0) return window.removeFromCart(id);
  updateCart();
};

function cartSubtotalVal() {
  return cart.reduce((s, i) => s + i.price * i.qty, 0);
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
          },-1)"><i class="fa-solid fa-minus"></i></button>
          <span class="w-6 text-center">${i.qty}</span>
          <button class="btn-ghost" data-ripple onclick="changeQty(${
            i.id
          },1)"><i class="fa-solid fa-plus"></i></button>
          <span class="w-20 text-right font-semibold">${currency.format(
            i.price * i.qty
          )}</span>
          <button class="btn-ghost" data-ripple onclick="removeFromCart(${
            i.id
          })"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>`
        )
        .join("")
    : `<p class="text-white/70">Seu carrinho está vazio.</p>`;

  const sub = cartSubtotalVal();
  cartTotal.textContent = currency.format(sub);
  continueBtn && (continueBtn.disabled = cart.length === 0);

  // se estiver na etapa 3, mantém o resumo sincronizado
  if (!step3.classList.contains("hidden")) updateTotalsUI();
}

// ===================
//     MODAL (pop)
// ===================
function gotoStep(n) {
  step1.classList.toggle("hidden", n !== 1);
  step2.classList.toggle("hidden", n !== 2);
  step3.classList.toggle("hidden", n !== 3);
  // reseta scroll do conteúdo rolável
  [step1, step2, step3].forEach((s) => {
    if (!s.classList.contains("hidden")) {
      const sc = s.querySelector(".overflow-auto");
      sc && (sc.scrollTop = 0);
    }
  });
}

function openCart() {
  cartModal.classList.remove("hidden");
  cartOverlay?.classList.remove("animate-fade-out");
  cartPanel?.classList.remove("animate-pop-out");
  cartOverlay?.classList.add("animate-fade-in");
  cartPanel?.classList.add("animate-pop");
  gotoStep(1);
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

cartBtn?.addEventListener("click", openCart);
closeModalBtn?.addEventListener("click", closeCart);
cartModal?.addEventListener("click", (e) => {
  if (e.target === cartModal || e.target === cartOverlay) closeCart();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !cartModal.classList.contains("hidden"))
    closeCart();
});

continueBtn?.addEventListener("click", () => {
  if (cart.length === 0)
    return Toastify({ text: "Carrinho vazio.", duration: 1800 }).showToast();
  gotoStep(2);
});
backToCartBtn?.addEventListener("click", () => gotoStep(1));
toPaymentBtn?.addEventListener("click", () => {
  if (!validateStep2()) return;
  gotoStep(3);
  updateTotalsUI();
});
backToAddressBtn?.addEventListener("click", () => gotoStep(2));

// ===== MÁSCARAS & CEP =====
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

// debounce helper
function debounce(fn, ms = 450) {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), ms);
  };
}
const debouncedCep = debounce(() => {
  const raw = digits(cepInput.value);
  if (raw.length === 8) lookupCep();
}, 450);

cepInput?.addEventListener("input", (e) => {
  e.target.value = formatCEP(e.target.value);
  debouncedCep();
});
cepInput?.addEventListener("blur", () => {
  if (digits(cepInput.value).length === 8) lookupCep();
});

async function lookupCep() {
  const cep = digits(cepInput.value);
  if (cep.length !== 8) {
    showCepWarn("CEP inválido.");
    return;
  }
  try {
    const r = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const d = await r.json();
    if (d.erro) {
      showCepWarn("CEP não encontrado.");
      return;
    }
    hideCepWarn();
    streetInput.value = d.logradouro || "";
    neighInput.value = d.bairro || "";
    cityInput.value = d.localidade || "";
    ufInput.value = (d.uf || "").toUpperCase();
    numberInput.focus();
  } catch {
    showCepWarn("Falha ao buscar CEP.");
  }
}
function showCepWarn(msg) {
  cepWarn.textContent = msg;
  cepWarn.classList.remove("hidden");
}
function hideCepWarn() {
  cepWarn.classList.add("hidden");
}

// ===================
//   VALIDAÇÃO STEP 2
// ===================
function validateStep2() {
  const req = [
    [nameInput, "Informe seu nome."],
    [phoneInput, "Informe seu WhatsApp."],
  ];

  // se entrega estiver marcada, endereço é obrigatório
  const ship = selected("ship") || "delivery";
  if (ship === "delivery") {
    req.push([cepInput, "Informe o CEP."]);
    req.push([streetInput, "Informe a rua."]);
    req.push([numberInput, "Informe o número."]);
    req.push([neighInput, "Informe o bairro."]);
    req.push([cityInput, "Informe a cidade."]);
    req.push([ufInput, "Informe a UF."]);
  }

  for (const [el, msg] of req) {
    if (!el || !el.value.trim()) {
      markInvalid(el);
      Toastify({ text: msg, duration: 1800 }).showToast();
      el?.focus();
      return false;
    }
  }
  function toWaLink(rawPhone, defaultCountry = "55") {
    // Mantém apenas dígitos e garante prefixo do país (BR = 55)
    let d = (rawPhone || "").replace(/\D/g, "");
    if (!d.startsWith(defaultCountry)) d = defaultCountry + d;
    return `https://wa.me/${d}`;
  }
  if (digits(phoneInput.value).length < 10) {
    markInvalid(phoneInput);
    Toastify({
      text: "WhatsApp parece incompleto.",
      duration: 1800,
    }).showToast();
    phoneInput.focus();
    return false;
  }
  if (ship === "delivery" && digits(cepInput.value).length !== 8) {
    markInvalid(cepInput);
    Toastify({ text: "CEP inválido.", duration: 1800 }).showToast();
    cepInput.focus();
    return false;
  }
  return true;
}
function markInvalid(input) {
  input.classList.add("border-red-400");
  setTimeout(() => input.classList.remove("border-red-400"), 1200);
}
function selected(name) {
  return document.querySelector(`input[name="${name}"]:checked`)?.value || "";
}

// ===================
//   ENTREGA/PAGAMENTO
// ===================
document.querySelectorAll('input[name="pay"]').forEach((r) => {
  r.addEventListener("change", () => {
    const show = selected("pay") === "money";
    moneyChangeWrap.classList.toggle("hidden", !show);
  });
});
document.querySelectorAll('input[name="ship"]').forEach((r) => {
  r.addEventListener("change", updateTotalsUI);
});

function deliveryFeeVal() {
  const method = selected("ship") || "delivery";
  const sub = cartSubtotalVal();
  if (method !== "delivery") return 0;
  const { defaultFee, freeAbove } = DELIVERY_CONFIG;
  return sub >= freeAbove ? 0 : defaultFee;
}
function updateTotalsUI() {
  const sub = cartSubtotalVal();
  const fee = deliveryFeeVal();
  const grand = sub + fee;
  elSubtotal && (elSubtotal.textContent = currency.format(sub));
  elFee && (elFee.textContent = currency.format(fee));
  elGrand && (elGrand.textContent = currency.format(grand));
  cartTotal.textContent = currency.format(sub);
}
updateTotalsUI();

// ===================
//  CHECKOUT (Whats)
// ===================
checkoutBtn?.addEventListener("click", () => {
  if (cart.length === 0)
    return Toastify({ text: "Carrinho vazio.", duration: 1800 }).showToast();

  if (!validateStep2()) {
    gotoStep(2);
    return;
  }

  const pay = selected("pay") || "pix"; // pix | card | money
  const ship = selected("ship") || "delivery"; // delivery | pickup

  const sub = cartSubtotalVal();
  const fee = deliveryFeeVal();
  const total = sub + fee;

  // 👉 AQUI: cada item em UMA LINHA
  const items = cart
    .map((i) => `• ${i.qty}× ${i.name} — ${currency.format(i.price * i.qty)}`)
    .join("\n");

  const name = (nameInput.value || "").trim();
  const phone = (phoneInput.value || "").trim();
  const clientWaLink = toWaLink(phone);

  // 👉 Endereço montado COM \n (sem %0A)
  let addressBlock = "";
  if (ship === "delivery") {
    const cep = (cepInput.value || "").trim();
    const rua = (streetInput.value || "").trim();
    const num = (numberInput.value || "").trim();
    const comp = (compInput.value || "").trim();
    const bairro = (neighInput.value || "").trim();
    const cidade = (cityInput.value || "").trim();
    const uf = (ufInput.value || "").trim().toUpperCase();
    const ref = (refInput.value || "").trim();

    const end1 = `${rua}, ${num}${comp ? ` - ${comp}` : ""}`;
    const end2 = `${bairro} — ${cidade}/${uf}`;
    const end3 = `CEP: ${cep}${ref ? ` • Ref: ${ref}` : ""}`;

    addressBlock = `*Endereço*\n` + `${end1}\n${end2}\n${end3}\n`;
  } else {
    addressBlock = `*Recebimento*\nRetirar no local\n`;
  }

  const payTxt =
    pay === "money"
      ? `Dinheiro — troco para ${changeInput.value || "R$ 0,00"}`
      : pay === "card"
      ? "Cartão"
      : "Pix";

  const notes = (notesInput.value || "").trim();

  // 👉 Mensagem inteira com \n
  const msg = `*Pedido via Cardápio Demo*

${items}

Subtotal: ${currency.format(sub)}
Entrega (${ship === "delivery" ? "Entrega" : "Retirada"}): ${currency.format(
    fee
  )}
*Total:* ${currency.format(total)}

*Pagamento:* ${payTxt}

*Dados do cliente*
Cliente: ${name}
WhatsApp: ${phone}
Contato: ${clientWaLink}

${addressBlock}${notes ? `\n*Observações*\n${notes}\n` : ""}`;

  const url = `https://wa.me/${WHATS_PHONE.replace(
    /\D/g,
    ""
  )}?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");

  // reset
  cart = [];
  updateCart();
  gotoStep(1);
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

function renderDepoAvatars() {
  if (!depoAvatars) return;
  depoAvatars.innerHTML = TESTIMONIALS.map(
    (t) => `
    <button type="button" class="group relative" data-id="${t.id}" aria-label="Ver depoimento de ${t.name}">
      <div class="size-14 md:size-16 rounded-full overflow-hidden ring-1 ring-white/10 bg-white/10 grid place-items-center group-[.active]:ring-2 group-[.active]:ring-brand">
        <img src="${t.avatar}" alt="${t.name}" class="w-full h-full object-cover" onerror="this.parentElement.classList.add('bg-white/10'); this.remove();">
      </div>
      <span class="block text-xs text-white/60 mt-1 text-center">${t.name}</span>
    </button>`
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
if (header) {
  window.addEventListener("scroll", () => {
    const scrolled = (window.scrollY || 0) > 8;
    header.classList.toggle("shadow-lg", scrolled);
    header.classList.toggle("bg-white/10", scrolled);
    header.classList.toggle("backdrop-blur-md", scrolled);
  });
}

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
updateTotalsUI();

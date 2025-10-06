const LS_KEY = "menu.products.v1";
let PRODUCTS_DEFAULT = [];
try {
  PRODUCTS_DEFAULT = window.DEFAULTS_PLACEHOLDER ?? [];
} catch (e) {
  PRODUCTS_DEFAULT = [];
}
function lsLoad() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return arr;
    }
  } catch (e) {}
  return PRODUCTS_DEFAULT;
}
function lsSave(arr) {
  localStorage.setItem(LS_KEY, JSON.stringify(arr));
}
function uid(arr) {
  return arr.length ? Math.max(...arr.map((x) => x.id || 0)) + 1 : 1;
}
let data = lsLoad();
const grid = document.getElementById("grid");
const modal = document.getElementById("modal");
const form = document.getElementById("form");
const btnNew = document.getElementById("btn-new");
const btnCancel = document.getElementById("btn-cancel");
const btnReset = document.getElementById("btn-reset");
const filter = document.getElementById("filter-category");
const search = document.getElementById("search");
const btnExport = document.getElementById("btn-export");
const fileImport = document.getElementById("file-import");
function categories() {
  return Array.from(new Set(data.map((x) => x.category))).sort();
}
function fillFilter() {
  filter.innerHTML =
    '<option value="">Todas as categorias</option>' +
    categories()
      .map((c) => `<option>${c}</option>`)
      .join("");
}
function render() {
  const q = search.value.toLowerCase();
  const cat = filter.value;
  grid.innerHTML = data
    .filter(
      (x) =>
        (!cat || x.category === cat) && (!q || x.name.toLowerCase().includes(q))
    )
    .map(
      (x) =>
        `<tr class="border-b border-white/10"><td class="pr-4">${
          x.id
        }</td><td class="pr-4"><div class="size-12 rounded-lg bg-white/10 grid place-items-center overflow-hidden"><img src="${
          x.image
        }" alt="${
          x.name
        }" class="max-w-full max-h-full object-contain p-1"></div></td><td class="pr-4 font-medium">${
          x.name
        }</td><td class="pr-4">${x.category}</td><td class="pr-4">R$ ${Number(
          x.price
        ).toFixed(2)}</td><td class="pr-4 text-white/70">${
          x.desc || ""
        }</td><td class="text-right"><button class="btn-ghost" onclick='edit(${JSON.stringify(
          x.id
        )})'><i class="fa-solid fa-pen"></i></button><button class="btn-ghost" onclick='del(${JSON.stringify(
          x.id
        )})'><i class="fa-solid fa-trash"></i></button></td></tr>`
    )
    .join("");
}
let editingId = null;
function openModal() {
  modal.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
  form.reset();
  editingId = null;
}
function edit(id) {
  const x = data.find((i) => i.id === id);
  if (!x) return;
  editingId = id;
  openModal();
  form.name.value = x.name;
  form.category.value = x.category;
  form.price.value = x.price;
  form.image.value = x.image;
  form.desc.value = x.desc || "";
}
function del(id) {
  if (!confirm("Apagar este item?")) return;
  data = data.filter((i) => i.id !== id);
  lsSave(data);
  fillFilter();
  render();
}
btnNew.addEventListener("click", () => {
  editingId = null;
  openModal();
});
btnCancel.addEventListener("click", closeModal);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const x = {
    id: editingId ?? uid(data),
    name: form.name.value.trim(),
    category: form.category.value.trim(),
    price: parseFloat(form.price.value),
    image: form.image.value.trim(),
    desc: form.desc.value.trim(),
  };
  if (editingId) {
    data = data.map((i) => (i.id === editingId ? x : i));
  } else {
    data = [...data, x];
  }
  lsSave(data);
  closeModal();
  fillFilter();
  render();
});
filter.addEventListener("change", render);
search.addEventListener("input", render);
btnReset.addEventListener("click", () => {
  if (!confirm("Repor os itens padrão?")) return;
  localStorage.removeItem(LS_KEY);
  data = lsLoad();
  fillFilter();
  render();
});
btnExport.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "menu-products.json";
  a.click();
  URL.revokeObjectURL(a.href);
});
fileImport.addEventListener("change", async (e) => {
  const f = e.target.files?.[0];
  if (!f) return;
  const txt = await f.text();
  try {
    const arr = JSON.parse(txt);
    if (Array.isArray(arr)) {
      data = arr;
      lsSave(data);
      fillFilter();
      render();
    } else {
      alert("JSON inválido");
    }
  } catch (err) {
    alert("Falha ao ler JSON");
  }
});
fillFilter();
render();

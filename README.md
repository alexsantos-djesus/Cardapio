# Cardápio Demo — Portfolio (v1.2)

Uma landing e um cardápio digital estático com **carrinho**, **checkout via WhatsApp** e **área administrativa** de itens.  
Pensado para **portfolio/vendas**: rápido de adaptar, bonito e com animações modernas.

> **Versão:** 1.2  •  **Data:** 2025-10-06

---

## 🧭 Sumário
- [O que tem de novo (v1.2)](#-o-que-tem-de-novo-v12)
- [Demo local](#-demo-local)
- [Estrutura do projeto](#-estrutura-do-projeto)
- [Configuração rápida](#-configuração-rápida)
- [Admin (CRUD de itens)](#-admin-crud-de-itens)
- [Build do CSS (Tailwind)](#-build-do-css-tailwind)
- [Dicas de conteúdo](#-dicas-de-conteúdo)
- [Deploy](#-deploy)
- [Licença](#-licença)

---

## ✨ O que tem de novo (v1.2)

- **Hero cinematográfico**
  - Animação *stagger* por palavra no título
  - Destaque “**cardápio digital**” com gradiente/shine
  - Parallax leve do background
  - CTAs com *magnetic hover* + *ripple*
  - Indicador “scroll” sutil
- **Depoimentos interativos:** fotos embaixo; conteúdo aparece ao clicar; avatar selecionado pulsa.
- **Modal do carrinho** sólido com **fade-in/out** e **pop/pop-out**.
- **Reveal on Scroll** (IntersectionObserver) com **fallback** para navegadores antigos.
- **Qualidade de vida:** imagens com `loading="lazy"`, toasts, contagem do carrinho pulsando, etc.

> A versão mantém compatibilidade: é só substituir os arquivos na pasta e atualizar as imagens/JSON conforme necessário.

---

## 🚀 Demo local

1. **Baixe o ZIP** e extraia.
2. Abra a pasta no VS Code e use **Live Server** *ou* rode um servidor simples:
   - Python: `python -m http.server 5500`
   - Node: `npx http-server . -p 5500`
3. Acesse: `http://localhost:5500/index.html`

> O projeto é **estático**. Funciona local e em qualquer host de arquivos estáticos (Netlify, Vercel, GitHub Pages, etc.).

---

## 🗂 Estrutura do projeto

```
.
├── index.html          # Landing + cardápio + depoimentos + modal do carrinho
├── admin.html          # Painel administrativo para gerir os itens
├── script.js           # Lógica do cardápio, carrinho, depoimentos e animações
├── admin.js            # Lógica do painel admin (import/export JSON, CRUD, filtros)
├── styles/
│   ├── input.css       # (opcional) fonte do Tailwind, se quiser rebuild
│   └── output.css      # CSS gerado e pronto para uso
├── assets/
│   ├── bg.png          # Background do hero
│   ├── hamb-*.png      # Imagens do catálogo
│   ├── ...             # Outras imagens
│   └── avatars/
│       ├── cliente-1.jpg
│       ├── cliente-2.jpg
│       └── cliente-3.jpg
└── tailwind.config.js  # Tokens e animações utilitárias (se rebuildar o CSS)
```

---

## ⚙️ Configuração rápida

- **Telefone do WhatsApp:** no `script.js` altere `WHATS_PHONE`:
  ```js
  const WHATS_PHONE = "+55DDDSEUNUMERO";
  ```
- **Open Graph:** ajuste o título/descrição/imagem no `<head>` do `index.html`.
- **Catálogo:** edite o array `PRODUCTS` (id, name, price, image, category, desc).
- **Depoimentos:** coloque as fotos em `assets/avatars/cliente-*.jpg` e edite o array `TESTIMONIALS` (name, role, text, avatar).

> Dica: mantenha **nomes de arquivos sem espaço** e otimize imagens (webp/png comprimido) para melhor desempenho.

---

## 🛠 Admin (CRUD de itens)

Abra `admin.html` para:
- **Criar/editar/remover** itens do cardápio;
- **Filtrar por categoria** e **buscar por nome**;
- **Exportar JSON** dos itens ou **Importar JSON** salvo;
- **Repor defaults** (se `DEFAULTS_PLACEHOLDER` estiver configurado).

O painel grava/usa os dados **em memória** (no código). Integração com banco/planilha pode ser feita depois, se necessário.

---

## 🎨 Build do CSS (Tailwind)

O projeto já inclui `styles/output.css`. Só refaça o build se mudar tokens/animações.

1. Instale Tailwind (opcional, em ambiente de dev):
   ```bash
   npm i -D tailwindcss
   npx tailwindcss init -p
   ```
2. Rode o build/Watch:
   ```bash
   npx tailwindcss -i ./styles/input.css -o ./styles/output.css --watch
   ```

No `tailwind.config.js` há **keyframes** usados no projeto (fade, pop, pulse, ripple).

---

## ✍️ Dicas de conteúdo

- **Texto do herói:** curto, direto e com uma palavra-chave destacada.
- **Imagens dos produtos:** proporção 4:3 ou quadrada; use `object-contain` para não cortar.
- **Categorias curtas:** ex.: *Burgers*, *Acompanhamentos*, *Bebidas*.
- **Depoimentos reais:** uma frase forte, nome curto e função/empresa.
- **Acessibilidade:** alt nas imagens e contraste suficiente (mantido no tema).

---

## ☁️ Deploy

- **Netlify:** arraste a pasta ou conecte o repositório.
- **Vercel:** novo projeto → import da pasta.
- **GitHub Pages:** branch com `/` na raiz; habilite Pages.
- **cPanel/S3/FTP:** faça upload dos arquivos (é estático).

---

## 📒 Changelog — v1.2

- Hero com **stagger por palavra**, gradiente/shine no destaque e **parallax** suave.
- **Ripple** e **magnetic hover** nos botões principais.
- **Modal** do carrinho com animações *fade/pop*.
- **Depoimentos** controlados por avatar com animação de entrada.
- **Reveal on Scroll** com *fallback* (não quebra em browsers antigos).
- Ajustes de UX, toasts e micro animações (contador do carrinho, imagens com lazy-loading).

---

## 🧾 Licença

[MIT](https://opensource.org/licenses/MIT) — use livremente em portfolios e projetos comerciais. Créditos para ícones e libs de terceiros (Font Awesome, Toastify e TailwindCSS).

---

### Suporte & ideias

Ficou com dúvida ou quer levar isso para um **cardápio real** (com painel + backend)? Abra uma issue ou entre em contato. :)

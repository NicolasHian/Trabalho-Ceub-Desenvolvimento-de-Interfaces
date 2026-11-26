// ano do rodapé
const anoEl = document.getElementById("ano");
if (anoEl) anoEl.textContent = new Date().getFullYear();

// navbar muda de cor quando rola a página
const navbar = document.getElementById("navbar");
if (navbar) {
  const onScroll = () => navbar.classList.toggle("navbar--scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll);
}

// menu do celular
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function abrirFecharMenu(abrir) {
  navLinks.classList.toggle("nav-links--open", abrir);
  navToggle.classList.toggle("nav-toggle--open", abrir);
  navToggle.setAttribute("aria-expanded", abrir);
  navToggle.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    abrirFecharMenu(!navLinks.classList.contains("nav-links--open"));
  });

  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => abrirFecharMenu(false));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("nav-links--open")) {
      abrirFecharMenu(false);
      navToggle.focus();
    }
  });
}

// contador dos números da seção Sobre (só na home)
const stats = document.querySelector(".stats");

function animarNumero(el) {
  const alvo = parseInt(el.dataset.count);
  const duracao = 1400;
  const inicio = performance.now();

  function passo(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const suave = 1 - Math.pow(1 - progresso, 3);
    el.textContent = Math.round(suave * alvo);
    if (progresso < 1) requestAnimationFrame(passo);
  }
  requestAnimationFrame(passo);
}

if (stats && "IntersectionObserver" in window) {
  const numeros = stats.querySelectorAll("[data-count]");
  numeros.forEach((n) => (n.textContent = "0"));

  // só começa a contar quando a seção aparece na tela
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      numeros.forEach(animarNumero);
      observer.disconnect();
    }
  }, { threshold: 0.2 });
  observer.observe(stats);
}

// foto ampliada (lightbox)
const lightbox = document.getElementById("lightbox");
const lightboxFigure = document.getElementById("lightboxFigure");
const lightboxClose = document.getElementById("lightboxClose");
let fotoClicada = null;

if (lightbox) {
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const grande = document.createElement("img");
      grande.src = img.src;
      grande.alt = img.alt;
      lightboxFigure.replaceChildren(grande);

      fotoClicada = item;
      lightbox.showModal();
      lightboxClose.focus();
    });
  });

  lightboxClose.addEventListener("click", () => lightbox.close());

  // clicar fora da foto fecha
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.close();
  });

  // quando fecha (no X, clicando fora ou no Esc) o foco volta para a foto
  lightbox.addEventListener("close", () => {
    lightboxFigure.replaceChildren();
    if (fotoClicada) fotoClicada.focus();
  });
}

// filtro da galeria
const filtros = document.querySelectorAll(".filter-btn");
const statusFiltro = document.getElementById("statusFiltro");
const nomesFiltro = {
  todos: "de todas as categorias",
  garden: "do Garden",
  villa: "da Villa",
  decoracao: "de decoração"
};

filtros.forEach((btn) => {
  btn.addEventListener("click", () => {
    const escolha = btn.dataset.filtro;
    let total = 0;

    filtros.forEach((b) => b.setAttribute("aria-pressed", b === btn));

    document.querySelectorAll(".gallery-page-grid .gallery-item").forEach((foto) => {
      foto.hidden = escolha !== "todos" && foto.dataset.cat !== escolha;
      if (!foto.hidden) total++;
    });

    statusFiltro.textContent = `Mostrando ${total} fotos ${nomesFiltro[escolha]}.`;
  });
});

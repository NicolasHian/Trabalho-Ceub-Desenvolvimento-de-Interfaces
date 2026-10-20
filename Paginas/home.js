// Ano no rodapé
const anoEl = document.getElementById("ano"); // pega o elemento <span id="ano"> do rodapé
if (anoEl) anoEl.textContent = new Date().getFullYear(); // preenche com o ano atual, se o elemento existir

// Tela de carregamento inicial (cortina abrindo)
const loader = document.getElementById("loader"); // pega o elemento da tela de carregamento
if (loader) { // se a tela de carregamento existe
  document.body.classList.add("is-loading"); // trava o scroll da página enquanto o loader estiver visível
  let loaderOpened = false; // flag para garantir que o loader só abra uma vez
  const openLoader = () => { // função que abre a cortina
    if (loaderOpened) return; // evita abrir o loader mais de uma vez
    loaderOpened = true; // marca que o loader já foi aberto
    loader.classList.add("loader--open"); // dispara a animação de abertura (cortina)
    document.body.classList.remove("is-loading"); // libera o scroll da página novamente
    window.setTimeout(() => loader.remove(), 1300); // remove o loader do DOM após a animação terminar
  }; // fim da função
  if (document.readyState === "complete") { // se a página já terminou de carregar
    window.setTimeout(openLoader, 250); // se a página já carregou, abre o loader com um pequeno atraso
  } else { // senão
    window.addEventListener("load", () => window.setTimeout(openLoader, 250)); // senão, espera o evento "load"
  }
  window.setTimeout(openLoader, 2500); // rede de segurança
} // fim do loader

// Navbar muda de aparência ao rolar + barra de progresso de leitura
const navbar = document.getElementById("navbar"); // barra de navegação fixa no topo
const scrollProgress = document.getElementById("scrollProgress"); // barra que mostra o progresso de rolagem

const onScroll = () => { // função chamada ao rolar a página
  if (window.scrollY > 24) navbar.classList.add("navbar--scrolled"); // aplica estilo "rolado" após 24px de scroll
  else navbar.classList.remove("navbar--scrolled"); // volta ao estilo original no topo da página

  if (scrollProgress) { // se a barra de progresso existe
    const docH = document.documentElement.scrollHeight - window.innerHeight; // altura total rolável da página
    const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0; // calcula a porcentagem já rolada
    scrollProgress.style.width = pct + "%"; // atualiza a largura da barra de progresso
  }
}; // fim da função
onScroll(); // executa uma vez ao carregar, para já refletir a posição inicial
window.addEventListener("scroll", onScroll, { passive: true }); // reexecuta a cada rolagem, sem bloquear o scroll

// Rolagem suave com inércia (efeito "smooth scroll")
const smoothWrapper = document.getElementById("smoothWrapper"); // contêiner que envolve todo o conteúdo rolável
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches; // usuário pediu menos animação
const canSmoothScroll = window.matchMedia("(hover: hover) and (pointer: fine)").matches; // só ativa em telas com mouse

if (smoothWrapper && !prefersReducedMotion && canSmoothScroll) { // só liga se tiver mouse e o usuário aceitar animação
  let current = window.scrollY; // posição de rolagem "visual" atual (com inércia)
  let target = window.scrollY; // posição de rolagem real do navegador
  const ease = 0.09; // fator de suavização: quanto menor, mais lenta/suave a inércia

  const setBodyHeight = () => { // função que acerta a altura da página
    document.body.style.height = smoothWrapper.scrollHeight + "px"; // dá ao body a altura real do conteúdo, já que ele fica "fixed"
  }; // fim da função

  const tick = () => { // função que roda a cada quadro
    target = window.scrollY; // atualiza a posição real de rolagem a cada quadro
    current += (target - current) * ease; // aproxima gradualmente a posição visual da posição real
    if (Math.abs(target - current) < 0.05) current = target; // encaixa quando a diferença é imperceptível
    smoothWrapper.style.transform = `translate3d(0, ${-current}px, 0)`; // move o conteúdo visualmente para simular o scroll
    requestAnimationFrame(tick); // agenda o próximo quadro da animação
  }; // fim da função

  setBodyHeight(); // define a altura do body assim que o script roda
  document.body.classList.add("js-smooth"); // ativa via CSS o modo de scroll suave (position fixed no wrapper)
  requestAnimationFrame(tick); // inicia o loop de animação

  window.addEventListener("resize", setBodyHeight); // recalcula a altura se a janela for redimensionada
  window.addEventListener("load", setBodyHeight); // recalcula após todo o conteúdo (imagens etc.) carregar
  if ("ResizeObserver" in window) { // se o navegador sabe observar mudanças de tamanho
    new ResizeObserver(setBodyHeight).observe(smoothWrapper); // recalcula sempre que o conteúdo interno mudar de tamanho
  }
} // fim da rolagem suave

// Menu mobile
const navToggle = document.getElementById("navToggle"); // botão "hambúrguer" do menu mobile
const navLinks = document.getElementById("navLinks"); // painel com os links de navegação
if (navToggle && navLinks) { // se o botão e o menu existem
  navToggle.addEventListener("click", () => { // ao clicar no botão hambúrguer
    const open = navLinks.classList.toggle("nav-links--open"); // abre/fecha o menu e guarda o novo estado
    navToggle.classList.toggle("nav-toggle--open", open); // sincroniza a animação do ícone com o estado do menu
    navToggle.setAttribute("aria-expanded", open ? "true" : "false"); // atualiza o atributo de acessibilidade
  }); // fim do clique
  navLinks.querySelectorAll("a").forEach((a) => // para cada link do menu
    a.addEventListener("click", () => { // ao clicar no link
      navLinks.classList.remove("nav-links--open"); // fecha o menu ao clicar em qualquer link
      navToggle.classList.remove("nav-toggle--open"); // desfaz a animação do ícone hambúrguer
      navToggle.setAttribute("aria-expanded", "false"); // atualiza o atributo de acessibilidade
    })
  );
} // fim do menu mobile

// Divide o título do hero em palavras animadas
document.querySelectorAll(".split-words").forEach((el) => { // para cada título marcado com split-words
  const walk = (node) => { // função que passa por todo o texto
    Array.from(node.childNodes).forEach((child) => { // para cada pedaço dentro do título
      if (child.nodeType === Node.TEXT_NODE) { // se for texto puro
        const frag = document.createDocumentFragment(); // fragmento temporário para montar os novos nós
        child.textContent.split(/(\s+)/).forEach((piece) => { // separa o texto em palavras e espaços
          if (piece.trim() === "") { // se o pedaço é só espaço
            if (piece.length) { // e não está vazio
              const sp = document.createElement("span"); // cria um span para representar o espaço em branco
              sp.className = "space"; // classe do espaço
              sp.textContent = piece; // coloca o espaço dentro
              frag.appendChild(sp); // adiciona no fragmento
            }
            return; // pula para o próximo pedaço do texto
          }
          const span = document.createElement("span"); // cria um span para cada palavra individual
          span.className = "word"; // classe da palavra (animada no CSS)
          span.textContent = piece; // coloca a palavra dentro
          frag.appendChild(span); // adiciona no fragmento
        });
        child.replaceWith(frag); // substitui o texto original pelos spans de palavra/espaço
      } else if (child.nodeType === Node.ELEMENT_NODE) { // se for uma tag (ex: <em>)
        walk(child); // repete o processo recursivamente para elementos filhos (ex: <em>)
      }
    });
  };
  walk(el); // inicia a divisão em palavras para este título
  let i = 0; // contador usado para escalonar o atraso da animação de cada palavra
  el.querySelectorAll(".word").forEach((w) => { // para cada palavra criada
    w.style.setProperty("--i", i++); // define a variável CSS --i, usada no delay da animação
  });
}); // fim do split-words

// Contagem animada dos números da seção "Sobre"
const animateCount = (el) => { // função que anima um número subindo
  const target = parseInt(el.dataset.count, 10) || 0; // número final que o contador deve atingir
  const duration = 1400; // duração total da animação, em milissegundos
  const start = performance.now(); // marca o instante em que a animação começou
  const step = (now) => { // função de cada quadro da contagem
    const progress = Math.min((now - start) / duration, 1); // progresso da animação, de 0 a 1
    const eased = 1 - Math.pow(1 - progress, 3); // aplica uma curva de suavização (ease-out cúbico)
    el.textContent = Math.round(eased * target); // atualiza o número exibido na tela
    if (progress < 1) requestAnimationFrame(step); // continua animando até completar
  };
  requestAnimationFrame(step); // inicia a animação de contagem
}; // fim da função

// Animações de entrada ao rolar a página
const revealEls = document.querySelectorAll(".reveal"); // todos os elementos que devem aparecer ao rolar
if ("IntersectionObserver" in window) { // se o navegador sabe ver o que está na tela
  const io = new IntersectionObserver( // cria o observador
    (entries) => { // função chamada quando algo aparece/some
      entries.forEach((entry) => { // para cada elemento observado
        if (entry.isIntersecting) { // quando o elemento entra na área visível da tela
          entry.target.classList.add("reveal--visible"); // aplica a classe que dispara a animação de entrada
          entry.target.querySelectorAll("[data-count]").forEach(animateCount); // anima contadores dentro dele, se houver
          io.unobserve(entry.target); // para de observar, já que a animação só acontece uma vez
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" } // dispara quando 15% do elemento estiver visível
  );
  revealEls.forEach((el) => io.observe(el)); // começa a observar cada elemento marcado com .reveal

  // Rede de segurança: se por algum motivo o navegador não disparar o
  // IntersectionObserver (aba em segundo plano, etc.), garante que o
  // conteúdo apareça mesmo assim.
  window.setTimeout(() => { // depois de 2,5 segundos
    revealEls.forEach((el) => { // para cada elemento
      if (!el.classList.contains("reveal--visible")) { // se ainda não apareceu
        el.classList.add("reveal--visible"); // força a exibição de elementos que não foram revelados a tempo
        el.querySelectorAll("[data-count]").forEach(animateCount); // garante que os contadores também rodem
      }
    });
  }, 2500);
} else { // navegador antigo
  revealEls.forEach((el) => { // para cada elemento
    el.classList.add("reveal--visible"); // navegadores sem suporte a IntersectionObserver: revela tudo de imediato
    el.querySelectorAll("[data-count]").forEach(animateCount); // e já anima os contadores
  });
}

// Petalas do hero: leve paralaxe ao rolar
const parallaxEls = document.querySelectorAll("[data-parallax]"); // elementos decorativos com efeito de paralaxe
if (parallaxEls.length) { // se existe algum elemento com paralaxe
  const onParallax = () => { // função chamada ao rolar
    const y = window.scrollY; // posição atual de rolagem
    parallaxEls.forEach((el) => { // para cada pétala
      const factor = parseFloat(el.dataset.parallax) || 0.3; // velocidade de deslocamento de cada pétala
      el.style.transform = `translateY(${y * factor}px)`; // move a pétala numa velocidade diferente do scroll normal
    });
  };
  window.addEventListener("scroll", onParallax, { passive: true }); // recalcula o paralaxe a cada rolagem
}

// Rastro de pétalas seguindo o cursor pela página inteira
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) { // só ativa em dispositivos com mouse
  let lastPetalTime = 0; // guarda o instante da última pétala criada, para limitar a frequência
  document.addEventListener("mousemove", (e) => { // ao mover o mouse
    const now = performance.now(); // hora atual em milissegundos
    if (now - lastPetalTime < 140) return; // ignora o movimento se ainda não passou tempo suficiente
    lastPetalTime = now; // atualiza o instante da última pétala criada

    const petal = document.createElement("span"); // cria o elemento visual da pétala
    petal.className = "cursor-petal"; // classe da pétala (animada no CSS)
    petal.textContent = "✿"; // desenho da florzinha
    petal.style.left = e.clientX + "px"; // posiciona a pétala na posição horizontal do cursor
    petal.style.top = e.clientY + "px"; // posiciona a pétala na posição vertical do cursor
    petal.style.fontSize = 14 + Math.random() * 12 + "px"; // varia o tamanho aleatoriamente para dar naturalidade
    document.body.appendChild(petal); // adiciona a pétala na página
    window.setTimeout(() => petal.remove(), 1150); // remove a pétala do DOM depois que a animação de sumiço termina
  });
}

// Botões magnéticos: seguem levemente o cursor
if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) { // só ativa em dispositivos com mouse
  document.querySelectorAll(".magnetic").forEach((btn) => { // para cada botão magnético
    btn.addEventListener("mousemove", (e) => { // ao mover o mouse sobre o botão
      const rect = btn.getBoundingClientRect(); // posição e tamanho do botão na tela
      const x = e.clientX - rect.left - rect.width / 2; // distância horizontal do cursor até o centro do botão
      const y = e.clientY - rect.top - rect.height / 2; // distância vertical do cursor até o centro do botão
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`; // move o botão levemente em direção ao cursor
    });
    btn.addEventListener("mouseleave", () => { // quando o mouse sai do botão
      btn.style.transform = ""; // volta o botão para a posição original quando o cursor sai
    });
  });
}

// Lightbox da galeria
const lightbox = document.getElementById("lightbox"); // painel de tela cheia que exibe a imagem ampliada
const lightboxImg = document.getElementById("lightboxImg"); // elemento <img> dentro do lightbox
const lightboxClose = document.getElementById("lightboxClose"); // botão de fechar o lightbox

const openLightbox = (src, alt) => { // função que abre a foto ampliada
  if (!lightbox) return; // sai se o lightbox não existir na página atual
  lightboxImg.src = src; // define a imagem a ser exibida em tela cheia
  lightboxImg.alt = alt || ""; // define o texto alternativo da imagem
  lightbox.classList.add("lightbox--open"); // exibe o lightbox
  lightbox.setAttribute("aria-hidden", "false"); // informa a leitores de tela que o conteúdo está visível
  document.body.style.overflow = "hidden"; // trava o scroll da página enquanto o lightbox está aberto
};

const closeLightbox = () => { // função que fecha a foto ampliada
  if (!lightbox) return; // sai se o lightbox não existir na página atual
  lightbox.classList.remove("lightbox--open"); // esconde o lightbox
  lightbox.setAttribute("aria-hidden", "true"); // informa a leitores de tela que o conteúdo está oculto
  document.body.style.overflow = ""; // libera o scroll da página novamente
};

document.querySelectorAll(".gallery-item").forEach((item) => { // para cada foto da galeria
  item.addEventListener("click", () => { // ao clicar na foto
    const img = item.querySelector("img"); // pega a imagem dentro do item clicado
    if (img) openLightbox(img.src, img.alt); // abre o lightbox com essa imagem
  });
});

if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox); // fecha ao clicar no botão "X"
if (lightbox) { // se o lightbox existe
  lightbox.addEventListener("click", (e) => { // ao clicar no lightbox
    if (e.target === lightbox) closeLightbox(); // fecha ao clicar fora da imagem (no fundo escuro)
  });
}
document.addEventListener("keydown", (e) => { // ao apertar uma tecla
  if (e.key === "Escape") closeLightbox(); // fecha ao pressionar a tecla Esc
});

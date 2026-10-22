# Espaço Bem Me Quer — Página Inicial (home.html)

Este arquivo é a **página inicial** do site do Espaço Bem Me Quer, um salão de festas em Brasília com dois ambientes: **Garden** e **Villa**.

O código foi dividido em **17 blocos**. Abaixo, cada um é explicado de forma simples.

---

## Arquivos que trabalham juntos

| Arquivo | Para que serve |
|---|---|
| `home.html` | A estrutura da página (o "esqueleto") |
| `style.css` | As cores, fontes e o visual (a "roupa") |
| `home.js` | As animações e os cliques (o "movimento") |
| `img/final/` | Pasta com as fotos do site |

---

## Os blocos da página

### Bloco 1 — Configuração da página
É a parte que o visitante **não vê**. Aqui o navegador fica sabendo:
- que a página é em português;
- que deve mostrar acentos corretamente;
- que deve se ajustar à tela do celular;
- qual o nome que aparece na aba do navegador;
- quais fontes usar (Fraunces, Public Sans e IBM Plex Mono);
- onde está o arquivo de estilo (`style.css`).

### Bloco 2 — Tela de carregamento
Enquanto o site carrega, aparece uma **cortina com uma flor no meio**. Quando tudo termina de carregar, a cortina se abre para os lados e mostra o site.

A flor é desenhada com código (SVG): são **8 pétalas** iguais, cada uma girada um pouco (de 45 em 45 graus), com uma bolinha dourada no centro. Essa mesma flor aparece em vários lugares do site.

### Bloco 3 — Barra de progresso
Uma **linha fina no topo** da tela que vai crescendo conforme a pessoa desce a página. Assim o visitante sabe quanto falta para chegar ao final.

### Bloco 4 — Menu do topo
A barra fixa no alto da página. Ela tem:
- **Logo** (a flor + o nome "Bem Me Quer"), que leva de volta ao início;
- **Botão de três listras**, que só aparece no celular e abre o menu;
- **Links** para as seções: Espaços, Serviços, Galeria e Contato;
- **Botão de destaque** "Solicitar orçamento".

### Bloco 5 — Caixa geral (rolagem suave)
Uma caixa que **envolve todo o conteudo** da página. O JavaScript usa ela para deixar a rolagem mais suave e elegante.

### Bloco 6 — Hero (primeira tela)
É a **primeira coisa que o visitante vê**. Tem:
- uma **foto grande** de fundo com uma camada escura por cima (para o texto ficar legível);
- **florzinhas de enfeite** que se mexem em velocidades diferentes ao rolar a página (efeito chamado *parallax*);
- o **título principal**: "Onde cada festa vira memória";
- dois **botões**: "Solicitar orçamento" e "Conhecer os espaços";
- uma **setinha** que convida a pessoa a descer.

### Bloco 7 — Conteúdo principal
A tag `<main>` marca onde começa o **conteúdo mais importante** da página. Ajuda o Google e os leitores de tela a entender a página.

### Bloco 8 — Seção "Sobre"
Apresenta o espaço com um texto curto e mostra **três números** que contam de 0 até o valor final quando aparecem na tela:
- **2** espaços exclusivos
- **200** convidados por evento
- **7** dias por semana disponível

### Bloco 9 — Divisor
Uma **linha ondulada com uma flor** no meio. Serve só de enfeite para separar uma seção da outra.

### Bloco 10 — Seção "Espaços"
Mostra **dois cards lado a lado**, um para cada ambiente:
- **Garden** — jardim aberto com piscina, gazebo e gramado.
- **Villa** — salão coberto com churrasqueira, forno de pizza e três piscinas.

Cada card tem foto, descrição e um link para simular o orçamento.

### Bloco 11 — Seção "Serviços"
Quatro cards com **serviços extras** que o cliente pode contratar:
- 🍧 Carrinho de Açaí
- 🍽️ Buffet
- 🎧 DJ
- 📸 Cabine Fotográfica

### Bloco 12 — Segundo divisor
Igual ao Bloco 9, separa os serviços da galeria.

### Bloco 13 — Galeria
Um **mosaico com 4 fotos** de tamanhos diferentes (uma alta, uma larga e duas normais). Cada foto é um botão: ao clicar, ela abre em tamanho grande (veja o Bloco 16).

### Bloco 14 — Faixa final (chamada para ação)
Uma faixa de destaque que **convida a pessoa a pedir o orçamento**, com o botão grande "Calcular meu orçamento".

### Bloco 15 — Rodapé
A parte de baixo do site, com:
- logo do espaço;
- cidade, e-mail e telefone;
- links rápidos;
- direitos autorais (o ano é escrito automaticamente pelo JavaScript).

O link "Contato" do menu leva até aqui.

### Bloco 16 — Lightbox (foto ampliada)
Uma **janela escondida** que só aparece quando alguém clica numa foto da galeria. Ela mostra a foto grande e tem um botão **X** para fechar.

### Bloco 17 — Final da página
Liga o arquivo **`home.js`**, que faz funcionar as animações, o menu do celular, a contagem dos números, a galeria e tudo que se mexe no site. Ele fica no final para a página aparecer primeiro e o JavaScript carregar depois.

---

## Detalhes que vale saber

- **`alt` nas imagens**: descreve a foto para quem usa leitor de tela e para o Google.
- **`loading="lazy"`**: a foto só carrega quando o visitante chega perto dela, deixando o site mais rápido.
- **`aria-hidden="true"`**: esconde enfeites (como as florzinhas) dos leitores de tela, para não atrapalhar quem tem deficiência visual.
- **Classe `reveal`**: faz o elemento aparecer com animação quando entra na tela.
- **Classe `magnetic`**: faz o botão "puxar" levemente na direção do mouse.
- **Links com `#`** (ex.: `#espacos`): descem até uma parte da mesma página, em vez de abrir outra página.

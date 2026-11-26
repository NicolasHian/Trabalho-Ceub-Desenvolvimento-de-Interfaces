# Mudanças em relação ao protótipo (E2)

O protótipo foi feito no Figma, em uma largura só. No navegador o site tem que funcionar no celular, no tablet e no computador, e também pelo teclado, então algumas coisas mudaram.

## Por causa do navegador

- No celular (abaixo de 860px) os links do menu viram um botão de menu, porque não cabiam numa linha só.
- As grades mudam o número de colunas conforme a largura da tela (cards, galeria, estrutura e botões da calculadora), para não ter rolagem para o lado.
- Na página Espaços, no celular, as fotos e o texto ficam um embaixo do outro, porque lado a lado ficava muito apertado.
- A tabela de comparação rola para o lado dentro da própria caixa no celular. As quatro colunas não cabem em 360px, mas a página continua sem rolagem lateral.
- As fotos aparecem cortadas para preencher os quadros, porque as fotos reais não têm o mesmo formato das molduras do Figma. Ao clicar, a foto aparece inteira.
- Os itens ganham um contorno quando recebem foco pelo Tab. O Figma não mostra esse estado, mas sem ele não dá para navegar pelo teclado.
- Foi criado um link "Pular para o conteúdo" que aparece só ao apertar Tab, para não precisar passar pelo menu toda vez.
- As mensagens de erro do formulário são as do próprio navegador (validação do HTML), então mudam um pouco de um navegador para outro.
- No menu, a página aberta fica sublinhada.
- As fontes vêm do Google Fonts. Sem internet aparece uma fonte padrão.

## Ajustes do grupo

- A galeria virou uma grade com todas as fotos do mesmo tamanho, em vez do mural com alturas diferentes, porque o layout precisava ser feito com Flexbox ou Grid.
- Na calculadora, a linha do fim de semana e as letras de sexta e sábado no calendário ficaram num dourado mais escuro, porque o dourado claro quase não aparecia em cima do bege. Os botões continuam no dourado original.
- O menu da página de orçamento agora aparece também no celular. Antes ele sumia e não dava para ir para as outras páginas.
- No celular, o botão "Simule seu orçamento" do topo da página de orçamento foi escondido, porque não cabia.
- As opções da calculadora viraram campos de formulário de verdade (radio e checkbox), com o mesmo visual. Assim dá para escolher pelo teclado.
- Os botões "Simular orçamento do Garden" e "Simular orçamento da Villa" agora abrem a calculadora com o espaço já marcado.

## Comparando com o Figma

<!-- completar olhando o protótipo da E2 ao lado do site -->

| Tela | O que mudou | Por quê |
|---|---|---|
| | | |

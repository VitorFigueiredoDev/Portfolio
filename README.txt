PORTFÓLIO — VITOR FIGUEIREDO

IMAGENS DOS PROJETOS
=====================

As capas exibidas na roda de projetos ficam em:
assets/images/projects/

ARQUIVOS ESPERADOS:
- ava-uniube.jpg
- tupa.jpg
- vovos-conectados.jpg
- projeto-cuca.jpg
- pesque-pague.jpg
- central-do-aluno.jpg

TAMANHO RECOMENDADO PARA AS CAPAS
----------------------------------
1000 x 1120 pixels (proporção 1:1,12).

Esse tamanho acompanha a proporção do card central e dá uma boa margem de qualidade
para telas de alta densidade. JPG ou WebP funcionam bem. Prefira arquivos bem comprimidos
para não prejudicar o carregamento da página.

A imagem usa object-fit: cover. Portanto, mantenha títulos/logos importantes longe das
bordas para evitar cortes em diferentes tamanhos de tela.

FOTO DE PERFIL
==============

A foto do perfil pode ser colocada em:
assets/images/profile.jpg

TAMANHO RECOMENDADO:
1200 x 1400 pixels (proporção aproximada 0,86:1).

BEHANCE
=======

Os links dos projetos são definidos em:
js/script.js

Cada projeto possui uma propriedade `link`. Você pode colocar diretamente a URL do
respectivo case no Behance. Quando a URL começar com https://, o botão automaticamente
abre o case em uma nova aba e muda o texto para “VER CASE NO BEHANCE”.

Exemplo:
link: 'https://www.behance.net/gallery/SEU-PROJETO'

Caso você ainda não tenha a URL final, deixe `link: '#'` até publicar o projeto.

ESTRUTURA
=========

portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── assets/
    └── images/
        ├── profile.jpg
        └── projects/
            ├── ava-uniube.jpg
            ├── tupa.jpg
            ├── vovos-conectados.jpg
            ├── projeto-cuca.jpg
            ├── pesque-pague.jpg
            └── central-do-aluno.jpg

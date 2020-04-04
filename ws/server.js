const express = require("express");

const server = express();

const ideas = [
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    title: "Curso de Programação",
    category: "Estudo",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut porro nostrum animi",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
    title: "Meditação",
    category: "Mentalidade",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut porro nostrum animi",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
    title: "Exercícios",
    category: "Saúde",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut porro nostrum animi",
    url: "https://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
    title: "Karaokê",
    category: "Diversão em Família",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut porro nostrum animi",
    url: "https://rocketseat.com.br"
  },
];


//configurar os arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"));

//configuração do nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: server,
  noCache: true,
});

//criei uma rota
// e capturo o pedido do cliente para responder
server.get("/", function(request, response) {
  const reverseIdeas = [...ideas].reverse();

  let lastIdeas = [];
  for (let idea of reverseIdeas) {
    if (lastIdeas.length < 2){
      lastIdeas.push(idea);
    }
  }
  return response.render("index.html", { ideas: lastIdeas });
});

server.get("/ideias", function(request, response) {
  const reverseIdeas = [...ideas].reverse();

  return response.render("ideias.html", { ideas: reverseIdeas });
});


//liguei meu servidor
server.listen(3000);
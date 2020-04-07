const express = require("express");

const server = express();

const db = require("./db");


//configurar os arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"));

//habilitar request body
server.use(express.urlencoded({ extended: true }));

//configuração do nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: server,
  noCache: true,
});

//criei uma rota
// e capturo o pedido do cliente para responder
server.get("/", function(request, response) {

  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) return console.log(err);

    const reverseIdeas = [...rows].reverse();

    let lastIdeas = [];
    for (let idea of reverseIdeas) {
      if (lastIdeas.length < 2){
        lastIdeas.push(idea);
      }
    }
    return response.render("index.html", { ideas: lastIdeas });
  })

});

server.get("/ideias", function(request, response) {
  db.all(`SELECT * FROM ideas`, function(err, rows) {
    if (err) {
      console.log(err);
      return response.send("Erro no banco de dados!!");
    }
    
    const reverseIdeas = [...rows].reverse();
  
    return response.render("ideias.html", { ideas: reverseIdeas });
  })

});

server.post("/", function(request, response) {
  //Inserir dados
  const query = `
    INSERT INTO ideas(
      image,
      title,
      category,
      description,
      link
    ) VALUES (?,?,?,?,?);
  `;

  const values = [
    request.body.image,
    request.body.title,
    request.body.category,
    request.body.description,
    request.body.link
  ];

  db.run(query, values, function(err) {
    if (err) {
      console.log(err);
      return response.send("Erro no banco de dados!!");
    }

    return response.redirect("/ideias");
    
  });
});


//liguei meu servidor
server.listen(3000);
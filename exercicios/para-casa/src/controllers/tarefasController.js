const tarefas = require("../models/tarefas");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const listar = (req, res) => {
  console.log(req.url);
  tarefas.find(function (err, tarefas) {
    res.status(200).send(tarefas);
  });
};

const postTarefa = (req, res) => {
  const senhaComHash = bcrypt.hashSync(req.body.password, 10);
  req.body.password = senhaComHash;

  let tarefa = new tarefas (req.body);
  tarefa.save(function (err) {
    if (err) res.status(500).send({ message: err.message });

    const tarefaSalva = tarefa.save();

    res.status(201).send(tarefa.toJSON());
  });
};

  const deleteTarefaById = async (req, res) => {
    try {
      const tarefaEncontrada = await tarefas.findById(req.params.id)
  
      await tarefaEncontrada.delete()
  
      return res.status(200).send({
        "mensagem": `Tarefa '${tarefaEncontrada.descricao}' deletada com sucesso!`,
        tarefaEncontrada
      })
  
    } catch (err) {
      return res.status(400).send({
        "mensagem": err.message
      });
    };
};

module.exports = {
  listar,
  postTarefa,
  deleteTarefaById
};

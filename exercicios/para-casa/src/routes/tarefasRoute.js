const controller = require("../controllers/tarefasController");
const express = require("express");
const router = express.Router();


router.get("/tarefas", controller.listar);
router.post("/novaTarefa", controller.postTarefa);
router.delete("/delete/:id", controller.deleteTarefaById);

module.exports = router;
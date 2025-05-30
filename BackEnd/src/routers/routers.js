
const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/images"))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname)
  },
});

const upload = multer({ storage: storage });




// middleware
const Auth = require("../middleware/auth_user_middleware");
const AuthAdmin = require("../middleware/auth_admin_middleware");
const AuthCaixa = require("../middleware/auth_caixa_middleware");
const AuthGarcom = require("../middleware/auth_garcom_middleware");
const AuthCozinheiro = require("../middleware/auth_cozinheiro_middleware");

// controllers
const usersControllers = require("../controllers/usersControllers");
const loginControllers = require("../controllers/loginControllers");
const mesasControllers = require("../controllers/mesasControllers");
const categoriasControllers = require("../controllers/categoriasControllers");
const produtosControllers = require("../controllers/produtosControllers");
const cargosControllers = require("../controllers/cargosControllers");
const pedidosControllers = require("../controllers/pedidosControllers");

// rota para fazer login
router.post("/login", loginControllers.login);

// usuarios
router.get("/users",Auth("Admin"),usersControllers.retornaTodos)
router.get("/user/:id",Auth("Admin"), usersControllers.retornaUm)
router.post("/user",Auth("Admin"),usersControllers.novoUsuario)

// mesas
router.get("/mesas", mesasControllers.retornaTodasMesas)
router.post("/mesa",Auth("Admin"), mesasControllers.novaMesa)
router.put('/mesa/:id',Auth("Admin"),mesasControllers.editarMesa)
router.delete('/mesa/:id',Auth("Admin"),mesasControllers.remover)

// categorias
router.get("/categorias", categoriasControllers.retornaTodasCategorias);
router.post('/categoria',Auth("Admin"), categoriasControllers.novaCategoria);
router.put('/categoria/:id',Auth("Admin"),categoriasControllers.editarCategoria)
router.delete('/categoria/:id',Auth("Admin"),categoriasControllers.remover)


// produtos
router.get('/produtos/:id',produtosControllers.retornaPorCategoria)
router.get('/produto/:id',produtosControllers.retornaUm) 
router.get('/produtos',produtosControllers.retornaTodosProdutos)
router.post('/produto',Auth("Admin"),upload.single('imagem'), produtosControllers.criarProduto);
router.put('/produto/:id',Auth("Admin"),upload.single('IMG'),produtosControllers.alterar)

// cargos
router.get('/cargos',Auth("Admin") ,cargosControllers.retornaTodosCargos);
router.post('/cargo',Auth("Admin"),cargosControllers.novoCargo)
router.put('/cargo/:id',Auth("Admin"),cargosControllers.editarCargo)
router.delete('/cargo/:id',Auth("Admin"),cargosControllers.remover)

// pedidos
router.get('/pedidos/:status',Auth("Admin","Caixa","Cozinheiro","Garçom"),pedidosControllers.retornaPedido)
router.post('/pedidos',pedidosControllers.novoPedido)
router.put('/pedido/:id',Auth("Admin","Caixa","Cozinheiro","Garçom"),pedidosControllers.editarPedido)

module.exports = router;























/*
const express = require("express");
const router = express.Router();

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/images"))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname)
  },
});

const upload = multer({ storage: storage });

// controllers
const usersControllers = require("../controllers/usersControllers");
const loginControllers = require("../controllers/loginControllers");
const mesasControllers = require("../controllers/mesasControllers");
const categoriasControllers = require("../controllers/categoriasControllers");
const produtosControllers = require("../controllers/produtosControllers");
const cargosControllers = require("../controllers/cargosControllers");
const pedidosControllers = require("../controllers/pedidosControllers");

// rota para fazer login
router.post("/login", loginControllers.login);

// usuarios
router.get("/users", usersControllers.retornaTodos);
router.get("/user/:id", usersControllers.retornaUm);
router.post("/user", usersControllers.novoUsuario);

// mesas
router.get("/mesas", mesasControllers.retornaTodasMesas);
router.post("/mesa", mesasControllers.novaMesa);
router.put('/mesa/:id', mesasControllers.editarMesa);
router.delete('/mesa/:id', mesasControllers.remover);

// categorias
router.get("/categorias", categoriasControllers.retornaTodasCategorias);
router.post('/categoria', categoriasControllers.novaCategoria);
router.put('/categoria/:id', categoriasControllers.editarCategoria);
router.delete('/categoria/:id', categoriasControllers.remover);

// produtos
router.get('/produtos/:id', produtosControllers.retornaPorCategoria);
router.get('/produto/:id', produtosControllers.retornaUm); 
router.post('/produto', upload.single('imagem'), produtosControllers.criarProduto);

// cargos
router.get('/cargos', cargosControllers.retornaTodosCargos);
router.post('/cargo', cargosControllers.novoCargo);
router.put('/cargo/:id', cargosControllers.editarCargo);
router.delete('/cargo/:id', cargosControllers.remover);

// pedidos
router.get('/pedidos/:status', pedidosControllers.retornaPedido);
router.post('/pedidos', pedidosControllers.novoPedido);
router.put('/pedido/:id', pedidosControllers.editarPedido);

module.exports = router;
*/
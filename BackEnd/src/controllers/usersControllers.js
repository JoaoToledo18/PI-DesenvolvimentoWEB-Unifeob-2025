const users = require('../models/Users')
const hashPasswordService = require('../service/hash_password_service')

class UsersControllers {
    
    async retornaTodos (req,res) {
        let resultado = await users.buscarTodos()
        !resultado.validate
        ?res.status(404).json({success: false, message: resultado.error})
        :res.status(200).json({success: true, values: resultado.values})
    }

    async retornaUm(req,res) {
        if (isNaN(req.params.id)) {
            res.status(400).json({success: false, message: "ID invalido"})
        } else {
            let resultado = await users.buscarUmPorID(req.params.id)
            if (!resultado.validate) {
                res.status(404).json({success: false, message: resultado.error })
            } else {
                resultado.values == undefined
                ? res.status(406).json({success:false, message: "Usuario não encontrado"})
                : res.status(200).json({success: true, values: resultado.values})
            }
        }
    }

    async novoUsuario(req,res) {
        let {Nome, Cargo, Usuario, Senha, RG} = req.body

        let resultado = await users.criar(Nome,Cargo,Usuario,hashPasswordService(Senha),RG)

        resultado.validate
        ? res.status(201).json({success: true, message:'Funcionario Cadastrado'})
        : res.status(404).json({success:false,message: resultado.error})
    }
}

module.exports = new UsersControllers()
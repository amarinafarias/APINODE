//Chamada do modelo de dados
const req = require('express/lib/request')
const User = require ('../models/User')

//Classe dos métodos controladores.
module.exports = class UserController{

    static async createUser(req, res){
        const user = {
        email:req.body.email,
        uid: (req.body.email.slice(0,5)+req.body.displayName.slice(0,3)).toUpperCase(),
        displayName: req.body.displayName,
        status:true
    }

    await User.create(user)

    if(!User){
        res.status(402).json({message:'user-parâmetros-null'})
        return
    }

    res.status(201).json({message:`usuário- ${user.displayName} -criado`})
}
    static async showUser(req, res){
        const user = await User.findAll({raw:true})

        if(!user){
            res.status(402).json({message:'lista-usuarios-parametro-nulo'})
            return
        }
        res.status(202).json(user)
    }

}

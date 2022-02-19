//Chamada do modelo de dados
const User = require ('../models/User')

//Classe dos métodos controladores.
module.exports = class UserController{
    //método local p gerar UID
    /*static async generateUid(email, displayName){
       return (email.slice(0,5)+displayName.slice(0,3)).toUpperCase()
    }*/
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

    static async listUpdateUser(req, res){
        const id = req.params.id

        const user = await User.findOne({where: {id:id}})

        if (!user){
            res.status(406).json({message: 'parametro-usuario-incosistente'})
            return
        }
        res.status(200).json(user)
        }

        static async sendUpdateUser(req, res){
            const id = req.body.id
            const user = {
                email:req.body.email,
                uid: (req.body.email.slice(0,5)+req.body.displayName.slice(0,3)).toUpperCase(),
                displayName: req.body.displayName,
                status:req.body.status
            }
            console.log(user)
            await User.update(user, {where:{id:id}})

            if(!user){
                res.status(402).json({message:'user-parametros-null'})
                return
            }

            res.status(200).json({message: `user-${id}-alterado`})

        }

        static async removeUser(req, res){
            const id = req.body.id

            if (!id){
                res.status(402).json({message:'user-id-parametro-nulo'})
                return
            }

            await User.destroy({where: {id:id}})

            res.status(202).json({message:`usuario-${id}-removido`})

        }

}

const Task = require ('../models/Task')
const User = require ('../models/User')

module.exports = class TaskController{
    static async createTask(req, res){
        const task = {
            title:req.body.title,
            description: req.body.description,
            done:false,
            UserId: req.body.UserId
        }

        const user = await User.findOne({where: {id: task.UserId}})

        if(!user){                                      //p evitar requisições ilegais
            res.status(401).json({message: `tarefa-invalida-usuario-${task.UserId}-sem registro`})
            return
        }
        await Task.create(task)
        res.status(201).json({message:`tarefa-${task.title}-criada`})

    }

    static async showTasks(req, res){
        const id = req.params.id
        
        const user = await User.findOne({include: Task, where:{id:id}}) //faz um select dentro do select
        
        if(!user){
            res.status(401).json({message:'tasks-inválidas-usuário'})
            return
        }
        res.status(201).json({user: user.get({plain:true})})

    }

    static async listUpdateTask(req, res){
        const id = req.params.id

        const tasks = await Task.findOne({where: {id:id}})

        if(!task){
            res.status(402).json({message: 'tarefa-parametro-nulo'})
            return
        }

        res.status(200).json(task)
    }

    static async sendUpdateTask (req, res){
        const id = req.body.id

        const task = {
            title:req.body.title,
            description: req.body.description,
            done: req.body.done,
            UserId: req.body.UserId
        }

        const user = await User.findOne({where: {id: task.UserId}})
        if(!user){
            res.status(401).json({message:`tarefa-invalida-usuario-${task.UserId}`})
            return
        }

        await Task.update(task, {where: {id:id}})

        res.status(200).json(task)
    }

    static async removeTask(req, res){
        const id = req.body.id

        if(!id){
            res.status(401).json({message:`tarefa-parametro-nulo-remocao`})
            return
        }

        const task = await Task.findOne({where: {id:id}})
        const user = await User.findOne({where:{id:task.UserId}})

        if(!user){
                res.status(401).json({message:`tarefa-${task.title}-fora-usuario`})   
            return
                }

        await Task.destroy({where: {id:id}})
        res.status(200).json({message:`tarefa-${id}-removida-banco`})
    }
}

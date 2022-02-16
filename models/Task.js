/* Aqui cria o relacionamento */
const {DataTypes} = require ('sequelize')
const db = require ('../db/conn')
const User = require ('./User')

const Task = db.define ('Task',{
    title:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true
    },
    done:{
        type: DataTypes.BOOLEAN,
        allowNull: true
    }    
})
//relação de que o USER pode ter várias TASKs.
User.hasMany(Task)  //multiplicidade
Task.belongsTo(User) //pertencimento
module.exports = Task
const express = require ('express')
const app = express() //instaciar dentro da variável app
const conn = require('./db/conn') //p/ sincronizar com o banco de dados

const Task = require('./models/Task')
const User = require('./models/User')//chamada a estrutura do banco ORM Modelo
const userRoutes = require ('./routes/userRouters')//Orientação das rotaas de métodos p controle do modelo.

app.use(express.urlencoded({extended: true})) //midleware
app.use(express.json()) //outro midleware
app.use('/users', userRoutes)//middleware de construção p rota de usuário.

conn
//.sync({force:true})
.sync()
.then(()=>{
    app.listen(3000)
})
.catch((err)=> console.log(err))

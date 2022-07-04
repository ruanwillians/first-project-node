const { request } = require('express')
const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())

// app.get('/users/:id', (request, response) =>{
//     // const name = request.query.name
//     // const age = request.query.age
//     // const{name, age} = request.query
//     // console.log(name, age)
//     const {id} = request.params
//     return response.json(id)
// })

const users = []

const checkUSerId = (request, response, next) => {
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({error: "Usuario não encontrado"})
    } 

    request.userIndex = index
    request.usersId = id

    next()
}

app.get('/users', (request, response) =>{
    return response.json({users})
})

app.post('/users', (request, response) =>{
    const {name,age} = request.body
    
    const user = {id: uuid.v4(), name, age}
    
    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUSerId, (request, response) =>{
    const index = request.userIndex
    const id = request.usersId 
    const {name,age} = request.body

    const update = {id, name, age}
    
    users[index]= update 
    return response.json(update)
})

app.delete('/users/:id',checkUSerId, (request, response) =>{
    const index = request.userIndex

    users.splice(index,1)

    return response.status(204).json()
})








app.listen(3000, () =>{
    console.log(`server started on port ${port}`)
})
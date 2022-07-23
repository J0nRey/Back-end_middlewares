const express = require('express')

//const app = express()
const server = express()

/**** Importar router ******************/

const routerB = require('./routerB')

//server.use('/b', routerB) //middleware

/****************************************/


function middleware (request, response, next) {
    console.log('middleware externo')
    next()
}

function factoryMiddleware () {
    return function (request, response, next){
        console.log('Middleware factory')
        next()
    }
}

//express.json es una funcion que regresa otra funcion
server.use(express.json())

server.use(middleware)
server.use(factoryMiddleware())


/******** middleware a nivel aplicación o servidor ******************************/

//server.use(middleware)
//next es una funcion, avisa cuando ya termino un proseso y continua al siguiente
server.use( (request, response, next)=>{
    console.log('middleware a nivel aplicación o servidor')
    next()
}, (request, response, next)=>{
    console.log('middleware a nivel aplicación o servidor 1')
    next()
}, (request, response, next)=>{
    console.log('middleware a nivel aplicación o servidor 2')
    next()
} )

/*****************************************************************/

server.use((request, response, next)=>{
    console.log('middleware a nivel aplicación o servidor 3')
    next()
})


server.use('/b', routerB) //middleware de Importar router 

/******** middleware a nivel Ruta ******************************/

server.get('/', (request, response, next)=>{
    console.log('middleware a nivel de Ruta Raiz')
    next()
},(request, response, next)=>{
    console.log('middleware a nivel de Ruta Raiz 1')
    next()
},(request, response, next)=>{
    console.log('middleware a nivel de Ruta Raiz 2')
    next()
}, (request, response)=>{
      response.json({ message: 'API Middleware' })
})

/******** middleware a nivel Ruta A ******************************/

server.get('/a',(request, response, next)=>{
    console.log('middleware a nivel de Ruta a')
    next()
}, (request, response, next)=>{
    response.json({message: 'Ruta a'})
})



server.listen(8080, ()=>{
    console.log('Server listening')
})


// Middlewares 3 niveles ( Todos los Middlewares Son funciones al igual que los callbacs)

// -Nivel de aplicación o servidor
// -Nivel de router
// -Nivel de ruta
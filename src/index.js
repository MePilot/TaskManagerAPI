
const path = require('path')
const hbs = require('hbs')
const publicDirPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

const express = require('express')

require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const pagesRouter = require('./routers/pages')
const app = express()

app.set('view engine','hbs')
app.set('views',viewPath)
app.use(express.static(publicDirPath))
hbs.registerPartials(partialsPath)
hbs.registerHelper('whichPartial', function(isLogged) { 
    if(isLogged) return 'header'
    return 'headerLogged'
     });

const port = process.env.PORT

app.use(express.json())
app.use(userRouter,taskRouter,pagesRouter)


app.listen(port, ()=> {
    console.log('Server is up')
})



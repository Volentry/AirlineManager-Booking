const {serverConfig,Logger} = require('./config');
const express = require('express');
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const apiRoutes = require('./routes')
app.use('/api',apiRoutes)

app.listen(serverConfig.PORT,()=>{
    console.log(`Successfully connected : ${serverConfig.PORT}`)
    Logger.info('successfully started a server')
})
import express from "express";
import router from "./router";
import db from './config/db'
import colors from 'colors'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from 'morgan'

//conectar a bd
export async function connectDB(){
  try{
    await db.authenticate()
    db.sync()
    // console.log(colors.blue('Conexión exitosa a la bd'))
  }catch(error){
    console.log(error)
    console.log(colors.bgRed.bold( 'Hubo un error al conectar a la BD'))
  }
}

connectDB()

const server = express()

//Permitir conexiones
const corsOptions : CorsOptions = {
  origin: function(origin, callback){
    if(origin === process.env.FRONTEND_URL){
      console.log('Permitir...')
      callback(null, true)
    }else{
      console.log('Denegar')
      callback(new Error('error de cors djcadaniel'))
    }
  }
}
server.use(cors(corsOptions))

//leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

//Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions))

export default server
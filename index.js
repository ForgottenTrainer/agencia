import router from './routes/index.js';
import express, { request } from 'express';
import db from './config/db.js';
import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

const app = express();

//Conectar db
db.authenticate() 
    .then(() => console.log('base de datos good'))
    .catch(error => console.log(error))

//Definir puerto
const port = process.env.PORT ||4000;

//Habilitar pug
app.set('view engine','pug')

//Obtener el año actual 
app.use((req, res, next) => {
    const year = new Date()

    res.locals.actualYear = year.getFullYear()
    res.locals.nombresitio = "Agencia de viajes"
    return next()
})

//Agregar body parser
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'))

//Agregar router
app.use('/',router)

//puerto y el hostname

const host = process.env.HOST || '0.0.0.0';


app.listen(port,host, () => {
    console.log(`Jala el server en el port ${port}`);
})
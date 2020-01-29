import express from 'express'
 import pug from 'pug'
import favicon from 'serve-favicon'
import sassMiddleware from 'node-sass-middleware'
import routes from './src/app/routes'

// Constantes 
const env = 'production', // Entorno desarrollo 'development'
    port        = process.env.PORT || 3000, // El objeto process es del cual cuelga la aplicación que ejecuta node
    publicDir   = `${__dirname}/public`,  // Definimos un directorio público de la aplicación
    viewDir     = `${__dirname}/src/views`, // Ruta del directorio donde estarán las vistas
    faviconDir  = `${__dirname}/public/img/favicon.png`, // Ruta del directorio donde esta ubicado el favicon
    app = express()  // Iniciamos express


// Establesemos los valores de la aplicación con método .set
app 
    .set ('views', viewDir)
    .set ('view engine', 'pug')
    .set ('port', port)
    .set ('env', env)


// Middlewares
// Primer middlework que vamos a decir que ejecute es el sassMiddlework()
// El middlework de sass recibe como parámetro un objeto y allí le vamos indicando las características por medio de atributos
    .use (sassMiddleware({
        src: `${__dirname}/src/scss`, // Ruta origen de los archivos .scss
        dest: publicDir, // Ruta destino de los archivos
        debug: false, // Si queremos un mensaje debug en consola con true o false si queremos mostrar o no el mensaje
        outputStyle: 'compressed'  // Tipo de codigo que queremos en salida. compressed minifica el código de salida
    }))

// Segundo middlework: El siguiente es requerido en aplicaciones express.
// Hay que establecer al método express.static el directorio de archivos estáticos que se van a desplegar en producción. Es como un root de hosting, un htdocs de xamp, etc... 
// En la documentación nos indica que el plugins se tiene que ejecutar antes de la invocación del express.static
    .use (  express.static(publicDir) )
    .use ( favicon(faviconDir) )
    .use ( routes ) // Finalmente indicamos que use las rutas definidas en routes


// Manejo de las rutas: Manejaremos los errores 400 y 500 para la app de express.
// Sólo los vamos a tener cuando la aplicación este en desarrollo.
// Si la propiedad 'env' esta en production, lanzamos los middleworks que nos van a ayudar a capturar cualquier tipo de error tanto en el cliente "400.." y en servidor "500..."
// Ejecutamos una función anónima. Los middlework de express reciben tres parametros: los require, la respuesta y un método next que ejecuta el siguiente middlework que esta en el stack de middlework que tenga la aplicación.
    if ( app.get('env' === 'production' ) )
            app.use((req, res, next) => {
                let err = new Error('Not Found') // Creamos objeto de tipo error
                err.status = 404
                next(err)   // Pasado como respuesta al siguiente middlework
        }) 
        app.use((err, req, res, next) => {
            res.status(err.status || 500)
            res.render('error', { err: err })   // Método render de express que permite visualizar una plantilla.
        }) 

// Teniendo todo preparado para levantar la aplicación, hacemos el export de la app
// Esta app la va a escuchar el archivo server que va a levantar un servidor para la aplicación node
export default app

console.log('ToDo List')  // Para comprobar si compila

// Con node hacemos el run con el comando node seguido del file que queremos correr. e.g. node app.js
// Como se importan hoy en día en react, etc... usando import express from "express" teniendo instalado babel (@babel/node) ejecutamos "npx babel/node" seguido del file que queremos correr. e.g. npx babel-node app.js
// Una de las ventajas que tenemos instalando babel es que si queremos empezar a trabajar los import como en react, etc... "que tras bambalinas webpack se encarga de hacerlo". Ejecutamos npx babel-node en vez de ejecutar los códigos backend con los comandos node "node app.js". Obviamente teniendo el archivo .babelrc con @preset-env y verificar que esten las dependencias @babel/cli, @babel/preset-env @babel/node
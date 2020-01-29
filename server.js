import http from 'http'
import app from './app'
import reload from 'ack-reload'

const server = http.createServer(app)

if (app.get('env' === 'development')) {
// Para que funcione el reload, hay que establecerlo en la app como un middlework
    app.use( reload.middleware(`${__dirname}/public`, server) ) // Primer parámetro: La ruta de la carpeta pública y segundo es el objeto que esta levantando el servidor.
}

server.listen(
    app.get('port'),
    () => {
        console.log(`Iniciando la aplicación Isomórfica con JavaScript en el puerto: ${app.get('port')}`)
    }
)

/*
En el node_modules instale el paquete de ws (web socket) que se usa para mantener
una conexion entre clientes y el servidor
*/

/*
  Chat broadcast server:
   - Escucha en WS_PORT
   - Reenvía mensajes a todos los clientes conectados excepto al emisor
   - Loguea conexiones y desconexiones
 */

const WebSocket = require('ws');

// Esto lo que hace es que dice que va a usar un websocket en el puerto 8082
const wss = new WebSocket.Server({ port: 8082 });

// Esta funcion se activa cuando un usuario se conecta al websocket
wss.on('connection', ws => {
    console.log('New client connected!');

    // Esta funcion se activa cuando un cliente le envia al servidor un mensaje con la función ws.send()
    ws.on('message', data => {
        console.log(`Client has sent us: ${data}`);

        // Esto lo que hace es ejecutar este codigo por cada cliente conecatdo al websocket
        wss.clients.forEach(client => {
            // Este if revisa que no se le mande el mensaje al que mandó el mensaje y tambien se fija que al cliente que lo va a mandar este conectado
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                // Esto reenvía el mensaje recortando espacios
                client.send(data.toString().trim());
            }
        });

    });

    // Esta funcion se activa cuando un cliente se desconecta del websocket
    ws.on('close', () => {
        console.log('Client has disconnected!');
    });
});